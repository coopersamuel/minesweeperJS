import React from 'react';
import Tile from './tile';
import FaBomb from 'react-icons/lib/fa/bomb';
import { connect } from 'react-redux';
import { editBoard, editTile, setRemainingTiles } from '../actions/boardActions';
import { bindActionCreators } from 'redux';

import '../css/board.css';

class Board extends React.Component {
    constructor(props) {
        super(props);

        // Need to initialize the board in redux state
        this.generateBoard(this.props.numberOfRows, this.props.numberOfColumns, this.props.numberOfBombs);
        this.props.setRemainingTiles(this.props.numberOfRows * this.props.numberOfColumns);

        this.generateBoard = this.generateBoard.bind(this);
        this.flipTile = this.flipTile.bind(this);
        this.getNumberOfNeighborBombs = this.getNumberOfNeighborBombs.bind(this);
        this.autoFlipTile = this.autoFlipTile.bind(this);
    }

    generateBoard(numberOfRows, numberOfColumns, numberOfBombs) {
        let board = [];
        let numberOfBombsPlaced = 0;
        
        // Optimize this
        for (let i = 0; i < numberOfRows; i++) {
            let row = [];
            for (let j = 0; j < numberOfColumns; j++) {
                row.push(<Tile  key={i.toString() + j.toString()} 
                                row={i} column={j} 
                                isBomb={false} 
                                onTileClick={this.flipTile} 
                                wasClicked={false}
                                value=''
                                board={this} />);   // Passing the Board context to the tile explicitly
            }
            board.push(row);
        }

        while (numberOfBombsPlaced < numberOfBombs) {
            let randomRowIndex = Math.floor(Math.random() * numberOfRows);
            let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

            if (!board[randomRowIndex][randomColumnIndex].props.isBomb) {
                board[randomRowIndex][randomColumnIndex] = React.cloneElement(board[randomRowIndex][randomColumnIndex], {isBomb: true});
                numberOfBombsPlaced++;
            }
        }

        // call action to initialize the board
        this.props.editBoard(board);
    }

    // Handle a tile click
    flipTile(eventTile) {
        let numNeighborBombs = 0;
        let markedTile;

        if (eventTile.props.isBomb) {
            console.log('you lose');
            // Build what happens when you lose
            markedTile = React.cloneElement(this.props.board[eventTile.props.row][eventTile.props.column], {wasClicked: true, value: <FaBomb />});            
            this.props.editTile(markedTile);
        } else if (this.getNumberOfNeighborBombs(eventTile) === 0) {
            markedTile = React.cloneElement(this.props.board[eventTile.props.row][eventTile.props.column], {wasClicked: true, value: 0});
            this.props.editTile(markedTile);
            this.autoFlipTile(markedTile);
        } else {
            // Show how many bombs are adjacent to this tile
            numNeighborBombs = this.getNumberOfNeighborBombs(eventTile);
            markedTile = React.cloneElement(this.props.board[eventTile.props.row][eventTile.props.column], {wasClicked: true, value: numNeighborBombs});
            this.props.editTile(markedTile);
        }

        this.forceUpdate(); // Forcing update because redux' shallow comparison neglects this tiny state change and doesn't re-render automatically
                            // https://github.com/reactjs/redux/issues/585

        // Update the number of tiles remaining, so you know when the game is over
        let numTiles = this.props.remainingTiles;
        this.props.setRemainingTiles(numTiles--);
    }

    autoFlipTile (tile) {
        const neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1]];
        const numberOfRows = this.props.board.length;
        const numberOfColumns = this.props.board[0].length;
        
        console.log('here');

        neighborOffsets.forEach(offset => {
            const neighborRowIndex = tile.props.row + offset[0];
            const neighborColumnIndex = tile.props.column + offset[1];
            
            if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns && !this.props.board[neighborRowIndex][neighborColumnIndex].props.wasClicked) {
                let neighborTile = this.props.board[neighborRowIndex][neighborColumnIndex];                 
                this.flipTile(neighborTile);
            }
        });
    }

    getNumberOfNeighborBombs(tile) {
        const neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1]];
        const numberOfRows = this.props.board.length;
        const numberOfColumns = this.props.board[0].length;
        let numberOfBombs = 0;
    
        neighborOffsets.forEach(offset => {
            const neighborRowIndex = tile.props.row + offset[0];
            const neighborColumnIndex = tile.props.column + offset[1];
    
            if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
                if (this.props.board[neighborRowIndex][neighborColumnIndex].props.isBomb) {
                    numberOfBombs++;
                }
            }
        });
    
        return numberOfBombs;
    }

    render() {
        return (
            <div>
                {this.props.board.map(row => {
                    return (
                        <div>
                            {row}
                        </div>
                    );
                })}
            </div>
        );
    }
}

function mapStateToProps (state) {
    // Whatever is returned here shows up as props for the Board container
    return {
        board : state.board,
        remainingTiles : state.remainingTiles
    };
}

// Whatever is returned from this function (in the first argument of bindActionCreators) will show up as props on the Board container
function mapDispatchToProps(dispatch) {
    // whenever the action is called, bindActionCreators will pass the result to all of our reducers
    return bindActionCreators({
        editBoard: editBoard,
        editTile: editTile,
        setRemainingTiles: setRemainingTiles
    }, dispatch);
}

// connect takes a function and a component and produces a container
// a container is simply a component that is aware of Redux
export default connect(mapStateToProps, mapDispatchToProps)(Board);
import React from 'react';
import Tile from './tile';

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            board : this.generateBoard(this.props.numberOfRows, this.props.numberOfColumns, this.props.numberOfBombs),
            remainingTiles : this.props.numberOfRows * this.props.numberOfColumns
        };

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
                board[randomRowIndex][randomColumnIndex] = React.cloneElement(board[randomRowIndex][randomColumnIndex], {isBomb: true, value: 'B'});
                numberOfBombsPlaced++;
            }
        }

        return board;
    }

    // Handle a tile click
    flipTile(eventTile) {
        // Create a shallow copy of the board so that you can change the state of the tiles
        let clonedBoard = this.state.board.map(row => {
            return row.map(tile => {
                return React.cloneElement(tile);
            });
        });
    
        let numNeighborBombs = 0;
        let markedTile;
        if (eventTile.props.isBomb) {
            console.log('you lose');
            // Build what happens when you lose
            markedTile = React.cloneElement(this.state.board[eventTile.props.row][eventTile.props.column], {wasClicked: true, value: 'B'});            
        } else if (this.getNumberOfNeighborBombs(eventTile) === 0) {
            markedTile = React.cloneElement(this.state.board[eventTile.props.row][eventTile.props.column], {wasClicked: true, value: 0});
            clonedBoard[eventTile.props.row][eventTile.props.column] = markedTile;
            this.setState({
                board : clonedBoard
            });
            // Need to get this working, figure out componentDidUpdate....
            debugger;
            this.autoFlipTile(markedTile);
        } else {
            // Show how many bombs are adjacent to this tile
            numNeighborBombs = this.getNumberOfNeighborBombs(eventTile);
            markedTile = React.cloneElement(this.state.board[eventTile.props.row][eventTile.props.column], {wasClicked: true, value: numNeighborBombs});
        }

        // Replace the clicked eventTile with the new markedTile and reset the state
        clonedBoard[eventTile.props.row][eventTile.props.column] = markedTile;
        this.setState({
            board : clonedBoard
        });

        // Update the number of tiles remaining, so you know when the game is over
        let numberOfTiles = this.state.remainingTiles;
        numberOfTiles--;
        this.setState({
            remainingTiles : numberOfTiles
        });
    }

    autoFlipTile (tile) {
        const neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1]];
        const numberOfRows = this.state.board.length;
        const numberOfColumns = this.state.board[0].length;

        neighborOffsets.forEach(offset => {
            const neighborRowIndex = tile.props.row + offset[0];
            const neighborColumnIndex = tile.props.column + offset[1];
            debugger;
            
            if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns && !this.state.board[neighborRowIndex][neighborColumnIndex].props.wasClicked) {
                let neighborTile = this.state.board[neighborRowIndex][neighborColumnIndex];                 
                this.flipTile(neighborTile);
            }
        });
    }

    getNumberOfNeighborBombs(tile) {
        const neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1]];
        const numberOfRows = this.state.board.length;
        const numberOfColumns = this.state.board[0].length;
        let numberOfBombs = 0;
    
        neighborOffsets.forEach(offset => {
            const neighborRowIndex = tile.props.row + offset[0];
            const neighborColumnIndex = tile.props.column + offset[1];
    
            if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
                if (this.state.board[neighborRowIndex][neighborColumnIndex].props.isBomb) {
                    numberOfBombs++;
                }
            }
        });
    
        return numberOfBombs;
    }

    render() {
        return (
            <div>
                {this.state.board.map(row => {
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

export default Board;
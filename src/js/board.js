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

        return board;
    }

    // Handle a tile click
    flipTile(eventTile) {
        let numNeighborBombs = 0;

        if (eventTile.props.isBomb) {
            console.log('you lose');
            // Build what happens when you lose
        } else if (this.getNumberOfNeighborBombs(eventTile) === 0) {
            // There are no bombs adjacent to this tile, print zero and start autoFlipTile
            console.log('no bombs nearby');
        } else {
            // Show how many bombs are adjacent to this tile
            numNeighborBombs = this.getNumberOfNeighborBombs(eventTile);
            let markedTile = React.cloneElement(this.state.board[eventTile.props.row][eventTile.props.column], {neighborBombs: numNeighborBombs});
            // Find a way to reset the state....
            
            console.log(numNeighborBombs);
        }

        // Update the number of tiles remaining, so you know when the game is over
        let numberOfTiles = this.state.remainingTiles;
        numberOfTiles--;
        this.setState({
            remainingTiles : numberOfTiles
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
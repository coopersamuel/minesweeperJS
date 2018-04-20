import React from 'react';
import Tile from './tile';
import { FaBomb, FaFlag } from 'react-icons/lib/fa';
import { MdRefresh } from 'react-icons/lib/md';
import { connect } from 'react-redux';
import { generateBoard, placeBombs, setRemainingTiles, markTile, revealBombs } from '../actions/actions';
import { bindActionCreators } from 'redux';

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.changeDifficultyLevel('easy');

        this.changeDifficultyLevel = this.changeDifficultyLevel.bind(this);
        this.flipTile = this.flipTile.bind(this);
        this.getNumberOfNeighborBombs = this.getNumberOfNeighborBombs.bind(this);
        this.autoFlipTile = this.autoFlipTile.bind(this);
        this.showBombs = this.showBombs.bind(this);
        this.flagTile = this.flagTile.bind(this);
    }

    changeDifficultyLevel(level) {
        // This function regenerates the board based on difficulty level
        let rows, columns, bombs;

        switch(level) {
            case 'easy':
                rows = 10;
                columns = 10;
                bombs = 10;
                break;
            case 'medium':
                rows = 16;
                columns = 16;
                bombs = 40;
                break;
            case 'hard':
                rows = 16;
                columns = 30;
                bombs = 99;
                break;
            case 'refresh':
                rows = this.props.board.length;
                columns = this.props.board[0].length;
                if (rows * columns <= 100) {
                    bombs = 10; // easy
                } else if (rows * columns >= 480) {
                    bombs = 99; // hard
                } else {
                    bombs = 40; // medium
                }
                break;
            default:
                rows = 10;
                columns = 10;
                bombs = 10;
                break;
        }

        this.props.generateBoard(rows, columns);
        this.props.placeBombs(rows, columns, bombs);
        this.props.setRemainingTiles(rows * columns);
    }

    // Handle a tile click
    flipTile(targetRow, targetColumn) {
        if (this.props.board[targetRow][targetColumn].isBomb) {
            this.showBombs();
        } else if (this.getNumberOfNeighborBombs(targetRow, targetColumn) === 0) {
            this.props.markTile(targetRow, targetColumn, 0);
            this.autoFlipTile(targetRow, targetColumn);
        } else {
            // Show how many bombs are adjacent to this tile
            this.props.markTile(targetRow, targetColumn, this.getNumberOfNeighborBombs(targetRow, targetColumn));
        }

        // if (this.props.remainingTiles === this.props.numberOfBombs) {
        //     gameOver(true);
        // }

        // Update the number of tiles remaining, so you know when the game is over
        let numTiles = this.props.remainingTiles;
        this.props.setRemainingTiles(--numTiles);
    }

    autoFlipTile(targetRow, targetColumn) {
        const neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1]];
        const numberOfRows = this.props.board.length;
        const numberOfColumns = this.props.board[0].length;
        
        neighborOffsets.forEach(offset => {
            const neighborRowIndex = targetRow + offset[0];
            const neighborColumnIndex = targetColumn + offset[1];
            
            if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns && this.props.board[neighborRowIndex][neighborColumnIndex].value === '') {              
                this.flipTile(neighborRowIndex, neighborColumnIndex);
            }
        });
    }

    getNumberOfNeighborBombs(targetRow, targetColumn) {
        const neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1]];
        const numberOfRows = this.props.board.length;
        const numberOfColumns = this.props.board[0].length;
        let numberOfBombs = 0;
    
        neighborOffsets.forEach(offset => {
            const neighborRowIndex = targetRow + offset[0];
            const neighborColumnIndex = targetColumn + offset[1];
    
            if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
                if (this.props.board[neighborRowIndex][neighborColumnIndex].isBomb) {
                    numberOfBombs++;
                }
            }
        });
    
        return numberOfBombs;
    }

    showBombs() {
        this.props.revealBombs();
        // this.props.gameOver(false);
    }

    flagTile(targetRow, targetColumn) {
        this.props.markTile(targetRow, targetColumn, 'F');
    }

    render() {
        return (
            <div className="mdc-layout-grid__cell">
                <div className="mdc-card">
                    <div className="board-container">
                        {this.props.board.map((tileRow, row) => {
                            return (
                                <div>
                                    {tileRow.map((tile, column) => {
                                        if (tile.value === '') {
                                            // Unclicked tile
                                            return <Tile key={row.toString() + column.toString()} 
                                                    row={row} column={column} 
                                                    isBomb={false} 
                                                    hasFlag={false}
                                                    onTileClick={this.flipTile} 
                                                    onRightClick={this.flagTile}
                                                    wasClicked={false}
                                                    value=''
                                                    board={this} />; // Passing the Board context to the tile explicitly
                                        } else if (tile.value === 'B') {
                                            // Clicked bomb tile
                                            return <Tile key={row.toString() + column.toString()} 
                                                    row={row} column={column} 
                                                    isBomb={true} 
                                                    hasFlag={false}
                                                    onTileClick={this.flipTile} 
                                                    onRightClick={this.flagTile}
                                                    wasClicked={true}
                                                    value={<FaBomb />}
                                                    board={this} />; // Passing the Board context to the tile explicitly
                                        } else if (tile.value === 'F') {
                                            // Unclicked tile with flag
                                            return <Tile key={row.toString() + column.toString()} 
                                                    row={row} column={column} 
                                                    isBomb={false} 
                                                    hasFlag={true}
                                                    onTileClick={this.flipTile} 
                                                    onRightClick={this.flagTile}
                                                    wasClicked={false}
                                                    value={<FaFlag />}
                                                    board={this} />; // Passing the Board context to the tile explicitly
                                        } else {
                                            // Clicked tile with number
                                            return <Tile key={row.toString() + column.toString()} 
                                                    row={row} column={column} 
                                                    isBomb={false} 
                                                    hasFlag={false}
                                                    onTileClick={this.flipTile} 
                                                    onRightClick={this.flagTile}
                                                    wasClicked={true}
                                                    value={tile.value}
                                                    board={this} />; // Passing the Board context to the tile explicitly
                                        }
                                    })}
                                </div>
                            );
                        })}
                    </div>
                    <div className="mdc-card__actions">
                        <div className="mdc-card__action-buttons">
                            <button className="mdc-button mdc-card__action mdc-card__action--button card-button" onClick={() => this.changeDifficultyLevel('easy')}>Easy</button>
                            <button className="mdc-button mdc-card__action mdc-card__action--button card-button" onClick={() => this.changeDifficultyLevel('medium')}>Medium</button>
                            <button className="mdc-button mdc-card__action mdc-card__action--button card-button" onClick={() => this.changeDifficultyLevel('hard')}>Hard</button>
                        </div>
                        <div className="mdc-card__action-icons">
                            <button className="mdc-button mdc-card__action-icon mdc-card__action--button card-button refresh" onClick={() => this.changeDifficultyLevel('refresh')}><MdRefresh /></button>                        
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps (state) {
    // Whatever is returned here shows up as props for the Board container
    return {
        board: state.board,
        remainingTiles: state.remainingTiles,
    };
}

// Whatever is returned from this function (in the first argument of bindActionCreators) will show up as props on the Board container
function mapDispatchToProps(dispatch) {
    // whenever the action is called, bindActionCreators will pass the result to all of our reducers
    return bindActionCreators({
        generateBoard,
        placeBombs,
        setRemainingTiles,
        markTile,
        revealBombs,
    }, dispatch);
}

// connect takes a function and a component and produces a container
// a container is simply a component that is aware of Redux
export default connect(mapStateToProps, mapDispatchToProps)(Board);
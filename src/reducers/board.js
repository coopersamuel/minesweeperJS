import * as Types from '../actions/actionTypes';
import { slice, forEach } from 'lodash';

const initialState = [];

export default (state = initialState, action) => {
    let newState = slice(state);

    switch(action.type) {
        case Types.GENERATE_BOARD:
            /*
            *   Generate the empty board that the player will interact with
            */

            let board = [];         
            
            for (let i = 0; i < action.payload.numberOfRows; i++) {
                let row = [];
                for (let j = 0; j < action.payload.numberOfColumns; j++) {
                    row.push({
                        value: '',
                        isBomb: false
                    });
                }
                board.push(row);
            }

            return board;
        case Types.PLACE_BOMBS:
            let numberOfBombsPlaced = 0;          

            while (numberOfBombsPlaced < action.payload.numberOfBombs) {
                let randomRowIndex = Math.floor(Math.random() * action.payload.numberOfRows);
                let randomColumnIndex = Math.floor(Math.random() * action.payload.numberOfColumns);

                if (!newState[randomRowIndex][randomColumnIndex].isBomb) {
                    newState[randomRowIndex][randomColumnIndex] = {
                        value: '', // Don't reveal the bombs to the user 
                        isBomb: true
                    };
                    numberOfBombsPlaced++;
                }
            }

            return newState;
        case Types.MARK_TILE:
            newState[action.payload.row][action.payload.column].value = action.payload.value;    
            return newState;
        case Types.REVEAL_BOMBS:
            forEach(newState, (row) => {
                forEach(row, (tile) => {
                    if (tile.isBomb) {
                        tile.value = 'B';
                    }
                });
            });

            return newState;
        default:
            return state;
    }
}
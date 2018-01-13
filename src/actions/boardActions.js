import * as Types from './actionTypes';
import { EDIT_BOARD, SET_REMAINING_TILES, EDIT_TILE } from './actionTypes';

// action creators

export function editBoard(board) {
    return {
        type : EDIT_BOARD,
        payload : board
    };
}

export function editTile(newTile) {
    return {
        type : EDIT_TILE,
        payload : newTile
    };
}

export function setRemainingTiles(numTiles) {
    return {
        type : SET_REMAINING_TILES,
        payload : numTiles
    };
}
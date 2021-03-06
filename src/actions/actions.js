import * as Types from './actionTypes';

// action creators

export const generateBoard = (numberOfRows, numberOfColumns) => {
    return {
        type: Types.GENERATE_BOARD,
        payload: {
            numberOfRows,
            numberOfColumns
        }
    }
}

export const placeBombs = (numberOfRows, numberOfColumns, numberOfBombs) => {
    return {
        type: Types.PLACE_BOMBS,
        payload: {
            numberOfRows,
            numberOfColumns,
            numberOfBombs
        }
    };
}

export const setRemainingTiles = (numTiles) => {
    return {
        type: Types.SET_REMAINING_TILES,
        payload: numTiles
    };
}

export const markTile = (row, column, value) => {
    return {
        type: Types.MARK_TILE,
        payload: {
            row,
            column,
            value
        }
    };
}

export const revealBombs = () => {
    return {
        type: Types.REVEAL_BOMBS
    }
}

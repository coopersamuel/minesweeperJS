import * as Types from '../actions/actionTypes';

const initialState = {
    board : []
};

// state argument is not the same as application state, only the piece of state that this reducer is responsible for
export default function boardReducer(state = initialState.board, action) {
    let newState = state;

    switch (action.type) {
        case Types.EDIT_BOARD:
            return action.payload;
        case Types.EDIT_TILE:
            newState[action.payload.props.row][action.payload.props.column] = action.payload;
            return newState;
    }

    return state;
}
import * as Types from '../actions/actionTypes';

const initialState = null;

export default function gameOverReducer(state = initialState, action) {
    switch (action.type) {
        case Types.GAME_OVER:
            return action.payload
    }

    return state;
}
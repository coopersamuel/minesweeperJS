import * as Types from '../actions/actionTypes';

export default function setRemainingTilesReducer(state = null, action) {
    switch (action.type) {
        case Types.SET_REMAINING_TILES:
            return action.payload;
    }

    return state;
}
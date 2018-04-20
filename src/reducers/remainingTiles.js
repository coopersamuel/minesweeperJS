import * as Types from '../actions/actionTypes';

export default (state = null, action) => {
    switch (action.type) {
        case Types.SET_REMAINING_TILES:
            return action.payload;
        default:
            return state;
    }
}
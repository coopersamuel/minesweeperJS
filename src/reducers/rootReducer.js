import { combineReducers } from 'redux';
import board from './board';
import remainingTiles from './remainingTiles';

const rootReducer = combineReducers({
    board,
    remainingTiles,
});

export default rootReducer;
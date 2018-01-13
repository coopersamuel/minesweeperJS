import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import setRemainingTilesReducer from './setRemainingTilesReducer';

const rootReducer = combineReducers({
    board : boardReducer,
    remainingTiles : setRemainingTilesReducer
});

export default rootReducer;
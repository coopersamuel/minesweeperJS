import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import setRemainingTilesReducer from './setRemainingTilesReducer';
import gameOverReducer from './gameOverReducer';

const rootReducer = combineReducers({
    board : boardReducer,
    remainingTiles : setRemainingTilesReducer,
    gameOver : gameOverReducer
});

export default rootReducer;
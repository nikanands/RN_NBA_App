import {combineReducers} from 'redux';

import userReducer from './userReducer';
import newsReducer from './newsReducer';
import gamesReducer from './gamesReducer';

const rootReducer = combineReducers({
  userReducer,
  newsReducer,
  gamesReducer,
});

export default rootReducer;
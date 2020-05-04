// reducers/index.js

import {combineReducers} from 'redux';
import auth from './reducers';

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;

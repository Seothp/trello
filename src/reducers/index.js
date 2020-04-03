import { combineReducers } from 'redux';
import lists from './lists';
import tasks from './tasks';
import boards from './boards';
import token from './token';

const rootReducer = combineReducers({ lists, tasks, boards, token });

export default rootReducer;

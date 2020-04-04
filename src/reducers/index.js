import { combineReducers } from 'redux';
import lists from './lists';
import tasks from './tasks';
import boards from './boards';
import user from './user';

const rootReducer = combineReducers({ lists, tasks, boards, user });

export default rootReducer;

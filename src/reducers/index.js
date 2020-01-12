import { combineReducers } from 'redux';
import lists from './lists';
import tasks from './tasks'

const rootReducer = combineReducers({ lists, tasks });

export default rootReducer;

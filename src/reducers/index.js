import { combineReducers } from 'redux';
import lists from './lists';
import tasks from './tasks';
import boards from './boards';

const rootReducer = combineReducers({ lists, tasks, boards });

export default rootReducer;

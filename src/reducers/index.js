import { combineReducers } from 'redux';
import lists from './lists';
import tasks from './tasks';
import boards from './boards';
import user from './user';
import currentTask from './currentTask';
import currentList from './currentList';

const rootReducer = combineReducers({
  lists,
  tasks,
  boards,
  user,
  currentTask,
  currentList,
});

export default rootReducer;

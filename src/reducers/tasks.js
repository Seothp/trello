import {
  ADD_TASK,
  REMOVE_TASK,
  CHECK_TASK,
  MOVE_TASK,
  DELETE_TASKS,
  EDIT_TASK_TITLE,
  SET_TASKS,
  EDIT_TASK_ID,
} from '../constants';

const TASKS = {
  tasks: [],
};

const tasks = (state = TASKS.tasks, payload) => {
  const {
    type, listId, id, title, checked, tasks, newId,
  } = payload;
  switch (type) {
    case ADD_TASK:
      return [
        ...state, [id, {
          listId,
          title,
          checked,
        }],
      ];
    case REMOVE_TASK:
      return state.filter((task) => {
        const taskId = task[0];
        return taskId !== id;
      });
    case CHECK_TASK:
      return state.map((task) => {
        const taskId = task[0];
        const taskBody = task[1];
        if (taskId === id) {
          return [taskId, {
            ...taskBody,
            checked: !taskBody.checked,
          }];
        }
        return task;
      });
    case MOVE_TASK:
      return state.map((task) => {
        const taskId = task[0];
        const taskBody = task[1];
        if (taskId === id) {
          return [taskId, {
            ...taskBody,
            listId,
          }];
        }
        return task;
      });
    case EDIT_TASK_TITLE:
      return state.map((task) => {
        const taskId = task[0];
        const taskBody = task[1];
        if (taskId === id) {
          return [taskId, {
            ...taskBody,
            title,
          }];
        }
        return task;
      });
    case EDIT_TASK_ID:
      return state.map((task) => {
        const taskId = task[0];
        const taskBody = task[1];
        if (taskId === id) {
          return [newId, {
            ...taskBody,
          }];
        }
        return task;
      });
    case DELETE_TASKS:
      return state.filter(([, body]) => body.listId !== listId);
    case SET_TASKS:
      return tasks;
    default:
      return state;
  }
};

export default tasks;

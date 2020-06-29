import {
  ADD_TASK,
  ADD_LIST,
  REMOVE_TASK,
  REMOVE_LIST,
  CHECK_TASK,
  MOVE_TASK,
  DELETE_TASKS,
  ADD_BOARD,
  REMOVE_BOARD,
  EDIT_TASK_TITLE,
  EDIT_LIST_TITLE,
  SET_USER_TOKEN,
  SET_USER_ID,
  SET_USER_REFRESH_TOKEN,
  SET_TASKS,
  SET_BOARDS,
  SET_LISTS,
  SET_CURRENT_TASK,
  SET_CURRENT_LIST,
  EDIT_TASK_ID,
  EDIT_LIST_ID,
  EDIT_BOARD_ID,
} from '../constants';

export const addTaskLocal = ({ listId, title, id }) => ({
  type: ADD_TASK,
  listId,
  title,
  id,
  checked: false,
});

export const removeTaskLocal = ({ id }) => ({
  type: REMOVE_TASK,
  id,
});

export const checkTaskLocal = ({ id }) => ({
  type: CHECK_TASK,
  id,
});

export const moveTaskLocal = ({ listId, itemId }) => ({
  type: MOVE_TASK,
  listId,
  id: itemId,
});

export const editTaskTitleLocal = ({ id, title }) => ({
  type: EDIT_TASK_TITLE,
  id,
  title,
});

export const deleteTasksLocal = ({ listId }) => ({
  type: DELETE_TASKS,
  listId,
});

export const setTasks = (tasks) => ({
  type: SET_TASKS,
  tasks,
});

export const setCurrentTask = (currentTask) => ({
  type: SET_CURRENT_TASK,
  currentTask,
});

export const addListLocal = ({ listId, title, boardId }) => ({
  type: ADD_LIST,
  listId,
  title,
  boardId,
});

export const removeListLocal = ({ listId }) => ({
  type: REMOVE_LIST,
  listId,
});

export const editListTitleLocal = ({ listId, title }) => ({
  type: EDIT_LIST_TITLE,
  listId,
  title,
});

export const setLists = (lists) => ({
  type: SET_LISTS,
  lists,
});

export const setCurrentList = (currentList) => ({
  type: SET_CURRENT_LIST,
  currentList,
});

export const addBoardLocal = ({ boardId, title }) => ({
  type: ADD_BOARD,
  boardId,
  title,
});

export const removeBoardLocal = ({ boardId }) => ({
  type: REMOVE_BOARD,
  boardId,
});

export const setBoards = (boards) => ({
  type: SET_BOARDS,
  boards,
});

export const setUserToken = (token) => ({
  type: SET_USER_TOKEN,
  token,
});

export const setUserId = (id) => ({
  type: SET_USER_ID,
  id,
});

export const setUserRefreshToken = (refreshToken) => ({
  type: SET_USER_REFRESH_TOKEN,
  refreshToken,
});

export const editTaskId = ({ id, newId }) => ({
  type: EDIT_TASK_ID,
  newId,
  id,
});

export const editListId = ({ listId, newId }) => ({
  type: EDIT_LIST_ID,
  newId,
  listId,
});

export const editBoardId = ({ boardId, newId }) => ({
  type: EDIT_BOARD_ID,
  boardId,
  newId,
});

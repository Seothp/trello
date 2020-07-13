import {
  setUserToken,
  setUserId,
  setUserRefreshToken,
  setTasks,
  setCurrentTask,
  setLists,
  setCurrentList,
  setBoards,
  editTaskId,
  editListId,
  editBoardId,
} from '../../actions/actionCreator';

import debaunce from './debaunce';

const FIREBASE_API_KEY = 'AIzaSyDL75b9bD07bmPWk7eN7VsoDZitkHdPTus';
const FIREBASE_DB = 'https://to-do-trello.firebaseio.com/';
const debaunceTime = 600 * 1000;
const isExist = (obj) => typeof (obj) === 'object' && obj !== null && obj !== undefined;
const isTokenExpired = (res) => res.error === 'Auth token is expired';
const refreshToken = () => (dispatch, getState) => {
  const { refreshToken } = getState().user;
  fetch(`https://securetoken.googleapis.com/v1/token?key=${FIREBASE_API_KEY}`, {
    method: 'POST',
    'Content-Type': 'application.json',
    body: JSON.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      dispatch(setUserToken(res.id_token));
      dispatch(setUserRefreshToken(res.efresh_token));
    });
};
const refreshTokenDebaunced = debaunce(refreshToken, debaunceTime);
export const registerUser = ({ email, password }) => (dispatch) => {
  fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`, {
    method: 'POST',
    'Content-Type': 'application/json',
    body: JSON.stringify({
      email, password,
    }),
  })
    .then((res) => res.json())
    .then(({ idToken, localId, refreshToken }) => {
      dispatch(setUserToken(idToken));
      dispatch(setUserRefreshToken(refreshToken));
      dispatch(setUserId(localId));
    });
};
export const loginUser = ({ email, password }) => (dispatch) => {
  fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`, {
    method: 'POST',
    'Content-Type': 'application/json',
    body: JSON.stringify({
      email, password, returnSecureToken: true,
    }),
  })
    .then((res) => res.json())
    .then(({ idToken, localId, refreshToken }) => {
      dispatch(setUserToken(idToken));
      dispatch(setUserRefreshToken(refreshToken));
      dispatch(setUserId(localId));
    });
};
export const addTask = (payload) => (dispatch, getState) => {
  const { id, token } = getState().user;
  const { title, checked, listId } = payload;
  const { temporaryId } = payload;
  const taskBody = {
    title,
    checked,
    listId,
  };
  fetch(`${FIREBASE_DB}users/${id}/tasks.json?auth=${token}`, {
    method: 'POST',
    'Content-Type': 'application/json',
    body: JSON.stringify(taskBody),
  })
    .then((res) => res.json())
    .then((res) => (isTokenExpired(res) ? dispatch(refreshTokenDebaunced()) : res))
    .then(({ name: id }) => dispatch(editTaskId({ newId: id, id: temporaryId })));
};
export const addList = (payload) => (dispatch, getState) => {
  const { id, token } = getState().user;
  const { title, boardId } = payload;
  const { temporaryId } = payload;
  const listBody = {
    title,
    boardId,
  };
  fetch(`${FIREBASE_DB}users/${id}/lists.json?auth=${token}`, {
    method: 'POST',
    'Content-Type': 'application/json',
    body: JSON.stringify(listBody),
  })
    .then((res) => res.json())
    .then((res) => (isTokenExpired(res) ? dispatch(refreshTokenDebaunced()) : res))
    .then(({ name }) => dispatch(editListId({ listId: temporaryId, newId: name })));
};
export const addBoard = (payload) => (dispatch, getState) => {
  const { id, token } = getState().user;
  const { title } = payload;
  const { temporaryId } = payload;
  const boardBody = {
    title,
  };
  fetch(`${FIREBASE_DB}users/${id}/boards.json?auth=${token}`, {
    method: 'POST',
    'Content-Type': 'application/json',
    body: JSON.stringify(boardBody),
  })
    .then((res) => res.json())
    .then((res) => (isTokenExpired(res) ? dispatch(refreshTokenDebaunced()) : res))
    .then(({ name }) => dispatch(editBoardId({ boardId: temporaryId, newId: name })));
};
export const removeTask = (payload) => (dispatch, getState) => {
  const { id: taskId } = payload;
  const { id, token } = getState().user;
  fetch(`${FIREBASE_DB}users/${id}/tasks/${taskId}.json?auth=${token}`, {
    method: 'DELETE',
    'Content-Type': 'application/json',
  });
};
export const deleteTasks = (payload) => (dispatch, getState) => {
  const { listId } = payload;
  const { user, tasks } = getState();
  const { id, token } = user;
  const targetTasks = tasks.filter(([, task]) => task.listId === listId);
  targetTasks.forEach(([taskId]) => {
    fetch(`${FIREBASE_DB}users/${id}/tasks/${taskId}.json?auth=${token}`, {
      method: 'DELETE',
      'Content-Type': 'application/json',
    })
      .then((res) => res.json())
      .then((res) => (isTokenExpired(res) ? dispatch(refreshTokenDebaunced()) : res));
  });
};
export const removeList = (payload) => (dispatch, getState) => {
  const { listId } = payload;
  const { id, token } = getState().user;
  fetch(`${FIREBASE_DB}users/${id}/lists/${listId}.json?auth=${token}`, {
    method: 'DELETE',
    'Content-Type': 'application/json',
  })
    .then((res) => res.json())
    .then((res) => (isTokenExpired(res) ? dispatch(refreshTokenDebaunced()) : res))
    .then(() => dispatch(deleteTasks({ listId })));
};
export const removeBoard = (payload) => (dispatch, getState) => {
  const { boardId } = payload;
  const { id, token } = getState().user;
  fetch(`${FIREBASE_DB}users/${id}/boards/${boardId}.json?auth=${token}`, {
    method: 'DELETE',
    'Content-Type': 'application/json',
  })
    .then((res) => res.json())
    .then((res) => (isTokenExpired(res) ? dispatch(refreshTokenDebaunced()) : res));
};
export const fetchTasks = () => (dispatch, getState) => {
  const { id, token } = getState().user;
  fetch(`${FIREBASE_DB}users/${id}/tasks.json?auth=${token}`, {
    method: 'GET',
    'Content-Type': 'application/json',
  })
    .then((res) => res.json())
    .then((res) => (isTokenExpired(res) ? dispatch(refreshTokenDebaunced()) : res))
    .then((res) => {
      if (isExist(res)) dispatch(setTasks(Object.entries(res)));
    });
};
export const fetchLists = () => (dispatch, getState) => {
  const { id, token } = getState().user;
  fetch(`${FIREBASE_DB}users/${id}/lists.json?auth=${token}`, {
    method: 'GET',
    'Content-Type': 'application/json',
  })
    .then((res) => res.json())
    .then((res) => (isTokenExpired(res) ? dispatch(refreshTokenDebaunced()) : res))
    .then((res) => {
      if (isExist(res)) dispatch(setLists(Object.entries(res)));
    });
};
export const fetchBoards = () => (dispatch, getState) => {
  const { id, token } = getState().user;
  fetch(`${FIREBASE_DB}users/${id}/boards.json?auth=${token}`, {
    method: 'GET',
    'Content-Type': 'application/json',
  })
    .then((res) => res.json())
    .then((res) => (isTokenExpired(res) ? dispatch(refreshTokenDebaunced()) : res))
    .then((res) => {
      if (isExist(res)) dispatch(setBoards(Object.entries(res)));
    });
};
export const fetchTask = (payload) => (dispatch, getState) => {
  const { taskId } = payload;
  const { user } = getState();
  const { id, token } = user;
  fetch(`${FIREBASE_DB}users/${id}/tasks/${taskId}.json?auth=${token}`, {
    method: 'GET',
    'Content-Type': 'application/json',
  })
    .then((res) => res.json())
    .then((res) => (isTokenExpired(res) ? dispatch(refreshTokenDebaunced()) : res))
    .then((res) => {
      if (isExist(res)) dispatch(setCurrentTask(res));
    });
};
export const fetchList = (payload) => (dispatch, getState) => {
  const { listId } = payload;
  const { user } = getState();
  const { id, token } = user;
  fetch(`${FIREBASE_DB}users/${id}/lists/${listId}.json?auth=${token}`, {
    method: 'GET',
    'Content-Type': 'application/json',
  })
    .then((res) => res.json())
    .then((res) => (isTokenExpired(res) ? dispatch(refreshTokenDebaunced()) : res))
    .then((res) => {
      if (isExist(res)) dispatch(setCurrentList(res));
    });
};
export const checkTask = (payload) => (dispatch, getState) => {
  const { id: taskId } = payload;
  const { user, tasks } = getState();
  const { id, token } = user;
  const targetTask = tasks.find((task) => task[0] === taskId);
  const targetTaskCheckedStatus = targetTask[1].checked;
  fetch(`${FIREBASE_DB}users/${id}/tasks/${taskId}.json?auth=${token}`, {
    method: 'PATCH',
    'Content-Type': 'application/json',
    body: JSON.stringify({
      checked: !targetTaskCheckedStatus,
    }),
  })
    .then((res) => res.json())
    .then((res) => (isTokenExpired(res) ? dispatch(refreshTokenDebaunced()) : res));
};
export const moveTask = (payload) => (dispatch, getState) => {
  const { listId, itemId: taskId } = payload;
  const { user } = getState();
  const { id, token } = user;
  fetch(`${FIREBASE_DB}users/${id}/tasks/${taskId}.json?auth=${token}`, {
    method: 'PATCH',
    'Content-Type': 'application/json',
    body: JSON.stringify({
      listId,
    }),
  })
    .then((res) => res.json())
    .then((res) => (isTokenExpired(res) ? dispatch(refreshTokenDebaunced()) : res));
};
export const editTaskTitle = (payload) => (dispatch, getState) => {
  const { title, id: taskId } = payload;
  const { user } = getState();
  const { id, token } = user;
  fetch(`${FIREBASE_DB}users/${id}/tasks/${taskId}.json?auth=${token}`, {
    method: 'PATCH',
    'Content-Type': 'application/json',
    body: JSON.stringify({
      title,
    }),
  })
    .then((res) => res.json())
    .then((res) => (isTokenExpired(res) ? dispatch(refreshTokenDebaunced()) : res));
};
export const editListTitle = (payload) => (dispatch, getState) => {
  const { title, listId } = payload;
  const { user } = getState();
  const { id, token } = user;
  fetch(`${FIREBASE_DB}users/${id}/lists/${listId}.json?auth=${token}`, {
    method: 'PATCH',
    'Content-Type': 'application/json',
    body: JSON.stringify({
      title,
    }),
  })
    .then((res) => res.json())
    .then((res) => (isTokenExpired(res) ? dispatch(refreshTokenDebaunced()) : res));
};

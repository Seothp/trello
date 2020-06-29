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
const FIREBASE_API_KEY = 'AIzaSyDL75b9bD07bmPWk7eN7VsoDZitkHdPTus';
const FIREBASE_DB = 'https://to-do-trello.firebaseio.com/';
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
export const addTask = (payload) => (dispatch, getState) => {
  const { id } = getState().user;
  const { title, checked, listId } = payload;
  const { temporaryId } = payload;
  const taskBody = {
    title,
    checked,
    listId,
  };
  fetch(`${FIREBASE_DB}users/${id}/tasks.json?`, {
    method: 'POST',
    'Content-Type': 'application/json',
    body: JSON.stringify(taskBody),
  })
    .then((res) => res.json())
    .then(({ name: id }) => dispatch(editTaskId({ newId: id, id: temporaryId })));
};
export const addList = (payload) => (dispatch, getState) => {
  const { id } = getState().user;
  const { title, boardId } = payload;
  const { temporaryId } = payload;
  const listBody = {
    title,
    boardId,
  };
  fetch(`${FIREBASE_DB}users/${id}/lists.json?`, {
    method: 'POST',
    'Content-Type': 'application/json',
    body: JSON.stringify(listBody),
  })
    .then((res) => res.json())
    .then(({ name }) => dispatch(editListId({ listId: temporaryId, newId: name })));
};
export const addBoard = (payload) => (dispatch, getState) => {
  const { id } = getState().user;
  const { title } = payload;
  const { temporaryId } = payload;
  const boardBody = {
    title,
  };
  fetch(`${FIREBASE_DB}users/${id}/boards.json?`, {
    method: 'POST',
    'Content-Type': 'application/json',
    body: JSON.stringify(boardBody),
  })
    .then((res) => res.json())
    .then(({ name }) => dispatch(editBoardId({ boardId: temporaryId, newId: name })));
};
export const removeTask = (payload) => (dispatch, getState) => {
  const { id: taskId } = payload;
  const { id } = getState().user;
  fetch(`${FIREBASE_DB}users/${id}/tasks/${taskId}.json?`, {
    method: 'DELETE',
    'Content-Type': 'application/json',
  });
};
export const deleteTasks = (payload) => (dispatch, getState) => {
  const { listId } = payload;
  const { user, tasks } = getState();
  const { id } = user;
  const targetTasks = tasks.filter(([, task]) => task.listId === listId);
  targetTasks.forEach(([taskId]) => {
    fetch(`${FIREBASE_DB}users/${id}/tasks/${taskId}.json?`, {
      method: 'DELETE',
      'Content-Type': 'application/json',
    });
  });
};
export const removeList = (payload) => (dispatch, getState) => {
  const { listId } = payload;
  const { id } = getState().user;
  fetch(`${FIREBASE_DB}users/${id}/lists/${listId}.json?`, {
    method: 'DELETE',
    'Content-Type': 'application/json',
  }).then(() => dispatch(deleteTasks({ listId })));
};
export const removeBoard = (payload) => (dispatch, getState) => {
  const { boardId } = payload;
  const { id } = getState().user;
  fetch(`${FIREBASE_DB}users/${id}/boards/${boardId}.json?`, {
    method: 'DELETE',
    'Content-Type': 'application/json',
  });
};
export const fetchTasks = (payload) => (dispatch, getState) => {
  const { id } = getState().user;
  fetch(`${FIREBASE_DB}users/${id}/tasks.json?`, {
    method: 'GET',
    'Content-Type': 'application/json',
  })
    .then((res) => res.json())
    .then((res) => {
      if (typeof (res) === 'object' && res !== null && res !== undefined) dispatch(setTasks(Object.entries(res)));
    });
};
export const fetchLists = (payload) => (dispatch, getState) => {
  const { id } = getState().user;
  fetch(`${FIREBASE_DB}users/${id}/lists.json?`, {
    method: 'GET',
    'Content-Type': 'application/json',
  })
    .then((res) => res.json())
    .then((res) => {
      if (typeof (res) === 'object' && res !== null && res !== undefined) dispatch(setLists(Object.entries(res)));
    });
};
export const fetchBoards = (payload) => (dispatch, getState) => {
  const { id } = getState().user;
  fetch(`${FIREBASE_DB}users/${id}/boards.json?`, {
    method: 'GET',
    'Content-Type': 'application/json',
  })
    .then((res) => res.json())
    .then((res) => {
      if (typeof (res) === 'object' && res !== null && res !== undefined) dispatch(setBoards(Object.entries(res)));
    });
};
export const fetchTask = (payload) => (dispatch, getState) => {
  const { taskId } = payload;
  const { user } = getState();
  const { id } = user;
  fetch(`${FIREBASE_DB}users/${id}/tasks/${taskId}.json?`, {
    method: 'GET',
    'Content-Type': 'application/json',
  })
    .then((res) => res.json())
    .then((res) => {
      if (typeof (res) === 'object' && res !== null && res !== undefined) dispatch(setCurrentTask(res));
    });
};
export const fetchList = (payload) => (dispatch, getState) => {
  const { listId } = payload;
  const { user } = getState();
  const { id } = user;
  fetch(`${FIREBASE_DB}users/${id}/lists/${listId}.json?`, {
    method: 'GET',
    'Content-Type': 'application/json',
  })
    .then((res) => res.json())
    .then((res) => {
      if (typeof (res) === 'object' && res !== null && res !== undefined) dispatch(setCurrentList(res));
    });
};
export const checkTask = (payload) => (dispatch, getState) => {
  const { id: taskId } = payload;
  const { user, tasks } = getState();
  const { id } = user;
  const targetTask = tasks.find((task) => task[0] === taskId);
  const targetTaskCheckedStatus = targetTask[1].checked;
  fetch(`${FIREBASE_DB}users/${id}/tasks/${taskId}.json?`, {
    method: 'PATCH',
    'Content-Type': 'application/json',
    body: JSON.stringify({
      checked: !targetTaskCheckedStatus,
    }),
  });
};
export const moveTask = (payload) => (dispatch, getState) => {
  const { listId, itemId: taskId } = payload;
  const { user } = getState();
  const { id } = user;
  fetch(`${FIREBASE_DB}users/${id}/tasks/${taskId}.json?`, {
    method: 'PATCH',
    'Content-Type': 'application/json',
    body: JSON.stringify({
      listId,
    }),
  });
};
export const editTaskTitle = (payload) => (dispatch, getState) => {
  const { title, id: taskId } = payload;
  const { user } = getState();
  const { id } = user;
  fetch(`${FIREBASE_DB}users/${id}/tasks/${taskId}.json?`, {
    method: 'PATCH',
    'Content-Type': 'application/json',
    body: JSON.stringify({
      title,
    }),
  });
};
export const editListTitle = (payload) => (dispatch, getState) => {
  const { title, listId } = payload;
  const { user } = getState();
  const { id } = user;
  fetch(`${FIREBASE_DB}users/${id}/lists/${listId}.json?`, {
    method: 'PATCH',
    'Content-Type': 'application/json',
    body: JSON.stringify({
      title,
    }),
  });
};

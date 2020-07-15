import { load } from 'redux-localstorage-simple';
import {
  SET_USER_TOKEN, SET_USER_ID, SET_USER_REFRESH_TOKEN, LOGOUT_USER,
} from '../constants';

const DATA = load({ namespace: 'todo-data' });
const USER = DATA.user || {
  token: '',
  id: '',
};
if (!USER.token || USER.token === undefined) {
  USER.token = '';
}
if (!USER.id || USER.id === undefined) {
  USER.id = '';
}
if (!USER.refreshToken || USER.refreshToken === undefined) {
  USER.refreshToken = '';
}
const user = (state = USER, payload) => {
  const {
    type, token, id, refreshToken,
  } = payload;
  switch (type) {
    case SET_USER_TOKEN:
      return {
        ...state,
        token,
      };
    case SET_USER_ID:
      return {
        ...state,
        id,
      };
    case SET_USER_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken,
      };
    case LOGOUT_USER:
      return {
        ...state,
        id: '',
        token: '',
        refreshToken: '',
      };
    default:
      return state;
  }
};
export default user;

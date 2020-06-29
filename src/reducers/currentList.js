import { SET_CURRENT_LIST } from '../constants';

const currentList = (state = {}, payload) => {
  const { type, currentList } = payload;
  switch (type) {
    case SET_CURRENT_LIST:
      return currentList;
    default:
      return state;
  }
};

export default currentList;

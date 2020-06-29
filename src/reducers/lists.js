import {
  ADD_LIST, REMOVE_LIST, EDIT_LIST_TITLE, SET_LISTS, EDIT_LIST_ID,
} from '../constants';

const LISTS = {
  lists: [],
};

const lists = (state = LISTS.lists, payload) => {
  const {
    type, listId, title, boardId, lists, newId,
  } = payload;
  switch (type) {
    case ADD_LIST:
      return [
        ...state,
        [
          listId,
          {
            title,
            boardId,
          },
        ],
      ];
    case REMOVE_LIST:
      return [...state].filter(([id]) => id !== listId);
    case EDIT_LIST_TITLE:
      return state.map((list) => {
        const id = list[0];
        const listBody = list[1];
        if (id === listId) {
          return [id, {
            ...listBody,
            title,
          }];
        }
        return list;
      });
    case EDIT_LIST_ID:
      return state.map((list) => {
        const id = list[0];
        const listBody = list[1];
        if (id === listId) {
          return [
            newId,
            listBody,
          ];
        }
        return list;
      });
    case SET_LISTS:
      return lists;
    default:
      return state;
  }
};

export default lists;

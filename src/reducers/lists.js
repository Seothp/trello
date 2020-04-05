import { load } from 'redux-localstorage-simple';

import { ADD_LIST, REMOVE_LIST, EDIT_LIST_TITLE, SET_LISTS } from '../constants';

let LISTS = load({namespace: 'todo-data'});

if (!LISTS.lists || !LISTS.lists.length) {
    LISTS = {
        lists: []
    }
}

const lists = (state = LISTS.lists, payload) => {
    const  { type, listId, title, boardId, lists } = payload
    switch (type) {
        case ADD_LIST:
            return [
                ...state, {
                    listId,
                    title,
                    boardId
                }
            ];
        case REMOVE_LIST:
            return [...state].filter(list => list.listId !== listId)
        case EDIT_LIST_TITLE:
            return state.map(list => {
                if (list.listId === listId) {
                    return {
                        ...list,
                        title
                    }
                }
                return list
            })
        case SET_LISTS:
            return lists
        default:
            return state;
    }
}

export default lists;

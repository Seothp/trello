import { load } from 'redux-localstorage-simple';

import { ADD_LIST, REMOVE_LIST, EDIT_LIST_TITLE } from '../constants';

let LISTS = load({namespace: 'todo-data'});

if (!LISTS || !LISTS.lists || !LISTS.lists.length) {
    LISTS = {
        lists: []
    }
}

const lists = (state = LISTS.lists, { listId, title, boardId, type }) => {
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
        default:
            return state;
    }
}

export default lists;

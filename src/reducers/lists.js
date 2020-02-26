import { load } from 'redux-localstorage-simple';

import { ADD_LIST, REMOVE_LIST } from '../constants';

let LISTS = load({namespace: 'todo-data'});

if (!LISTS && !LISTS.length && !LISTS.lists) {
    LISTS = {
        lists: []
    }
}

const lists = (state = LISTS.lists, { listId, title, type }) => {
    switch (type) {
        case ADD_LIST:
            return [
                ...state, {
                    listId,
                    title,
                }
            ];
        case REMOVE_LIST:
            return [...state].filter(list => list.listId !== listId)
        default:
            return state;
    }
}

export default lists;
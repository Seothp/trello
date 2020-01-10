import { ADD_LIST, REMOVE_LIST } from '../constants';

let LISTS = [];

const tasks = (state = LISTS, { listId, title }) => {
    switch (state) {
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

export default tasks;
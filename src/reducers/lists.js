import { ADD_LIST, REMOVE_LIST } from '../constants';

let LISTS = [{
    listId: 213123213,
    title: 'test'
}];

const tasks = (state = LISTS, { listId, title, type }) => {
    switch (type) {
        case ADD_LIST:
            console.log('reduced')
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
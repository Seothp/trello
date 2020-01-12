import { ADD_LIST, REMOVE_LIST } from '../constants';

let LISTS = [{
    listId: 213213,
    title: 'test'
}];

const lists = (state = LISTS, { listId, title, type }) => {
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

export default lists;
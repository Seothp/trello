import { ADD_TASK, REMOVE_TASK, CHECK_TASK, MOVE_TASK } from '../constants'

let TASKS = [
    {
        listId: 213213,
        id: 12432135435,
        title: 'title',
        checked: false,
    }
]

const tasks = (state = TASKS, {listId, id, title, checked, type} ) => {
    switch (type) {
        case ADD_TASK:
            return [
                ...state, {
                    listId,
                    id,
                    title,
                    checked
                }
            ]
        case REMOVE_TASK:
            console.log('ping')
            return state.filter((item) => {
                console.log(item.id, id);
                return item.id !== id;
            });
        default:
            return state
    }
}

export default tasks;

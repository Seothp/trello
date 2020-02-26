import { load } from 'redux-localstorage-simple'

import { ADD_TASK, REMOVE_TASK, CHECK_TASK, MOVE_TASK } from '../constants'


let TASKS = load({namespace: 'todo-data'});
if (!TASKS && !TASKS.length && TASKS.tasks) {
    TASKS = {
        tasks: []
    }
}

const tasks = (state = TASKS.tasks, {listId, id, title, checked, type} ) => {
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
            return state.filter((item) => {
                return item.id !== id;
            });
        case CHECK_TASK:
            return state.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        checked: !item.checked,
                    }
                }
                return item;
            })
        case MOVE_TASK: 
            return state.map((item) => {
                if (item.id === id ) {
                    return {
                        ...item, 
                        listId,
                    }
                }
                return item
            })
        default:
            return state
    }
}

export default tasks;

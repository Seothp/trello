import { load } from 'redux-localstorage-simple'

import { ADD_TASK, REMOVE_TASK, CHECK_TASK, MOVE_TASK, DELETE_TASKS, EDIT_TASK_TITLE, SET_TASKS } from '../constants'


// let TASKS = load({namespace: 'todo-data'});
let TASKS = {}
if (!TASKS.tasks || !TASKS.tasks.length) {
    TASKS = {
        tasks: []
    }
}

const tasks = (state = TASKS.tasks, payload ) => {
    const { type, listId, id, title, checked, tasks } = payload
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
            return state.filter(item => {
                return item.id !== id;
            });
        case CHECK_TASK:
            return state.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        checked: !item.checked,
                    }
                }
                return item;
            })
        case MOVE_TASK:
            return state.map(item => {
                if (item.id === id) {
                    return {
                        ...item, 
                        listId,
                    }
                }
                return item
            })
        case EDIT_TASK_TITLE: 
            return state.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        title,
                    }
                }
                return item
            })
        case DELETE_TASKS:
            return state.filter(item => item.listId !== listId)
        case SET_TASKS:
            console.log('setted')
            return tasks
        default:
            return state
    }
}

export default tasks;

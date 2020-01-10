import  { ADD_TASK, ADD_LIST, REMOVE_TASK, REMOVE_LIST, CHECK_TASK, MOVE_TASK } from '../constants'

export const addList = (listId, title) => {
    console.log('ping');
    return ({
    type: ADD_LIST,
    listId,
    title,
})}

export const removeList = listId => ({
    type: REMOVE_LIST,
    listId,
})

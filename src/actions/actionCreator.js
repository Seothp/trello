import  { 
    ADD_TASK, 
    ADD_LIST, 
    REMOVE_TASK, 
    REMOVE_LIST, 
    CHECK_TASK, 
    MOVE_TASK, 
    DELETE_TASKS, 
    ADD_BOARD, 
    REMOVE_BOARD 
} from '../constants'

export const addList = ({listId, title, boardId}) => {
    return ({
    type: ADD_LIST,
    listId,
    title,
    boardId,
})}

export const removeList = ({listId}) => ({
    type: REMOVE_LIST,
    listId,
})

export const addTask = ({listId, title, id}) => ({
    type: ADD_TASK,
    listId,
    title,
    id,
    checked: false,
});

export const removeTask = ({ id }) => ({
    type: REMOVE_TASK,
    id,
})

export const checkTask = ({ id }) => ({
    type: CHECK_TASK,
    id,
})

export const moveTask = ({ listId, itemId }) => {
    return ({
    type: MOVE_TASK,
    listId,
    id: itemId,
})}

export const deleteTasks = ({ listId }) => ({
    type: DELETE_TASKS,
    listId,
})

export const addBoard = ({ boardId, title }) => ({
    type: ADD_BOARD,
    boardId,
    title,
})

export const removeBoard = ({ boardId}) => ({
    type: REMOVE_BOARD,
    boardId,
})
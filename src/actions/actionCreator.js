import  { 
    ADD_TASK, 
    ADD_LIST, 
    REMOVE_TASK, 
    REMOVE_LIST, 
    CHECK_TASK, 
    MOVE_TASK, 
    DELETE_TASKS, 
    ADD_BOARD, 
    REMOVE_BOARD,
    EDIT_TASK_TITLE,
    EDIT_LIST_TITLE,
    SET_USER_TOKEN,
    SET_USER_ID,
    SET_USER_REFRESH_TOKEN,
    SET_TASKS,
    SET_BOARDS,
    SET_LISTS,
} from '../constants'


export const addTask = ({ listId, title, id }) => ({
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

export const moveTask = ({ listId, itemId }) => ({
    type: MOVE_TASK,
    listId,
    id: itemId,
})

export const editTaskTitle = ({ id, title }) => ({
    type: EDIT_TASK_TITLE,
    id,
    title,
})

export const deleteTasks = ({ listId }) => ({
    type: DELETE_TASKS,
    listId,
})

export const setTasks = tasks => {
    console.log('setted')
    return ({
    type: SET_TASKS,
    tasks
})}

export const addList = ({ listId, title, boardId }) => {
    return ({
    type: ADD_LIST,
    listId,
    title,
    boardId,
})}

export const removeList = ({ listId }) => ({
    type: REMOVE_LIST,
    listId,
})

export const editListTitle = ({ listId, title }) => ({
    type: EDIT_LIST_TITLE,
    listId,
    title,
})

export const setLists = lists => ({
    type: SET_LISTS,
    lists
})

export const addBoard = ({ boardId, title }) => ({
    type: ADD_BOARD,
    boardId,
    title,
})

export const removeBoard = ({ boardId }) => ({
    type: REMOVE_BOARD,
    boardId,
})

export const setBoards = boards => ({
    type: SET_BOARDS,
    boards
})

export const setUserToken = token => ({
    type: SET_USER_TOKEN,
    token,
})

export const setUserId = id => ({
    type: SET_USER_ID,
    id,
})

export const setUserRefreshToken = refreshToken => ({
    type: SET_USER_REFRESH_TOKEN,
    refreshToken,
})
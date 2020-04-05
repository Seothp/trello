import { 
    setUserToken, 
    setUserId, 
    setUserRefreshToken ,
    setTasks,
    setLists,
    setBoards,
} from '../../actions/actionCreator'
const FIREBASE_API_KEY = 'AIzaSyDL75b9bD07bmPWk7eN7VsoDZitkHdPTus'
export const registerUser = ({email, password}) => dispatch => {
    console.log('registration started')
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`, {
        method: 'POST',
        'Content-Type': 'application/json',
        body: JSON.stringify({
            email, password
        })
    })
        .then(res => res.json())
        .then(({ idToken, localId, refreshToken }) => {
            dispatch(setUserToken(idToken))
            dispatch(setUserRefreshToken(refreshToken))
            dispatch(setUserId(localId))
        });
}


export const loginUserWithEmail = ({ email, password }) => dispatch => {
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`, {
        method: 'POST',
        'Content-Type': 'application/json',
        body: JSON.stringify({
            email, password
        })
    })
        .then(res => res.json())
        .then(({ idToken, localId, refreshToken }) => {
            dispatch(setUserToken(idToken))
            dispatch(setUserRefreshToken(refreshToken))
            dispatch(setUserId(localId))
        });
}

export const addTask = payload => (dispatch, getState) => {
    const { id } = getState().user
    fetch(`https://to-do-trello.firebaseio.com/users/${id}/tasks.json?`, {
        method: 'POST',
        'Content-Type': 'application/json',
        body: JSON.stringify(payload)
    })
}

export const addList = payload => (dispatch, getState) => {
    const { id } = getState().user
    fetch(`https://to-do-trello.firebaseio.com/users/${id}/lists.json?`, {
        method: 'POST',
        'Content-Type': 'application/json',
        body: JSON.stringify(payload)
    })
}

export const addBoard = payload => (dispatch, getState) => {
    const { id } = getState().user
    fetch(`https://to-do-trello.firebaseio.com/users/${id}/boards.json?`, {
        method: 'POST',
        'Content-Type': 'application/json',
        body: JSON.stringify(payload)
    })
}

export const removeTask = payload => (dispatch, getState) => {
    const { id: taskId } = payload
    const { id } = getState().user
    console.log('remove task')
    fetch(`https://to-do-trello.firebaseio.com/users/${id}/tasks/${taskId}.json?`, {
        method: 'DELETE',
        'Content-Type': 'application/json',
    }).then(r => r.json()).then(r => console.log(r))
}
export const removeList = payload => (dispatch, getState) => {
    const { listId } = payload
    const { id } = getState().user
    console.log('remove list')
    fetch(`https://to-do-trello.firebaseio.com/users/${id}/lists/${listId}.json?`, {
        method: 'DELETE',
        'Content-Type': 'application/json',
    }).then(r => r.json()).then(r => console.log(r))
}
export const removeBoard = payload => (dispatch, getState) => {
    const { boardId } = payload
    const { id } = getState().user
    console.log('remove board')
    fetch(`https://to-do-trello.firebaseio.com/users/${id}/boards/${boardId}.json?`, {
        method: 'DELETE',
        'Content-Type': 'application/json',
    }).then(r => r.json()).then(r => console.log(r))
}

export const fetchTasks = payload => (dispatch, getState) => {
    const { id } = getState().user
    fetch(`https://to-do-trello.firebaseio.com/users/${id}/tasks.json?`, {
        method: 'GET',
        'Content-Type': 'application/json'
    })
        .then(res => res.json())
        .then(res => {
            if ( typeof(res) === 'object' && res !== null && res !== undefined) dispatch(setTasks(Object.entries(res)))
            
        })
}
export const fetchLists = payload => (dispatch, getState) => {
    const { id } = getState().user
    fetch(`https://to-do-trello.firebaseio.com/users/${id}/lists.json?`, {
        method: 'GET',
        'Content-Type': 'application/json'
    })
        .then(res => res.json())
        .then(res => {
            if ( typeof(res) === 'object' && res !== null && res !== undefined) dispatch(setLists(Object.entries(res)))
            
        })
}
export const fetchBoards = payload => (dispatch, getState) => {
    const { id } = getState().user 
    fetch(`https://to-do-trello.firebaseio.com/users/${id}/boards.json?`, {
        method: 'GET',
        'Content-Type': 'application/json'
    })
        .then(res => res.json())
        .then(res => {
            if ( typeof(res) === 'object' && res !== null && res !== undefined) dispatch(setBoards(Object.entries(res)))
            
        })
}

export const checkTask = payload => (dispatch, getState) => {
    const { id: taskId } = payload
    const { user, tasks } = getState()
    const { id } = user
    const targetTask = tasks.find((task) => task[0] === taskId)
    const targetTaskCheckedStatus = targetTask[1].checked
    fetch(`https://to-do-trello.firebaseio.com/users/${id}/tasks/${taskId}.json?`, {
        method: 'PATCH',
        'Content-Type': 'application/json',
        body: JSON.stringify({
            checked: !targetTaskCheckedStatus
        })
    }).then(r => r.json()).then(r => console.log(r))
}
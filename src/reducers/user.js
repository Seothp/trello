import { load } from 'redux-localstorage-simple';
import { SET_USER_TOKEN, SET_USER_ID } from '../constants';
let DATA = load({namespace: 'todo-data'})
console.log()
let USER = DATA.user || {
    token: '',
    id: '',
}   
if ( !USER.token || USER.token === undefined) {
    USER.token = '';
}
if ( !USER.id || USER.id === undefined) {
    USER.id = '';
}
const user = (state = USER, payload ) => {
    const { type, token, id } = payload
    switch (type) {
        case SET_USER_TOKEN:
            return {
                ...state,
                token
            }
        case SET_USER_ID:
            return {
                ...state,
                id
            }
        default:
            return state
    }
}
export default user;
import { load } from 'redux-localstorage-simple';
import { SET_USER_TOKEN } from '../constants';
let TOKEN = load({namespace: 'todo-data'})
console.log(TOKEN)
if (!TOKEN || !TOKEN.token || TOKEN.token === undefined) {
    TOKEN = {
        token: ''
    }
}
const token = (state = TOKEN.token, payload ) => {
    const { type, token } = payload
    switch (type) {
        case SET_USER_TOKEN:
            return token
        default:
            return state
    }
}
export default token;
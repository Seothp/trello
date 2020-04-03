import { setUserToken } from '../../actions/actionCreator'
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
        .then(({ idToken }) => {
            dispatch(setUserToken(idToken))
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
        .then(({ idToken }) => {
            dispatch(setUserToken(idToken))
        });
}

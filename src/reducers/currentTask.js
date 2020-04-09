import { SET_CURRENT_TASK } from '../constants';

const currentTask = (state = {}, payload) => {
    const { type, currentTask } = payload
    switch (type) {
        case SET_CURRENT_TASK:
            return currentTask
        default:
            return state
    }
}

export default currentTask
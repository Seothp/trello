import { load } from 'redux-localstorage-simple';

import { ADD_BOARD, REMOVE_BOARD, SET_BOARDS } from '../constants';

// let BOARDS = load({namespace: 'todo-data'});
let BOARDS = {}

if (!BOARDS.boards || !BOARDS.boards.length) {
    BOARDS = {
        boards: []
    }
}

const boards = (state = BOARDS.boards, payload) => {
    const { type, title, boardId, boards } = payload;
    switch (type) {
        case ADD_BOARD:
            return [
                ...state, {
                    boardId,
                    title,
                }
            ];
        case REMOVE_BOARD:
            console.log('removed')
            return [...state].filter(board => board.boardId !== boardId)
        case SET_BOARDS: 
            return boards
        default:
            return state;
    }
}

export default boards;

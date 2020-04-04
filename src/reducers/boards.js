import { load } from 'redux-localstorage-simple';

import { ADD_BOARD, REMOVE_BOARD } from '../constants';

let BOARDS = load({namespace: 'todo-data'});

if (!BOARDS.boards || !BOARDS.boards.length) {
    BOARDS = {
        boards: []
    }
}

const boards = (state = BOARDS.boards, { title, boardId, type }) => {
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
        default:
            return state;
    }
}

export default boards;

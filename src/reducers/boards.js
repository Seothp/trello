import { load } from 'redux-localstorage-simple';

import { ADD_BOARD, REMOVE_BOARD, SET_BOARDS, EDIT_BOARD_ID } from '../constants';

let BOARDS = {
    boards: []
}

const boards = (state = BOARDS.boards, payload) => {
    const { type, title, boardId, boards, newId } = payload;
    switch (type) {
        case ADD_BOARD:
            const boardBody = {
                title
            }
            const board = [
                boardId,
                boardBody
            ]
            return [
                ...state,
                board
            ];
        case REMOVE_BOARD:
            return [...state].filter(([id]) => id !== boardId)
        case EDIT_BOARD_ID:
            return state.map(board => {
                const id = board[0]
                const boardBody = board[1]
                if (id === boardId) {
                    return [
                        newId,
                        boardBody
                    ]
                }
                return board
            })
        case SET_BOARDS:
            return boards
        default:
            return state;
    }
}

export default boards;

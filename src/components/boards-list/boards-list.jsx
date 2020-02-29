import React from 'react';

import './boards-list.css'

export const BoardsList = ({ boards, changeCurrentBoard, onAddBoard }) => {
    return (
        <div className="borads-list">
            <button className="board-item" key='all' onClick={() => changeCurrentBoard(null)}>all</button>
            { boards && boards.map(({boardId, title}, index) => (
                <button className="board-item" key={boardId} onClick={() => changeCurrentBoard(boardId)}>{index + 1}</button>
            ))}
            <button className='boards-list-button' key='add'onClick={onAddBoard}>+</button>
        </div>
    )
}

import React, { useState } from 'react';

import './boards-list.css'

const BoardsList = ({ boards, changeCurrentBoard, onAddBoard, onDeleteBoard }) => {
    const [ isOpen, setIsOpen ] = useState(false)

    const toggleOpened = () => setIsOpen(!isOpen)
    const handleWrapperClick = (e) => {
        e.persist()
        if (e.target.className.indexOf('boards-list-wrapper') !== -1) toggleOpened()
    }
    const opened = isOpen? 'opened': '';
    return (
        <div className={"boards-list-wrapper " + opened} onClick={handleWrapperClick}>
            <div className="borads-list">
                <button className="board-toggle-btn" onClick={toggleOpened}>OP</button>
                <div className="board-item" key='all' onClick={() => changeCurrentBoard(0)}>all</div>
                { boards && boards.map(([boardId, { title }], index) => (
                    <div className="board-item" key={boardId}>
                        <div className="board-item-btn" onClick={() => changeCurrentBoard(boardId)}>{index + 1}</div>
                        <button className="board-delete-btn" onClick={() => onDeleteBoard({boardId})}>del</button>
                    </div>
                ))}
                <div className='boards-list-button' key='add' onClick={onAddBoard}>+</div>
            </div>
        </div>
        
    )
}

export default BoardsList
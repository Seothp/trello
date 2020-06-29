import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './boards-list.css';

const BoardsList = ({
  boards, setCurrentBoard, onAddBoard, onDeleteBoard,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => setIsOpen(!isOpen);
  const handleWrapperClick = (e) => {
    e.persist();
    if (e.target.className.indexOf('boards-list-wrapper') !== -1) toggleIsOpen();
  };
  const opened = isOpen ? 'opened' : '';
  return (
    <div className={`boards-list-wrapper ${opened}`} onClick={handleWrapperClick}>
      <div className="borads-list">
        <button className="board-toggle-btn" type="submit" onClick={toggleIsOpen}>OP</button>
        <button className="board-item" key="all" type="submit" onClick={() => setCurrentBoard(0)}>all</button>
        {boards && boards.map(([boardId, { title }], index) => (
          <div className="board-item" key={boardId}>
            <button className="board-item-btn" type="submit" onClick={() => setCurrentBoard(boardId)}>
              {isOpen ? `№${index + 1}. ${title}` : index + 1}
            </button>
            <button className="board-delete-btn" type="submit" onClick={() => onDeleteBoard({ boardId })}>del</button>
          </div>
        ))}
        <button className="boards-list-button" key="add" type="submit" onClick={onAddBoard}>+</button>
      </div>
    </div>

  );
};

BoardsList.propTypes = {
  setCurrentBoard: PropTypes.func.isRequired,
  onAddBoard: PropTypes.func.isRequired,
  onDeleteBoard: PropTypes.func.isRequired,
  boards: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]))).isRequired,
};

export default BoardsList;

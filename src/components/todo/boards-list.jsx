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
  const isSmallScreen = window.innerWidth < 375;
  const hidden = isSmallScreen && !isOpen ? 'hidden' : '';
  return (
    <div className={`boards-list-wrapper ${opened}`} onClick={handleWrapperClick}>
      <div className="borads-list">
        <button className="board-toggle-btn board-btn board-item" type="submit" onClick={toggleIsOpen}>
          <div className="burger">
            <span className="burger__line" />
            <span className="burger__line" />
            <span className="burger__line" />
          </div>
        </button>
        <div className={`board-items ${hidden}`}>
          <button className="board-item board-btn" key="all" type="submit" onClick={() => setCurrentBoard(0)}>all</button>
          {boards && boards.map(([boardId, { title }], index) => (
            <div className="board-item" key={boardId}>
              <button className={`board-item-btn board-btn ${opened}`} type="submit" onClick={() => setCurrentBoard(boardId)}>
                {isOpen
                  ? (
                    <>
                      <span className="board-btn-num">
                        {index + 1}
                        .
                      </span>
                      <span>
                        {title}
                      </span>
                    </>
                  )
                  : index + 1}
              </button>
              <button className="board-delete-btn board-btn" type="submit" onClick={() => onDeleteBoard({ boardId })}>del</button>
            </div>
          ))}
          <button className="boards-list-button board-btn board-item" key="add" type="submit" onClick={onAddBoard}>+</button>
        </div>

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

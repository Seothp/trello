import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from '../modal/modal';

import './modal-add-board.css';

const ModalAddBoard = ({ isOpen, onAccept, onCancel }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = ({ target: { value } }) => setInputValue(value);
  const clearModal = () => setInputValue('');
  const handleClick = () => {
    onAccept(inputValue);
    onCancel();
    clearModal();
  };

  return (
    <Modal onCancel={onCancel} isOpen={isOpen}>
      <div className="modal-add-board">
        <div className="add-board-form">
          <input type="text" className="add-board-title" value={inputValue} onChange={handleInputChange} />
          <button className="modal-add-board-btn" type="button" onClick={handleClick}>add</button>
        </div>
      </div>
    </Modal>
  );
};

ModalAddBoard.propTypes = {
  isOpen: PropTypes.bool,
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

ModalAddBoard.defaultProps = {
  isOpen: false,
};

export default ModalAddBoard;

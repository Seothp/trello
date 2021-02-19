import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from '../modal/modal';

const ModalTaskInfo = ({
  isOpen, taskId, onClose, onEditTitle, task,
}) => {
  const [title, setTitle] = useState(task.title);
  const handleInputChange = ({ target: { value } }) => setTitle(value);
  const clearModal = () => setTitle('');
  const handleClick = () => {
    onEditTitle({ id: taskId, title });
    onClose();
    clearModal();
  };
  return (
    <Modal isOpen={isOpen} onCancel={onClose}>
      <div className="modal-task-info">
        <div className="task-info">
          <input className="task-title" onChange={handleInputChange} value={title || ''} />
          <button className="task-title-edit" type="button" onClick={handleClick}>edit</button>
        </div>
      </div>
    </Modal>
  );
};

ModalTaskInfo.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  taskId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onEditTitle: PropTypes.func.isRequired,
  task: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ])).isRequired,
};

export default ModalTaskInfo;

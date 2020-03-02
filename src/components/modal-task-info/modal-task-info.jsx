import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from '../modal/modal'

const ModalTaskInfo = ({ isOpen, taskId, tasks, onClose, onEditTitle }) => {
    const task = tasks.find(task => task.id === taskId);
    const [ title, setTitle ] = useState(null);
    
    const handleInputChange = (e) => {
        setTitle(e.target.value)
    }
    return (
        <Modal isOpen={isOpen} onCancel={onClose}>
            <div className="modal-task-info">
                { task && 
                    <div className="task-info">
                        <input className="task-title" onChange={handleInputChange} value={title !== null? title: task.title }/>
                        <button className="task-title-edit" onClick={() => onEditTitle({id: taskId, title})}>edit</button>
                    </div>
                }
            </div>
        </Modal>
    )
}

ModalTaskInfo.propTypes = {
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool,
}

ModalTaskInfo.defaultProps = {
    isOpen: false,
}


export default ModalTaskInfo;

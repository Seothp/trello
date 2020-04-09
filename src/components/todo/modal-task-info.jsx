import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Modal from '../modal/modal'

const ModalTaskInfo = ({ isOpen, taskId, tasks, onClose, onEditTitle, fetchTask, currentTask }) => {
    const [ title, setTitle ] = useState(null);
    useEffect(() => {
        if (taskId) {
            fetchTask({taskId})
        }
    }, [taskId])
    useEffect(() => {
        if (currentTask) {
            setTitle(currentTask.title)
        }
    }, [currentTask])
    const handleInputChange = ({target: {value}}) => setTitle(value)
    const clearModal = () => setTitle('')
    const onClick = () => {
        onEditTitle({id: taskId, title});
        onClose();
        clearModal();
    }
    return (
        <Modal isOpen={isOpen} onCancel={onClose}>
            <div className="modal-task-info">
                    <div className="task-info">
                        <input className="task-title" onChange={handleInputChange} value={title || ''}/>
                        <button className="task-title-edit" onClick={onClick}>edit</button>
                    </div>
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

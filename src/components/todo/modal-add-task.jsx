import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from '../modal/modal'

import './modal-add-task.css'

const ModalAddTask = ({isOpen, onAccept, onCancel}) => {
    const [inputValue, setInputValue] =  useState('')

    const handleInputChange = ({target: {value}}) => setInputValue(value) 
    const clearModal = () => setInputValue('')
    const onClick = () => {
        onAccept(inputValue);
        onCancel();
        clearModal();
    }

    return (
        <Modal onCancel={onCancel} isOpen={isOpen}>
            <div className="modal-add-task">
                <div className="add-task-form">
                    <input type="text" className="add-task-title" value={inputValue} onChange={handleInputChange}/>
                    <button className='modal-add-task-btn' onClick={onClick}>add</button>
                </div>
            </div>
        </Modal>
    )
}

ModalAddTask.propTypes = {
    isOpen: PropTypes.bool, 
    onAccept: PropTypes.func.isRequired, 
    onCancel: PropTypes.func.isRequired,
}

ModalAddTask.defaultProps = {
    isOpen: false,
}


export default ModalAddTask;

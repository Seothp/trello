import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Modal from '../modal/modal'

import './modal-add-list.css';

const ModalAddList = ({ isOpen, onAccept, onCancel }) => {
    const [inputValue, setInputValue] = useState('')

    const handleInputChange = ({ target: { value } }) => setInputValue(value)
    const clearModal = () => setInputValue('')
    const handleClick = () => {
        onAccept(inputValue);
        onCancel();
        clearModal();
    }

    return (
        <Modal isOpen={isOpen} onCancel={onCancel}>
            <div className="modal-add-list">
                <input type="text" className="input-title" value={inputValue} onChange={handleInputChange} />
                <button className="modal-add-list-btn" onClick={handleClick}>add</button>
            </div>
        </Modal>
    )
}

ModalAddList.propTypes = {
    isOpen: PropTypes.bool,
    onAccept: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
}

ModalAddList.defaultProps = {
    isOpen: false,
}

export default ModalAddList
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Modal from '../modal/modal'

const ModalListInfo = ({ isOpen, listId, onClose, onEditTitle, currentList, fetchList }) => {
    const [title, setTitle] = useState("");
    useEffect(() => {
        if (listId) {
            fetchList({ listId })
        }
    }, [listId])
    useEffect(() => {
        if (currentList) {
            setTitle(currentList.title)
        }
    }, [currentList])
    const handleInputChange = ({ target: { value } }) => setTitle(value)
    const clearModal = () => setTitle('')
    const handleClick = () => {
        onEditTitle({ listId, title });
        onClose();
        clearModal();
    }
    return (
        <Modal isOpen={isOpen} onCancel={onClose}>
            <div className="modal-list-info">
                <div className="list-info">
                    <input className="list-title" onChange={handleInputChange} value={title || ''} />
                    <button className="list-title-edit" onClick={handleClick}>edit</button>
                </div>
            </div>
        </Modal>
    )
}

ModalListInfo.propTypes = {
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool,
}

ModalListInfo.defaultProps = {
    isOpen: false,
}

export default ModalListInfo;

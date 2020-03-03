import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Modal from '../modal/modal'

const ModalListInfo = ({ isOpen, listId, lists, onClose, onEditTitle }) => {
    const list = lists.find(list => list.listId === listId);
    const [ title, setTitle ] = useState(null);
    useEffect(() => {
        if(list) setTitle(list.title)
    }
    , [list])
    const handleInputChange = ({target: {value}}) => setTitle(value)
    const clearModal = () => setTitle('')
    const onClick = () => {
        onEditTitle({listId, title});
        onClose();
        clearModal();
    }
    return (
        <Modal isOpen={isOpen} onCancel={onClose}>
            <div className="modal-list-info">
                { list && 
                    <div className="list-info">
                        <input className="list-title" onChange={handleInputChange} value={title !== null? title: list.title }/>
                        <button className="list-title-edit" onClick={onClick}>edit</button>
                    </div>
                }
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

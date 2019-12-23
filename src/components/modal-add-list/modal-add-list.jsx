import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../modal/modal'

const ModalAddList = ({onAccept, onCancel, isOpen}) => {
    return (
        <Modal onAccept={onAccept} isOpen={isOpen} onCancel={onCancel}>
            <div className="modal-add-list">
                <input type="text" className="input-title"/>
                <button className="modal-add-list-btn" onClick={onAccept}>add</button>
            </div>
        </Modal>
        
    )
}

ModalAddList.propTypes = {
    onAccept: PropTypes.func,
    onCancel: PropTypes.func,
    isOpen: PropTypes.bool,
}

ModalAddList.defaultProps = {
    isOpen: false,
    onAccept: () => {},
    onCancel: () => {},
}

export default ModalAddList
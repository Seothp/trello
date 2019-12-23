import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../modal/modal'

const ModalAddList = ({addList, isOpen}) => {
    return (
        <Modal onAccept={addList} isOpen={isOpen}>
            <div className="modal-add-list">
                <input type="text" className="input-title"/>
            </div>
        </Modal>
        
    )
}

ModalAddList.propTypes = {
    addList: PropTypes.func,
    isOpen: PropTypes.bool,
}

export default ModalAddList
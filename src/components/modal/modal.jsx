import React from 'react';
import PropTypes from 'prop-types'

import Portal from '../portal/portal'

import './modal.css'

const Modal = ({children, accepting, onAccept, onCancel, isOpen, ...attrs}) => {
    const handleWrapperClick = (e) => {
        e.persist()
        if (e.target.className.indexOf('modal-wrapper') !== -1) onCancel()
    }
    return (
        <>
            { isOpen &&
                <Portal>
                    <div className="modal-wrapper" onClick={handleWrapperClick}>
                        <div className='modal' {...attrs}> 
                            <button className="modal-close-btn" onClick={onCancel}>X</button>
                            <div className="modal-inner">
                                {children}
                            </div>
                            {accepting &&
                                <>
                                    <button className="modal-accept" onClick={onAccept}></button>
                                    <button className="modal-define" onClick={onCancel}></button>
                                </>
                            }
                        </div>
                    </div>
                </Portal>
            }
        </>
    )
}

Modal.propTypes = {
    isOpen: PropTypes.bool, 
    children: PropTypes.node , 
    accepting: PropTypes.bool, 
    onAccept: PropTypes.func, 
    onCancel: PropTypes.func, 
}

Modal.defalutProps = {
    isOpen: false, 
    children: null, 
    accepting: false, 
    onAccept: () => {}, 
    onCancel: () => {}, 
}

export default Modal;

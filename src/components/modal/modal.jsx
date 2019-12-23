import React from 'react';
import PropTypes from 'prop-types'

import Portal from '../portal/portal'

const Modal = (children, accepting, onAccept, onCancel, isOpen, ...attrs) => {

    return (
        <>
            { isOpen &&
                <Portal>
                    <div className="modal-wrapper" onClick={onCancel}>
                        <div className='modal' {...attrs}> 
                            <button className="modal-close-btn" onClick={onCancel}></button>
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
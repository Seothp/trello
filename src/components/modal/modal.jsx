import React from 'react';
import classNames from 'classnames'

import Portal from '../portal/portal'

const Modal = (children, className, accepting, onAccept, onCancel, isOpen, ...attrs) => {

    const classes = classNames(
        'modal',
        ...className,
    )

    return (
        <>
            { isOpen &&
                <Portal>
                <div className="modal-wrapper" onClick={onCancel}>
                    <div className={classes} {...attrs}> 
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

export default Modal;
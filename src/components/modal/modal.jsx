import React from 'react';
import PropTypes from 'prop-types';

import Portal from '../portal/portal';

import './modal.css';

const Modal = ({
  children, accepting, onAccept, onCancel, isOpen,
}) => {
  const handleWrapperClick = (e) => {
    e.persist();
    const isWrapper = e.target.className.indexOf('modal-wrapper') !== -1;
    if (isWrapper) onCancel();
  };
  return (
    <>
      {isOpen
        && (
        <Portal>
          <div className="modal-wrapper" onClick={handleWrapperClick}>
            <div className="modal">
              <button className="modal-close-btn" type="button" onClick={onCancel}>X</button>
              <div className="modal-inner">
                {children}
              </div>
              {accepting
                && (
                <>
                  <button className="modal-accept" type="button" onClick={onAccept}>accept</button>
                  <button className="modal-define" type="button" onClick={onCancel}>cancel</button>
                </>
                )}
            </div>
          </div>
        </Portal>
        )}
    </>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onAccept: PropTypes.func,
  onCancel: PropTypes.func,
  accepting: PropTypes.bool,
};

Modal.defaultProps = {
  accepting: false,
  onAccept: () => {},
  onCancel: () => {},
};

export default Modal;

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from '../modal/modal';

const ModalLogIn = ({ isOpen, onClose, onSubmit }) => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPass, setInputPass] = useState('');

  const handleInputEmailChange = ({ target: { value } }) => setInputEmail(value);
  const handleInputPassChange = ({ target: { value } }) => setInputPass(value);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputEmail && inputPass) {
      onSubmit({ email: inputEmail, password: inputPass });
    }
    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onCancel={onClose}
    >
      <form className="to-do-log-in-form" onSubmit={handleFormSubmit}>
        <input
          type="email"
          className="to-do-log-in-form-email"
          placeholder="email"
          value={inputEmail}
          onChange={handleInputEmailChange}
        />
        <input
          type="password"
          className="to-do-log-in-from-pass"
          placeholder="password"
          value={inputPass}
          onChange={handleInputPassChange}
        />
        <input
          type="submit"
          className="to-do-log-in-from-submit"
          value="log in"
        />
      </form>
    </Modal>
  );
};

ModalLogIn.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ModalLogIn;

import React from 'react';

import Modal from '../modal/modal';
import { useState } from 'react';

const ModalSignUp = ({ isOpen, onClose, onSubmit }) => {
    const [ inputEmail, setInputEmail ] = useState('');
    const [ inputPass, setInputPass ] = useState('');
    const [ inputRePass, setInputRePass ] = useState('');

    const handleInputEmailChange = ({target: {value}}) => setInputEmail(value);
    const handleInputPassChange = ({target: {value}}) => setInputPass(value);
    const handleInputRePassChange = ({target: {value}}) => setInputRePass(value);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (inputPass === inputRePass && inputEmail && inputPass.length > 5) {
            onSubmit({email: inputEmail, password: inputPass})
        }
        else alert('Пароли не совпадают или данные не введены или пароль меньше 6 символов.')
        onClose()
    }
    return (
        <Modal
            isOpen={isOpen}
            onCancel={onClose}
        >
            <form className="to-do-sign-up-form" onSubmit={handleFormSubmit}>
                <input 
                    type="email" 
                    className="to-do-sign-up-form-email" 
                    placeholder='email'
                    value={inputEmail}
                    onChange={handleInputEmailChange}
                />
                <input 
                    type="password" 
                    className="to-do-sign-up-from-pass" 
                    placeholder='password'
                    value={inputPass}
                    onChange={handleInputPassChange}
                />
                <input 
                    type="password" 
                    className="to-do-sign-up-from-re-pass" 
                    placeholder='repeat password'
                    value={inputRePass}
                    onChange={handleInputRePassChange}
                />
                <input 
                    type="submit" 
                    className="to-do-sign-up-from-submit" 
                    value="sign up"
                />
            </form>
        </Modal>
    )
}

export default ModalSignUp

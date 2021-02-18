import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Button from '../button/button';
import ModalSignUp from './modal-sign-up';
import ModalLogIn from './modal-log-in';

import { registerUser, loginUser } from '../../utilities/api';
import { logoutUser } from '../../actions/actionCreator';

function Login() {
  const [isOpenSignUpModal, setIsOpenSignUpModal] = useState(false);
  const [isOpenLogInModal, setIsOpenLogInModal] = useState(false);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleSignUpSubmit = (payload) => dispatch(registerUser(payload));
  const handleLogInSubmit = (payload) => dispatch(loginUser(payload));
  const handleLogOut = () => {
    dispatch(logoutUser());
  };

  const isLogged = user.token !== '';
  return (
    <div>
      <div className="auth-btns">
        {!isLogged
          ? (
            <>
              <Button className="to-do-log-in" onClick={() => setIsOpenLogInModal(true)}>Log In</Button>
              <Button className="to-do-sign-up" onClick={() => setIsOpenSignUpModal(true)}>Sign Up</Button>
            </>
          )
          : <Button className="to-do-log-out" onClick={handleLogOut}>Log Out</Button>}
      </div>
      <ModalSignUp
        isOpen={isOpenSignUpModal}
        onClose={() => setIsOpenSignUpModal(false)}
        onSubmit={handleSignUpSubmit}
      />
      <ModalLogIn
        isOpen={isOpenLogInModal}
        onClose={() => setIsOpenLogInModal(false)}
        onSubmit={handleLogInSubmit}
      />
    </div>
  );
}

export default Login;

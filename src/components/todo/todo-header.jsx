import React from 'react';

import Login from './login';

import './todo-header.css';

const isSmallScreen = window.innerWidth < 375;
const small = isSmallScreen ? 'small' : '';
const Header = () => (
  <div className={`to-do-header ${small}`}>
    <Login />
  </div>

);

export default Header;

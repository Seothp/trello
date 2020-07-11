import React from 'react';
import PropTypes from 'prop-types';

import './todo-header.css';

const isSmallScreen = window.innerWidth < 375;
const small = isSmallScreen ? 'small' : '';
const Header = ({ children }) => (
  <div className={`to-do-header ${small}`}>
    {children}
  </div>

);

Header.propTypes = {
  children: PropTypes.node,
};

Header.defaultProps = {
  children: null,
};

export default Header;

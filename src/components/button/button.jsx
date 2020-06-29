import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './button.css';

const Button = ({
  children, onClick, className, invert,
}) => {
  const classes = classNames(
    'btn',
    { invert },
    className,
  );
  return (
    <button className={classes} type="button" onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
  invert: PropTypes.bool,
  className: PropTypes.string,
};

Button.defaultProps = {
  invert: false,
  className: '',
};

export default Button;

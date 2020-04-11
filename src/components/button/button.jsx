import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './button.css'

const Button = ({ children, onClick, className, invert, ...attrs }) => {
    const classes = classNames(
        'btn',
        { invert },
        className
    )
    return (
        <button className={classes} onClick={onClick} {...attrs}>
            {children}
        </button>
    )
}

Button.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.string,
        PropTypes.number,
    ]).isRequired
}

export default Button;

import React from 'react';
import classNames from 'classnames';

import './button.css'

const Button = ({children, onClick, className, invert, ...attrs}) => {
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

export default Button;

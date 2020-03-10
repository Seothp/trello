import React from 'react';
import PropTypes from 'prop-types';

import './todo-header.css'

const Header = ({children}) => {
    return (
        <div className="to-do-header">
            {children}
        </div>

    )
}

Header.propTypes = {
    children: PropTypes.node,
}

Header.defaultProps = {
    children: null,
}


export default Header;

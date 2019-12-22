import React from 'react';

import './todo-header.css'

const Header = ({children}) => {
    return (
        <div className="to-do-header">
            {children}
        </div>

    )
}

export default Header;
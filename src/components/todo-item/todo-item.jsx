import React from 'react';
import classNames from 'classnames'
import PropTypes from 'prop-types'

import './todo-item.css'

const ToDoItem = ({title, id, checked, checkTask, removeTask}) => {
    const classes = classNames(
        'to-do-item',
        { checked }
    )

    return (
        <div className={classes}>
            <button className="to-do-item-check" onClick={() => checkTask(id)}></button>
            {title}
            <button className="to-do-item-delete" onClick={() => removeTask(id)}>X</button>
        </div>
    )
}

ToDoItem.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    checked: PropTypes.bool,
    checkTask: PropTypes.func,
    removeTask: PropTypes.func,
}

ToDoItem.defaultProps = {
    title: 'Title',
    checked: false,
    checkTask: () => {},
    removeTask: () => {},
}

export default ToDoItem;

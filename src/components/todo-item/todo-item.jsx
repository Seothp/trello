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
            <button className="to-do-item-check" onClick={() => checkTask(id)}>Check</button>
            {title}
            <button className="to-do-item-delete" onClick={() => removeTask(id)}>Delete</button>
        </div>
    )
}

ToDoItem.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
}

ToDoItem.defaultProps = {
    title: 'Title'
}

export default ToDoItem;

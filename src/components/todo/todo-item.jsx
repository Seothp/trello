import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';

import ItemTypes from '../../ItemTypes';

import './todo-item.css';

const ToDoItem = ({ title, id, checked, checkTask, removeTask, onTaskClick }) => {
    const classes = classNames(
        'to-do-item',
        { checked }
    )
    const [{ isDragging }, drag] = useDrag({
        item: { itemId: id, type: ItemTypes.ITEM },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const style = isDragging ? {
        opacity: .7,
    } : {}
    return (
        <div className={classes} ref={drag} style={style} >
            <button className="to-do-item-check" onClick={() => checkTask({id})}></button>
            <span className="to-do-item-text" onClick={() => onTaskClick(id)}>{title}</span>
            <button className="to-do-item-delete" onClick={() => removeTask({id})}>&#215;</button>
        </div>
    )
}

ToDoItem.propTypes = {
    id: PropTypes.string.isRequired,
    checkTask: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired,
    title: PropTypes.string,
    checked: PropTypes.bool,
}

ToDoItem.defaultProps = {
    title: 'Title',
    checked: false,
}

export default ToDoItem;

import React from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';

import ToDoItem from '../todo-item/todo-item';
import ItemTypes from '../../ItemTypes';

import './todo-list.css';

const ToDoList = ({listId, title, tasks, onAddTask, removeTask, removeList, checkTask, changeItemListId, ...attrs}) => {
    const [{ canDrop, isOver, item }, drop] = useDrop({
        accept: ItemTypes.ITEM,
        drop: (item) => changeItemListId(item, listId),
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
          }),
    })

    return (
        <div className="to-do-list" key={listId} {...attrs} ref={drop}>
            <h3 className="to-do-list-title">{title}</h3>
            <div className="to-do-list-buttons">
                <button className="to-do-add-task" onClick={() => onAddTask(listId)}>add task</button>
                <button className="to-do-remove-list" onClick={() => removeList(listId)}>remove list</button>
            </div>
            {tasks.filter((task) => task.listId === listId).map(({id, title, checked}) => (
                <ToDoItem 
                id={id} 
                title={title} 
                key={id} 
                checked={checked} 
                removeTask={removeTask} 
                checkTask={checkTask}
                />
            ))}
            { canDrop &&
                <div className="to-do-can-drop-item">
                </div>
            }
        </div>
    )
}

ToDoList.propTypes = {
    listId: PropTypes.number.isRequired, 
    tasks: PropTypes.array.isRequired, 
    title: PropTypes.string, 
    onAddTask: PropTypes.func, 
    removeTask: PropTypes.func, 
    removeList: PropTypes.func, 
    checkTask: PropTypes.func,
}

ToDoList.defaultProps = {
    title: 'Title is not defined', 
    onAddTask: () => {}, 
    removeTask: () => {}, 
    removeList: () => {}, 
    checkTask: () => {},
}

export default ToDoList;

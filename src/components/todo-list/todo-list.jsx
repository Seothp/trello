import React from 'react';
import PropTypes from 'prop-types'

import ToDoItem from '../todo-item/todo-item'

const ToDoList = ({listId, title, tasks, onAddTask, removeTask, removeList, checkTask, ...attrs}) => {
    return (
        <div className="to-do-list" key={listId} {...attrs}>
            <h3 className="to-do-list-title">{title}</h3>
            <button className="to-do-add-task" onClick={() => onAddTask(listId)}>add task</button>
            <button className="to-do-remove-list" onClick={() => removeList(listId)}>remove list</button>
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
        </div>
    )
}

ToDoList.propTypes = {
    listId: PropTypes.number.isRequired, 
    tasks: PropTypes.array.isRequired, 
    title: PropTypes.func, 
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

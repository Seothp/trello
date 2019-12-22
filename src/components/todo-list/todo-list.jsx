import React from 'react';

import ToDoItem from '../todo-item/todo-item'

const ToDoList = ({listId, title, tasks, addTask, removeTask, removeList, checkTask, ...attrs}) => {
    return (
        <div className="to-do-list" key={listId} {...attrs}>
            <h3 className="to-do-list-title">{title}</h3>
            <button className="to-do-add-task" onClick={() => {addTask({id: new Date().getTime(), listId: listId, title: 'test task'})}}>add task</button>
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

export default ToDoList;

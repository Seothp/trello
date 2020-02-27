import React from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';

import ToDoItem from '../todo-item/todo-item';
import Button from '../button/button';

import ItemTypes from '../../ItemTypes';
import './todo-list.css';

const ToDoList = ({listId, title, tasks, onAddTask, removeTask, removeList, checkTask, onItemDrop, ...attrs}) => {
    const [{ canDrop, isOver}, drop] = useDrop({
        accept: ItemTypes.ITEM,
        drop: (item) => onItemDrop(item, listId),
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })

    const plusBackground = canDrop && isOver ? '#32EB40' : 'gray';

    return (
        <div className="to-do-list" key={listId} {...attrs} ref={drop}>
            <h3 className="to-do-list-title">{title}</h3>
            <div className="to-do-list-buttons">
                <Button className="to-do-add-task" onClick={() => onAddTask(listId)}>add task</Button>
                <Button className="to-do-remove-list" invert onClick={() => removeList(listId)}>remove list</Button>
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
                <div className="to-do-can-drop-item" style={{background:plusBackground}}/>
            }
        </div>
    )
}

ToDoList.propTypes = {
    listId: PropTypes.number.isRequired, 
    tasks: PropTypes.array.isRequired, 
    onAddTask: PropTypes.func.isRequired, 
    removeTask: PropTypes.func.isRequired, 
    removeList: PropTypes.func.isRequired, 
    checkTask: PropTypes.func.isRequired,
    title: PropTypes.string, 
}

ToDoList.defaultProps = {
    title: 'Title is not defined',
}

export default ToDoList;

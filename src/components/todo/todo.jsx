import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addList, removeList, addTask, removeTask, checkTask, moveTask, deleteTasks } from '../../actions/actionCreator'

import ToDoList from '../todo-list/todo-list';
import ToDoHeader from '../todo-header/todo-header';
import ModalAddList from '../modal-add-list/modal-add-list';
import ModalAddTask from '../modal-add-task/modal-add-task';
import Button from '../button/button';


import './todo.css';

const ToDo = ({lists, tasks, addList, removeList, addTask, removeTask, checkTask, moveTask, deleteTasks}) => {
    const [ isOpenModalAddList, setIsOpenModalAddList ] = useState(false);
    const [ isOpenModalAddTask, setIsOpenModalAddTask ] = useState(false);
    const [ currentList, setCurrentList ] = useState(0);

    const changeItemListId = ({itemId}, listId) => moveTask({itemId, listId})

    const changeCurListId = (id) => setCurrentList(id)

    const switchModalAddListView = () => setIsOpenModalAddList(!isOpenModalAddList)
    const switchModalAddTaskView = () =>  setIsOpenModalAddTask(!isOpenModalAddTask)

    const onAddTask = (listId) => {
        switchModalAddTaskView();
        changeCurListId(listId);
    }
    const onRemoveList = (listId) => {
        deleteTasks({listId});
        removeList({listId});
    }
    const onListModalAccept = value => {
        const listId = Date.now()
        addList(listId, value);
    }

    const onModalTaskAccept = ({title}) => {
        addTask({
                id: new Date().getTime(),
                listId: currentList,
                title,
            });
    }

    const onItemDrop = (item, listId) => changeItemListId(item, listId)

    return (
        <div className="to-do-app">
            <ToDoHeader>
                <Button className="to-do-add-list" onClick={() => switchModalAddListView()}>add list</Button>
            </ToDoHeader>
            <div className="to-do-app-lists">
                {lists.map(({listId, title}) => (
                    <ToDoList 
                        key={listId} 
                        listId={listId} 
                        title={title} 
                        tasks={tasks}
                        removeList={onRemoveList}
                        onAddTask={onAddTask}
                        checkTask={checkTask}
                        removeTask={removeTask}
                        onItemDrop={onItemDrop}
                    />
                ))}
            </div>
            <ModalAddList
                isOpen={isOpenModalAddList}
                onAccept={onListModalAccept}  
                onCancel={switchModalAddListView}
            />
            <ModalAddTask 
                isOpen={isOpenModalAddTask}
                onAccept={onModalTaskAccept}
                onCancel={switchModalAddTaskView}
            />
        </div>
    )
}


export default connect( ({ lists, tasks }) => ({
    lists,
    tasks
}), { addList, removeList, addTask, removeTask, checkTask, moveTask, deleteTasks })(ToDo);
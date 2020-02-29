import React, { useState } from 'react';
import { connect } from 'react-redux';
import { clear } from 'redux-localstorage-simple';

import { addList, removeList, addTask, removeTask, checkTask, moveTask, deleteTasks, addBoard, removeBoard } from '../../actions/actionCreator'

import ToDoList from '../todo-list/todo-list';
import ToDoHeader from '../todo-header/todo-header';
import ModalAddList from '../modal-add-list/modal-add-list';
import ModalAddTask from '../modal-add-task/modal-add-task';
import ModalAddBoard from '../modal-add-board/modal-add-board';
import Button from '../button/button';
import { BoardsList } from '../boards-list/boards-list'

import './todo.css';

// const boards = [
//     {
//         title: '1stboard',
//         boardId: 123123,
//     } , {
//         title: '2ndboard',
//         boardId: 125123,
//     }
// ]

const ToDo = ({lists, tasks, boards, addList, removeList, addTask, removeTask, checkTask, moveTask, deleteTasks, addBoard}) => {
    const [ isOpenModalAddList, setIsOpenModalAddList ] = useState(false);
    const [ isOpenModalAddTask, setIsOpenModalAddTask ] = useState(false);
    const [ isOpenModalAddBoard, setIsOpenModalAddBoard] = useState(false);
    const [ currentList, setCurrentList ] = useState(0);
    const [ currentBoard, setCurrentBoard] = useState(null);

    const changeItemListId = ({itemId}, listId) => moveTask({itemId, listId})

    const changeCurrentListId = id => setCurrentList(id)
    const changeCurrentBoard = id => setCurrentBoard(id)
    const switchModalAddListView = () => setIsOpenModalAddList(!isOpenModalAddList)
    const switchModalAddTaskView = () =>  setIsOpenModalAddTask(!isOpenModalAddTask)
    const switchModalAddBoardView = () => setIsOpenModalAddBoard(!isOpenModalAddBoard)
    const onAddTask = listId => {
        switchModalAddTaskView();
        changeCurrentListId(listId);
    }
    const onAddBoard = () => {
        switchModalAddBoardView();
    }
    const onRemoveList = listId => {
        deleteTasks({listId});
        removeList({listId});
    }
    const onListModalAccept = title => {
        addList({
            listId: Date.now(), 
            title,
            boardId: currentBoard,
        });
    }
    const onTaskModalAccept = title => {
        addTask({
            id: Date.now(),
            listId: currentList,
            title,
        });
    }
    const onBoardModalAccept = title => {
        addBoard({
            boardId: Date.now(),
            title
        })
    }
    const onItemDrop = (item, listId) => changeItemListId(item, listId)
    console.log(lists, tasks, boards)
    return (
        <div className="to-do-app">
            <BoardsList boards={boards} onAddBoard={onAddBoard} changeCurrentBoard={changeCurrentBoard}/>
            <div className="content">
                <ToDoHeader>
                    <Button className="to-do-add-list" onClick={switchModalAddListView}>add list</Button>
                </ToDoHeader>
                <div className="to-do-app-lists">
                    {lists.filter(list => currentBoard === null? true: list.boardId === currentBoard).map(({listId, title}) => (
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
                    onAccept={onTaskModalAccept}
                    onCancel={switchModalAddTaskView}
                />
                <ModalAddBoard
                    isOpen={isOpenModalAddBoard}
                    onAccept={onBoardModalAccept}
                    onCancel={switchModalAddBoardView}
                />
            </div>
        </div>
    )
}

export default connect( ({ lists, tasks, boards }) => ({
    lists,
    tasks,
    boards,
}), { 
    addList,
    removeList,
    addTask,
    removeTask,
    checkTask,
    moveTask,
    deleteTasks,
    addBoard,
    removeBoard,
})(ToDo);
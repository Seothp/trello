import React, { useState } from 'react';
import { connect } from 'react-redux';

import { 
    addTask, 
    removeTask, 
    checkTask, 
    moveTask, 
    deleteTasks, 
    editTaskTitle,
    addList, 
    removeList, 
    editListTitle,
    addBoard, 
    removeBoard,
} from '../../actions/actionCreator'
import { registerUser } from '../../utilities/api'

//components imports
import Button from '../button/button';

//local imports
import ToDoHeader from './todo-header';
import ToDoList from './todo-list';
import ModalAddList from './modal-add-list';
import ModalAddTask from './modal-add-task';
import ModalAddBoard from './modal-add-board';
import ModalTaskInfo from './modal-task-info';
import ModalListInfo from './modal-list-info';
import ModalSignUp from './modal-sign-up';
import ModalLogIn from './modal-log-in';
import BoardsList from './boards-list';

import './todo.css';

const FIREBASE_API_KEY = 'AIzaSyDL75b9bD07bmPWk7eN7VsoDZitkHdPTus'

const ToDo = (props) => {
    //data destructuring
    const { lists, tasks, boards } = props;
    //methods destructuring
    const { 
        addTask, removeTask, checkTask, moveTask, deleteTasks, editTaskTitle, //tasks methods
        addList, removeList, editListTitle, //lists methods
        addBoard, removeBoard, //board methods
        registerUser
    } = props;

    const [ isOpenModalAddList, setIsOpenModalAddList ] = useState(false);
    const [ isOpenModalAddTask, setIsOpenModalAddTask ] = useState(false);
    const [ isOpenModalAddBoard, setIsOpenModalAddBoard ] = useState(false);
    const [ isOpenModalTaskInfo, setIsOpenModalTaskInfo ] = useState(false);
    const [ isOpenModalListInfo, setIsOpenModalListInfo ] = useState(false);
    const [ isOpenModalSignUp, setIsOpenModalSignUp] = useState(false);
    const [ isOpenModalLogIn, setIsOpenModalLogIn] = useState(false);
    const [ currentTask, setCurrentTask ] = useState(0);
    const [ currentList, setCurrentList ] = useState(0);
    const [ currentBoard, setCurrentBoard ] = useState(null);
    
    const changeCurrentListId = id => setCurrentList(id)
    const changeCurrentBoard = id => setCurrentBoard(id)
    const switchModalAddListView = () => setIsOpenModalAddList(!isOpenModalAddList)
    const switchModalAddTaskView = () =>  setIsOpenModalAddTask(!isOpenModalAddTask)
    const switchModalAddBoardView = () => setIsOpenModalAddBoard(!isOpenModalAddBoard)
    const switchModalTaskInfoView = () => setIsOpenModalTaskInfo(!isOpenModalTaskInfo)
    const switchModalListInfoView = () => setIsOpenModalListInfo(!isOpenModalListInfo)
    const switchModalSignUpView = () => setIsOpenModalSignUp(!isOpenModalSignUp)
    const switchModalLogInView = () => setIsOpenModalLogIn(!isOpenModalLogIn)
    const changeItemListId = ({itemId}, listId) => moveTask({itemId, listId})
    const onItemDrop = (item, listId) => changeItemListId(item, listId)
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
    const onTaskClick = id => {
        setCurrentTask(id);
        switchModalTaskInfoView();
    }
    const onOpenListInfo = id => {
        setCurrentList(id);
        switchModalListInfoView();
    }
    const onSignUpSubmit = ({email, password}) => {
        // console.log('submited')
        // fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`, {
        //     method: 'POST',
        //     'Content-Type': 'application/json',
        //     body: JSON.stringify({
        //         email, password
        //     })
        // }).then(res => res.json()).then(res => console.log(res));
        registerUser({email, password})
    }
    const onLogInSubmit = ({email, password}) => {
        console.log('logged')
        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`, {
            method: 'POST',
            'Content-Type': 'application/json',
            body: JSON.stringify({
                email, password
            })
        }).then(res => res.json()).then(res => console.log(res));
    }
    const onCloseModalTaskInfo = () => switchModalTaskInfoView();
    const onCloseModalListInfo = () => switchModalListInfoView();
    const onCloseModalSignUp = () => switchModalSignUpView();
    const onCloseModalLogIn = () => switchModalLogInView();
    console.log(tasks, lists, boards,)
    return (
        <div className="to-do-app">
            <BoardsList 
                boards={boards} 
                onAddBoard={onAddBoard} 
                onDeleteBoard={removeBoard} 
                changeCurrentBoard={changeCurrentBoard}
            />
            <div className="content">
                <ToDoHeader>
                    <Button className="to-do-add-list" onClick={switchModalAddListView}>add list</Button>
                    <Button className="to-do-log-in" onClick={switchModalLogInView}>Log In</Button>
                    <Button className="to-do-sign-up" onClick={switchModalSignUpView}>Sign Up</Button>
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
                            onTaskClick={onTaskClick}
                            onOpenListInfo={onOpenListInfo}
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
                <ModalTaskInfo 
                    isOpen={isOpenModalTaskInfo}
                    taskId={currentTask}
                    tasks={tasks}
                    onClose={onCloseModalTaskInfo}
                    onEditTitle={editTaskTitle}
                />
                <ModalListInfo 
                    isOpen={isOpenModalListInfo}
                    listId={currentList}
                    lists={lists}
                    onClose={onCloseModalListInfo}
                    onEditTitle={editListTitle}
                />
                <ModalSignUp
                    isOpen={isOpenModalSignUp}
                    onClose={onCloseModalSignUp}
                    onSubmit={onSignUpSubmit}
                />
                <ModalLogIn 
                    isOpen={isOpenModalLogIn}
                    onClose={onCloseModalLogIn}
                    onSubmit={onLogInSubmit}
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
    addTask,
    removeTask,
    checkTask,
    moveTask,
    deleteTasks,
    editTaskTitle,
    addList,
    removeList,
    editListTitle,
    addBoard,
    removeBoard,
    registerUser,
})(ToDo);
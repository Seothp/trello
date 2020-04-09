import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useEffect } from 'react';

import { 
    addTaskLocal,
    removeTaskLocal,
    moveTaskLocal,
    deleteTasksLocal,
    checkTaskLocal,
    editTaskTitleLocal,
    addListLocal,
    removeListLocal,
    editListTitleLocal,
    addBoardLocal,
    removeBoardLocal,
} from '../../actions/actionCreator'
import { 
    registerUser, 
    loginUserWithEmail, 
    addTask, removeTask, checkTask, fetchTasks,
    addList, removeList, fetchLists,
    addBoard, removeBoard, fetchBoards,
    moveTask,
    fetchTask,
    fetchList,
    editTaskTitle,
    editListTitle
} from '../../utilities/api'

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

const ToDo = (props) => {
    //data destructuring
    const { lists, tasks, boards } = props;
    //methods destructuring
    const { 
        addTask, removeTask, checkTask, moveTask, deleteTasksLocal, editTaskTitle, //tasks methods
        addList, removeList, editListTitle, //lists methods
        addBoard, removeBoard, //board methods
        registerUser,
        loginUserWithEmail,
        fetchTasks, fetchLists, fetchBoards,    
        fetchTask,
        fetchList,
        currentTask,
        currentList,
        addTaskLocal,
        removeTaskLocal,
        checkTaskLocal,
        moveTaskLocal,
        editTaskTitleLocal,
        addListLocal,
        removeListLocal,
        editListTitleLocal,
        addBoardLocal,
        removeBoardLocal,
    } = props;

    const [ isOpenModalAddList, setIsOpenModalAddList ] = useState(false);
    const [ isOpenModalAddTask, setIsOpenModalAddTask ] = useState(false);
    const [ isOpenModalAddBoard, setIsOpenModalAddBoard ] = useState(false);
    const [ isOpenModalTaskInfo, setIsOpenModalTaskInfo ] = useState(false);
    const [ isOpenModalListInfo, setIsOpenModalListInfo ] = useState(false);
    const [ isOpenModalSignUp, setIsOpenModalSignUp] = useState(false);
    const [ isOpenModalLogIn, setIsOpenModalLogIn] = useState(false);
    const [ currentTaskId, setCurrentTaskId ] = useState(0);
    const [ currentListId, setCurrentListId ] = useState(0);
    const [ currentBoard, setCurrentBoard ] = useState(0);
    useEffect(() => {
        fetchTasks();
        fetchLists();
        fetchBoards();
    }, [])
    const changeCurrentListId = id => setCurrentListId(id)
    const changeCurrentBoard = id => setCurrentBoard(id)
    const switchModalAddListView = () => setIsOpenModalAddList(!isOpenModalAddList)
    const switchModalAddTaskView = () =>  setIsOpenModalAddTask(!isOpenModalAddTask)
    const switchModalAddBoardView = () => setIsOpenModalAddBoard(!isOpenModalAddBoard)
    const switchModalTaskInfoView = () => setIsOpenModalTaskInfo(!isOpenModalTaskInfo)
    const switchModalListInfoView = () => setIsOpenModalListInfo(!isOpenModalListInfo)
    const switchModalSignUpView = () => setIsOpenModalSignUp(!isOpenModalSignUp)
    const switchModalLogInView = () => setIsOpenModalLogIn(!isOpenModalLogIn)
    const changeItemListId = ({ itemId }, listId) => {
        moveTask({itemId, listId})
        moveTaskLocal({itemId, listId})
    }
    const onItemDrop = (item, listId) => changeItemListId(item, listId)
    const onAddTask = listId => {
        switchModalAddTaskView();
        changeCurrentListId(listId);
    }
    const onAddBoard = () => {
        switchModalAddBoardView();
    }
    const onRemoveList = listId => {
        // deleteTasks({listId});
        removeList({listId});
        removeListLocal({listId})
    }
    const onListModalAccept = title => {
        const listId = String(Date.now())
        const payload = {
            title,
            boardId: currentBoard
        }
        
        addList({...payload, temporaryId: listId});
        addListLocal({...payload, listId})
    }
    const onTaskModalAccept = title => {
        const id = String(Date.now())
        const payload = {
            listId: currentListId,
            checked: false,
            title,
        }
        addTask({...payload, temporaryId: id});
        addTaskLocal({...payload, id});
    }
    const onRemoveTask = ({id}) => {
        removeTask({id})
        removeTaskLocal({id})
    }
    const onBoardModalAccept = title => {
        const id = String(Date.now())
        const boardBody = {
            title
        }
        addBoardLocal({...boardBody, boardId: id})
        addBoard({...boardBody, temporaryId: id})
    }
    const onTaskClick = id => {
        setCurrentTaskId(id);
        switchModalTaskInfoView();
    }
    const onOpenListInfo = id => {
        setCurrentListId(id);
        switchModalListInfoView();
    }
    const onCheckTask = ({id}) => {
        checkTask({id})
        checkTaskLocal({id})
    }
    const onEditTaskTitle = payload => {
        editTaskTitle(payload)
        editTaskTitleLocal(payload)
    }
    const onEditListTitle = payload => {
        editListTitle(payload)
        editListTitleLocal(payload)
    }
    const onRemoveBoard = payload => {
        removeBoard(payload)
        removeBoardLocal(payload)
    }
    const onSignUpSubmit = ({ email, password }) => registerUser({email, password})
    const onLogInSubmit = ({ email, password }) => loginUserWithEmail({email, password})
    const onCloseModalTaskInfo = () => switchModalTaskInfoView();
    const onCloseModalListInfo = () => switchModalListInfoView();
    const onCloseModalSignUp = () => switchModalSignUpView();
    const onCloseModalLogIn = () => switchModalLogInView();
    console.log('TASKS:', tasks, 'LISTS:', lists, 'BOARDS:',boards)
    return (
        <div className="to-do-app">
            <BoardsList 
                boards={boards} 
                onAddBoard={onAddBoard} 
                onDeleteBoard={onRemoveBoard} 
                changeCurrentBoard={changeCurrentBoard}
            />
            <div className="content">
                <ToDoHeader>
                    <Button className="to-do-add-list" onClick={switchModalAddListView}>add list</Button>
                    <Button className="to-do-log-in" onClick={switchModalLogInView}>Log In</Button>
                    <Button className="to-do-sign-up" onClick={switchModalSignUpView}>Sign Up</Button>
                </ToDoHeader>
                <div className="to-do-app-lists">
                    {lists.filter(([_, list]) => currentBoard === 0 || list.boardId === currentBoard).map(([listId, { title }]) => (
                        <ToDoList 
                            key={listId}
                            listId={listId} 
                            title={title} 
                            tasks={tasks}
                            removeList={onRemoveList}
                            onAddTask={onAddTask}
                            checkTask={onCheckTask}
                            removeTask={onRemoveTask}
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
                    taskId={currentTaskId}
                    tasks={tasks}
                    onClose={onCloseModalTaskInfo}
                    onEditTitle={onEditTaskTitle}
                    fetchTask={fetchTask}
                    currentTask={currentTask}
                />
                <ModalListInfo 
                    isOpen={isOpenModalListInfo}
                    listId={currentListId}
                    lists={lists}
                    onClose={onCloseModalListInfo}
                    onEditTitle={onEditListTitle}
                    fetchList={fetchList}
                    currentList={currentList}
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

export default connect( ({ lists, tasks, boards, currentTask, currentList }) => ({
    lists,
    tasks,
    boards,
    currentTask,
    currentList
}), {
    addTask,
    removeTask,
    checkTask,
    moveTask,
    deleteTasksLocal,
    editTaskTitle,
    addList,
    removeList,
    editListTitle,
    addBoard,
    removeBoard,
    registerUser,
    loginUserWithEmail,
    fetchTasks,
    fetchLists,
    fetchBoards,
    fetchTask,
    fetchList,
    // deleteTasksLocal,
    addTaskLocal,
    removeTaskLocal,
    checkTaskLocal,
    moveTaskLocal,
    editTaskTitleLocal,
    addListLocal,
    removeListLocal,
    editListTitleLocal,
    addBoardLocal,
    removeBoardLocal,
})(ToDo);
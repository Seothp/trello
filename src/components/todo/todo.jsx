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
    loginUser,
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
    // data destructuring
    const { lists, tasks, boards } = props;
    // tasks functions distructuring
    const {
        addTask,
        removeTask,
        checkTask,
        moveTask,
        editTaskTitle,
        fetchTasks,
        addTaskLocal,
        removeTaskLocal,
        checkTaskLocal,
        moveTaskLocal,
        editTaskTitleLocal,
        currentTask,
    } = props
    // lists functions distructuring
    const {
        addList,
        removeList,
        editListTitle,
        fetchLists,
        fetchList,
        currentList,
        addListLocal,
        removeListLocal,
        editListTitleLocal,
    } = props
    // boards functions distructuring
    const {
        addBoardLocal,
        removeBoardLocal,
        addBoard,
        removeBoard,
        fetchBoards,
        fetchTask,
    } = props
    // other distructuring
    const { registerUser, loginUser } = props

    const [openedModalAddList, setOpenedModalAddList] = useState(false);
    const [openedModalAddTask, setOpenedModalAddTask] = useState(false);
    const [openedModalAddBoard, setOpenedModalAddBoard] = useState(false);
    const [openedModalTaskInfo, setOpenedModalTaskInfo] = useState(false);
    const [openedModalListInfo, setOpenedModalListInfo] = useState(false);
    const [openedModalSignUp, setOpenedModalSignUp] = useState(false);
    const [openedModalLogIn, setOpenedModalLogIn] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(0);
    const [currentListId, setCurrentListId] = useState(0);
    const [currentBoard, setCurrentBoard] = useState(0);

    useEffect(() => {
        fetchTasks();
        fetchLists();
        fetchBoards();
    }, [])

    const toggleModalAddListView = () => setOpenedModalAddList(!openedModalAddList)
    const toggleModalAddTaskView = () => setOpenedModalAddTask(!openedModalAddTask)
    const toggleModalAddBoardView = () => setOpenedModalAddBoard(!openedModalAddBoard)
    const toggleModalTaskInfoView = () => setOpenedModalTaskInfo(!openedModalTaskInfo)
    const toggleModalListInfoView = () => setOpenedModalListInfo(!openedModalListInfo)
    const toggleModalSignUpView = () => setOpenedModalSignUp(!openedModalSignUp)
    const toggleModalLogInView = () => setOpenedModalLogIn(!openedModalLogIn)

    const setItemListId = ({ itemId }, listId) => {
        const payload = {
            itemId,
            listId
        }
        moveTask(payload)
        moveTaskLocal(payload)
    }
    const handleItemDrop = (item, listId) => setItemListId(item, listId)
    const handleAddTask = listId => {
        toggleModalAddTaskView();
        setCurrentListId(listId);
    }
    const handleAddBoard = () => {
        toggleModalAddBoardView();
    }
    const handleRemoveList = listId => {
        removeList({ listId });
        removeListLocal({ listId })
    }
    const handleListModalAccept = title => {
        // Генерирует временный id который изменится после добавления списка в бд
        const listId = String(Date.now())
        const payload = {
            title,
            boardId: currentBoard
        }

        addList({ ...payload, temporaryId: listId });
        addListLocal({ ...payload, listId })
    }
    const handleTaskModalAccept = title => {
        // Генерирует временный id который изменится после добавления таски в бд
        const id = String(Date.now())
        const payload = {
            listId: currentListId,
            checked: false,
            title,
        }
        addTask({ ...payload, temporaryId: id });
        addTaskLocal({ ...payload, id });
    }
    const handleRemoveTask = payload => {
        removeTask(payload)
        removeTaskLocal(payload)
    }
    const handleBoardModalAccept = title => {
        // Генерирует временный id который изменится после добавления доски в бд
        const id = String(Date.now())
        const boardBody = {
            title
        }
        addBoardLocal({ ...boardBody, boardId: id })
        addBoard({ ...boardBody, temporaryId: id })
    }
    const handleTaskClick = id => {
        setCurrentTaskId(id);
        toggleModalTaskInfoView();
    }
    const handleOpenListInfo = id => {
        setCurrentListId(id);
        toggleModalListInfoView();
    }
    const handleCheckTask = payload => {
        checkTask(payload)
        checkTaskLocal(payload)
    }
    const handleEditTaskTitle = payload => {
        editTaskTitle(payload)
        editTaskTitleLocal(payload)
    }
    const handleEditListTitle = payload => {
        editListTitle(payload)
        editListTitleLocal(payload)
    }
    const handleRemoveBoard = payload => {
        removeBoard(payload)
        removeBoardLocal(payload)
    }
    const handleSignUpSubmit = payload => registerUser(payload)
    const handleLogInSubmit = payload => loginUser(payload)
    const handleCloseModalTaskInfo = () => toggleModalTaskInfoView();
    const handleCloseModalListInfo = () => toggleModalListInfoView();
    const handleCloseModalSignUp = () => toggleModalSignUpView();
    const handleCloseModalLogIn = () => toggleModalLogInView();
    return (
        <div className="to-do-app">
            <BoardsList
                boards={boards}
                onAddBoard={handleAddBoard}
                onDeleteBoard={handleRemoveBoard}
                setCurrentBoard={setCurrentBoard}
            />
            <div className="content">
                <ToDoHeader>
                    <Button className="to-do-add-list" onClick={toggleModalAddListView}>add list</Button>
                    <Button className="to-do-log-in" onClick={toggleModalLogInView}>Log In</Button>
                    <Button className="to-do-sign-up" onClick={toggleModalSignUpView}>Sign Up</Button>
                </ToDoHeader>
                <div className="to-do-app-lists">
                    {lists.filter(([_, list]) => currentBoard === 0 || list.boardId === currentBoard).map(([listId, { title }]) => (
                        <ToDoList
                            key={listId}
                            listId={listId}
                            title={title}
                            tasks={tasks}
                            removeList={handleRemoveList}
                            onAddTask={handleAddTask}
                            checkTask={handleCheckTask}
                            removeTask={handleRemoveTask}
                            onItemDrop={handleItemDrop}
                            onTaskClick={handleTaskClick}
                            onOpenListInfo={handleOpenListInfo}
                        />
                    ))}
                </div>
                <ModalAddList
                    isOpen={openedModalAddList}
                    onAccept={handleListModalAccept}
                    onCancel={toggleModalAddListView}
                />
                <ModalAddTask
                    isOpen={openedModalAddTask}
                    onAccept={handleTaskModalAccept}
                    onCancel={toggleModalAddTaskView}
                />
                <ModalAddBoard
                    isOpen={openedModalAddBoard}
                    onAccept={handleBoardModalAccept}
                    onCancel={toggleModalAddBoardView}
                />
                <ModalTaskInfo
                    isOpen={openedModalTaskInfo}
                    taskId={currentTaskId}
                    tasks={tasks}
                    onClose={handleCloseModalTaskInfo}
                    onEditTitle={handleEditTaskTitle}
                    fetchTask={fetchTask}
                    currentTask={currentTask}
                />
                <ModalListInfo
                    isOpen={openedModalListInfo}
                    listId={currentListId}
                    lists={lists}
                    onClose={handleCloseModalListInfo}
                    onEditTitle={handleEditListTitle}
                    fetchList={fetchList}
                    currentList={currentList}
                />
                <ModalSignUp
                    isOpen={openedModalSignUp}
                    onClose={handleCloseModalSignUp}
                    onSubmit={handleSignUpSubmit}
                />
                <ModalLogIn
                    isOpen={openedModalLogIn}
                    onClose={handleCloseModalLogIn}
                    onSubmit={handleLogInSubmit}
                />
            </div>
        </div>
    )
}

const mapStateToProps = ({ lists, tasks, boards, currentTask, currentList }) => ({
    lists,
    tasks,
    boards,
    currentTask,
    currentList
})
const mapTasksDispatchToProps = {
    addTask,
    removeTask,
    checkTask,
    moveTask,
    deleteTasksLocal,
    editTaskTitle,
    addTaskLocal,
    removeTaskLocal,
    checkTaskLocal,
    moveTaskLocal,
    editTaskTitleLocal,
    fetchTasks,
    fetchTask,
}
const mapListsDispatchToProps = {
    addList,
    removeList,
    editListTitle,
    addListLocal,
    removeListLocal,
    editListTitleLocal,
    fetchList,
    fetchLists,
}
const mapBoardsDispatchToProps = {
    addBoard,
    removeBoard,
    fetchBoards,
    addBoardLocal,
    removeBoardLocal,
}
const mapOtherDispatchToProps = {
    registerUser,
    loginUser,
}
const mapDispatchToProps = {
    ...mapTasksDispatchToProps,
    ...mapListsDispatchToProps,
    ...mapBoardsDispatchToProps,
    ...mapOtherDispatchToProps,
}
export default connect(mapStateToProps, mapDispatchToProps)(ToDo);

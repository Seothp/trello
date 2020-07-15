import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
  logoutUser,
} from '../../actions/actionCreator';
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
  editListTitle,
} from '../../utilities/api';

// components imports
import Button from '../button/button';

// local imports
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

const isSmallScreen = window.innerWidth < 375;
const small = isSmallScreen ? 'small' : '';

const ToDo = (props) => {
  // data destructuring
  const {
    lists, tasks, boards, user,
  } = props;
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
  } = props;
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
  } = props;
  // boards functions distructuring
  const {
    addBoardLocal,
    removeBoardLocal,
    addBoard,
    removeBoard,
    fetchBoards,
    fetchTask,
  } = props;
  // user functions distructuring
  const { registerUser, loginUser, logoutUser } = props;

  const [isOpenModalAddList, setIsOpenModalAddList] = useState(false);
  const [isOpenModalAddTask, setIsOpenModalAddTask] = useState(false);
  const [isOpenModalAddBoard, setIsOpenModalAddBoard] = useState(false);
  const [isOpenModalTaskInfo, setIsOpenModalTaskInfo] = useState(false);
  const [isOpenModalListInfo, setIsOpenModalListInfo] = useState(false);
  const [isOpenModalSignUp, setIsOpenModalSignUp] = useState(false);
  const [isOpenModalLogIn, setIsOpenModalLogIn] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(0);
  const [currentListId, setCurrentListId] = useState(0);
  const [currentBoard, setCurrentBoard] = useState(0);

  useEffect(() => {
    fetchTasks();
    fetchLists();
    fetchBoards();
  }, []);

  const toggleModalAddListView = () => setIsOpenModalAddList(!isOpenModalAddList);
  const toggleModalAddTaskView = () => setIsOpenModalAddTask(!isOpenModalAddTask);
  const toggleModalAddBoardView = () => setIsOpenModalAddBoard(!isOpenModalAddBoard);
  const toggleModalTaskInfoView = () => setIsOpenModalTaskInfo(!isOpenModalTaskInfo);
  const toggleModalListInfoView = () => setIsOpenModalListInfo(!isOpenModalListInfo);
  const toggleModalSignUpView = () => setIsOpenModalSignUp(!isOpenModalSignUp);
  const toggleModalLogInView = () => setIsOpenModalLogIn(!isOpenModalLogIn);
  const setItemListId = ({ itemId }, listId) => {
    const payload = {
      itemId,
      listId,
    };
    moveTask(payload);
    moveTaskLocal(payload);
  };
  const handleItemDrop = (item, listId) => setItemListId(item, listId);
  const handleAddTask = (listId) => {
    toggleModalAddTaskView();
    setCurrentListId(listId);
  };
  const handleAddBoard = () => {
    toggleModalAddBoardView();
  };
  const handleRemoveList = (listId) => {
    removeList({ listId });
    removeListLocal({ listId });
  };
  const handleListModalAccept = (title) => {
    // Генерирует временный id который изменится после добавления списка в бд
    const listId = String(Date.now());
    const payload = {
      title,
      boardId: currentBoard,
    };

    addList({ ...payload, temporaryId: listId });
    addListLocal({ ...payload, listId });
  };
  const handleTaskModalAccept = (title) => {
    // Генерирует временный id который изменится после добавления таски в бд
    const id = String(Date.now());
    const payload = {
      listId: currentListId,
      checked: false,
      title,
    };
    addTask({ ...payload, temporaryId: id });
    addTaskLocal({ ...payload, id });
  };
  const handleRemoveTask = (payload) => {
    removeTask(payload);
    removeTaskLocal(payload);
  };
  const handleBoardModalAccept = (title) => {
    // Генерирует временный id который изменится после добавления доски в бд
    const id = String(Date.now());
    const boardBody = {
      title,
    };
    addBoardLocal({ ...boardBody, boardId: id });
    addBoard({ ...boardBody, temporaryId: id });
  };
  const handleTaskClick = (id) => {
    setCurrentTaskId(id);
    toggleModalTaskInfoView();
  };
  const handleOpenListInfo = (id) => {
    setCurrentListId(id);
    toggleModalListInfoView();
  };
  const handleCheckTask = (payload) => {
    checkTask(payload);
    checkTaskLocal(payload);
  };
  const handleEditTaskTitle = (payload) => {
    editTaskTitle(payload);
    editTaskTitleLocal(payload);
  };
  const handleEditListTitle = (payload) => {
    editListTitle(payload);
    editListTitleLocal(payload);
  };
  const handleRemoveBoard = (payload) => {
    removeBoard(payload);
    removeBoardLocal(payload);
  };
  const handleSignUpSubmit = (payload) => registerUser(payload);
  const handleLogInSubmit = (payload) => loginUser(payload);
  const handleCloseModalTaskInfo = () => toggleModalTaskInfoView();
  const handleCloseModalListInfo = () => toggleModalListInfoView();
  const handleCloseModalSignUp = () => toggleModalSignUpView();
  const handleCloseModalLogIn = () => toggleModalLogInView();
  const handleLogOut = () => {
    logoutUser();
    fetchTasks();
    fetchLists();
    fetchBoards();
  };
  const isLogged = user.token !== '';
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
          <div className="todo-btns">
            <Button className="to-do-add-list" onClick={toggleModalAddListView}>add list</Button>
            <div className="auth-btns">
              {!isLogged
                && <Button className="to-do-log-in" onClick={toggleModalLogInView}>Log In</Button>}
              {!isLogged
                && <Button className="to-do-sign-up" onClick={toggleModalSignUpView}>Sign Up</Button>}
              {isLogged
                && <Button className="to-do-log-out" onClick={handleLogOut}>Log Out</Button>}
            </div>
          </div>
        </ToDoHeader>
        <div className={`to-do-app-lists ${small}`}>
          {lists.filter(([, list]) => currentBoard === 0 || list.boardId === currentBoard)
            .map(([listId, { title }]) => (
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
          isOpen={isOpenModalAddList}
          onAccept={handleListModalAccept}
          onCancel={toggleModalAddListView}
        />
        <ModalAddTask
          isOpen={isOpenModalAddTask}
          onAccept={handleTaskModalAccept}
          onCancel={toggleModalAddTaskView}
        />
        <ModalAddBoard
          isOpen={isOpenModalAddBoard}
          onAccept={handleBoardModalAccept}
          onCancel={toggleModalAddBoardView}
        />
        <ModalTaskInfo
          isOpen={isOpenModalTaskInfo}
          taskId={currentTaskId}
          tasks={tasks}
          onClose={handleCloseModalTaskInfo}
          onEditTitle={handleEditTaskTitle}
          fetchTask={fetchTask}
          currentTask={currentTask}
        />
        <ModalListInfo
          isOpen={isOpenModalListInfo}
          listId={currentListId}
          lists={lists}
          onClose={handleCloseModalListInfo}
          onEditTitle={handleEditListTitle}
          fetchList={fetchList}
          currentList={currentList}
        />
        <ModalSignUp
          isOpen={isOpenModalSignUp}
          onClose={handleCloseModalSignUp}
          onSubmit={handleSignUpSubmit}
        />
        <ModalLogIn
          isOpen={isOpenModalLogIn}
          onClose={handleCloseModalLogIn}
          onSubmit={handleLogInSubmit}
        />
      </div>
    </div>
  );
};

ToDo.propTypes = {
  //  data prop types
  lists: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]))).isRequired,
  tasks: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]))).isRequired,
  boards: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]))).isRequired,
  user: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
  // functions prop types
  addTask: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
  checkTask: PropTypes.func.isRequired,
  moveTask: PropTypes.func.isRequired,
  editTaskTitle: PropTypes.func.isRequired,
  fetchTasks: PropTypes.func.isRequired,
  addTaskLocal: PropTypes.func.isRequired,
  removeTaskLocal: PropTypes.func.isRequired,
  checkTaskLocal: PropTypes.func.isRequired,
  moveTaskLocal: PropTypes.func.isRequired,
  editTaskTitleLocal: PropTypes.func.isRequired,
  addList: PropTypes.func.isRequired,
  removeList: PropTypes.func.isRequired,
  editListTitle: PropTypes.func.isRequired,
  fetchLists: PropTypes.func.isRequired,
  fetchList: PropTypes.func.isRequired,
  addListLocal: PropTypes.func.isRequired,
  removeListLocal: PropTypes.func.isRequired,
  editListTitleLocal: PropTypes.func.isRequired,
  addBoardLocal: PropTypes.func.isRequired,
  removeBoardLocal: PropTypes.func.isRequired,
  addBoard: PropTypes.func.isRequired,
  removeBoard: PropTypes.func.isRequired,
  fetchBoards: PropTypes.func.isRequired,
  fetchTask: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  //  other prop types
  currentList: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
  currentTask: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ])).isRequired,
};

const mapStateToProps = ({
  lists, tasks, boards, user, currentTask, currentList,
}) => ({
  lists,
  tasks,
  boards,
  user,
  currentTask,
  currentList,
});
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
};
const mapListsDispatchToProps = {
  addList,
  removeList,
  editListTitle,
  addListLocal,
  removeListLocal,
  editListTitleLocal,
  fetchList,
  fetchLists,
};
const mapBoardsDispatchToProps = {
  addBoard,
  removeBoard,
  fetchBoards,
  addBoardLocal,
  removeBoardLocal,
};
const mapOtherDispatchToProps = {
  registerUser,
  loginUser,
  logoutUser,
};
const mapDispatchToProps = {
  ...mapTasksDispatchToProps,
  ...mapListsDispatchToProps,
  ...mapBoardsDispatchToProps,
  ...mapOtherDispatchToProps,
};
export default connect(mapStateToProps, mapDispatchToProps)(ToDo);

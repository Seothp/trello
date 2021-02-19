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
  addBoardLocal,
  removeBoardLocal,
} from '../../actions/actionCreator';
import {
  removeTask, checkTask, fetchTasks,
  addList, fetchLists,
  addBoard, removeBoard, fetchBoards,
  moveTask,
  fetchTask,
  fetchList,
  editTaskTitle,
} from '../../utilities/api';

// components imports
import Button from '../button/button';

// local imports
import ToDoHeader from './todo-header';
import ToDoList from './todo-list';
import ModalAddList from './modal-add-list';
import ModalAddBoard from './modal-add-board';
import ModalTaskInfo from './modal-task-info';
import BoardsList from './boards-list';

import './todo.css';

const isSmallScreen = window.innerWidth < 375;
const small = isSmallScreen ? 'small' : '';
/*
====================================================================
    WARGNING: Это одна большая куча говнокода
====================================================================
*/
const ToDo = (props) => {
  // data destructuringD
  const {
    lists, tasks, boards,
  } = props;
  // tasks functions distructuring
  const {
    removeTask,
    checkTask,
    moveTask,
    editTaskTitle,
    fetchTasks,
    removeTaskLocal,
    checkTaskLocal,
    moveTaskLocal,
    editTaskTitleLocal,
    currentTask,
  } = props;
  // lists functions distructuring
  const {
    addList,
    fetchLists,
    addListLocal,
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

  const [isOpenModalAddList, setIsOpenModalAddList] = useState(false);
  const [isOpenModalAddBoard, setIsOpenModalAddBoard] = useState(false);
  const [isOpenModalTaskInfo, setIsOpenModalTaskInfo] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(0);
  const [currentBoard, setCurrentBoard] = useState(0);

  useEffect(() => {
    fetchTasks();
    fetchLists();
    fetchBoards();
  }, []);

  const toggleModalAddListView = () => setIsOpenModalAddList(!isOpenModalAddList);
  const toggleModalAddBoardView = () => setIsOpenModalAddBoard(!isOpenModalAddBoard);
  const toggleModalTaskInfoView = () => setIsOpenModalTaskInfo(!isOpenModalTaskInfo);
  const setItemListId = ({ itemId }, listId) => {
    const payload = {
      itemId,
      listId,
    };
    moveTask(payload);
    moveTaskLocal(payload);
  };
  const handleItemDrop = (item, listId) => setItemListId(item, listId);
  const handleAddBoard = () => {
    toggleModalAddBoardView();
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
  const handleCheckTask = (payload) => {
    checkTask(payload);
    checkTaskLocal(payload);
  };
  const handleEditTaskTitle = (payload) => {
    editTaskTitle(payload);
    editTaskTitleLocal(payload);
  };
  const handleRemoveBoard = (payload) => {
    removeBoard(payload);
    removeBoardLocal(payload);
  };
  const handleCloseModalTaskInfo = () => toggleModalTaskInfoView();

  return (
    <div className="to-do-app">
      <BoardsList
        boards={boards}
        onAddBoard={handleAddBoard}
        onDeleteBoard={handleRemoveBoard}
        setCurrentBoard={setCurrentBoard}
      />
      <div className="content">
        <ToDoHeader />
        <div className={`to-do-app-lists ${small}`}>
          <Button className="to-do-add-list" onClick={toggleModalAddListView}>add list</Button>
          {lists.filter(([, list]) => currentBoard === 0 || list.boardId === currentBoard)
            .map(([listId, list]) => (
              <ToDoList
                key={listId}
                listId={listId}
                title={list.title}
                list={list}
                tasks={tasks}
                checkTask={handleCheckTask}
                removeTask={handleRemoveTask}
                onItemDrop={handleItemDrop}
                onTaskClick={handleTaskClick}
              />
            ))}
        </div>
        <ModalAddList
          isOpen={isOpenModalAddList}
          onAccept={handleListModalAccept}
          onCancel={toggleModalAddListView}
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
  // functions prop types
  removeTask: PropTypes.func.isRequired,
  checkTask: PropTypes.func.isRequired,
  moveTask: PropTypes.func.isRequired,
  editTaskTitle: PropTypes.func.isRequired,
  fetchTasks: PropTypes.func.isRequired,
  removeTaskLocal: PropTypes.func.isRequired,
  checkTaskLocal: PropTypes.func.isRequired,
  moveTaskLocal: PropTypes.func.isRequired,
  editTaskTitleLocal: PropTypes.func.isRequired,
  addList: PropTypes.func.isRequired,
  fetchLists: PropTypes.func.isRequired,
  addListLocal: PropTypes.func.isRequired,
  addBoardLocal: PropTypes.func.isRequired,
  removeBoardLocal: PropTypes.func.isRequired,
  addBoard: PropTypes.func.isRequired,
  removeBoard: PropTypes.func.isRequired,
  fetchBoards: PropTypes.func.isRequired,
  fetchTask: PropTypes.func.isRequired,
  //  other prop types
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
  addListLocal,
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
const mapDispatchToProps = {
  ...mapTasksDispatchToProps,
  ...mapListsDispatchToProps,
  ...mapBoardsDispatchToProps,
};
export default connect(mapStateToProps, mapDispatchToProps)(ToDo);

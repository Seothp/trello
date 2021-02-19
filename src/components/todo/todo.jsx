import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  moveTaskLocal,
  deleteTasksLocal,
  addListLocal,
  addBoardLocal,
  removeBoardLocal,
} from '../../actions/actionCreator';
import {
  fetchTasks,
  addList, fetchLists,
  addBoard, removeBoard, fetchBoards,
  moveTask,
} from '../../utilities/api';

// components imports
import Button from '../button/button';

// local imports
import ToDoHeader from './todo-header';
import ToDoList from './todo-list';
import ModalAddList from './modal-add-list';
import ModalAddBoard from './modal-add-board';
import BoardsList from './boards-list';

import './todo.css';

const isSmallScreen = window.innerWidth < 375;
const small = isSmallScreen ? 'small' : '';

const ToDo = (props) => {
  // data destructuringD
  const {
    lists, tasks, boards,
  } = props;
  // tasks functions distructuring
  const {
    moveTask,
    fetchTasks,
    moveTaskLocal,
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
  } = props;

  const [isOpenModalAddList, setIsOpenModalAddList] = useState(false);
  const [isOpenModalAddBoard, setIsOpenModalAddBoard] = useState(false);
  const [currentBoard, setCurrentBoard] = useState(0);

  useEffect(() => {
    fetchTasks();
    fetchLists();
    fetchBoards();
  }, []);

  const toggleModalAddListView = () => setIsOpenModalAddList(!isOpenModalAddList);
  const toggleModalAddBoardView = () => setIsOpenModalAddBoard(!isOpenModalAddBoard);
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
  const handleBoardModalAccept = (title) => {
    // Генерирует временный id который изменится после добавления доски в бд
    const id = String(Date.now());
    const boardBody = {
      title,
    };
    addBoardLocal({ ...boardBody, boardId: id });
    addBoard({ ...boardBody, temporaryId: id });
  };
  const handleRemoveBoard = (payload) => {
    removeBoard(payload);
    removeBoardLocal(payload);
  };
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
                onItemDrop={handleItemDrop}
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
  moveTask: PropTypes.func.isRequired,
  fetchTasks: PropTypes.func.isRequired,
  moveTaskLocal: PropTypes.func.isRequired,
  addList: PropTypes.func.isRequired,
  fetchLists: PropTypes.func.isRequired,
  addListLocal: PropTypes.func.isRequired,
  addBoardLocal: PropTypes.func.isRequired,
  removeBoardLocal: PropTypes.func.isRequired,
  addBoard: PropTypes.func.isRequired,
  removeBoard: PropTypes.func.isRequired,
  fetchBoards: PropTypes.func.isRequired,
  //  other prop types
};

const mapStateToProps = ({
  lists, tasks, boards, user,
}) => ({
  lists,
  tasks,
  boards,
  user,
});
const mapTasksDispatchToProps = {
  moveTask,
  deleteTasksLocal,
  moveTaskLocal,
  fetchTasks,
};
const mapListsDispatchToProps = {
  addList,
  addListLocal,
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

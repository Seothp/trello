// /* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';

import { editListTitle, removeList, addTask } from '../../utilities/api';
import { editListTitleLocal, removeListLocal, addTaskLocal } from '../../actions/actionCreator';

import ToDoItem from './todo-item';
import Button from '../button/button';
import ModalListInfo from './modal-list-info';
import ModalAddTask from './modal-add-task';

import ItemTypes from '../../ItemTypes';
import './todo-list.css';

const isSmallScreen = window.innerWidth < 375;
const small = isSmallScreen ? 'small' : '';

const ToDoList = ({
  listId, title, tasks, list, removeTask, checkTask, onTaskClick,
  onItemDrop,
}) => {
  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);
  const [isOpenAddTaskModal, setIsOpenAddTaskModal] = useState(false);
  const dispatch = useDispatch();
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.ITEM,
    drop: (item) => onItemDrop(item, listId),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const handleRemoveList = (listId) => {
    dispatch(removeList({ listId }));
    dispatch(removeListLocal({ listId }));
  };
  const handleEditListTitle = (list) => {
    dispatch(editListTitle(list));
    dispatch(editListTitleLocal(list));
  };
  const handleTaskModalAccept = (title) => {
    // Генерирует временный id который изменится после добавления таски в бд
    const id = String(Date.now());
    const payload = {
      checked: false,
      listId,
      title,
    };
    dispatch(addTask({ ...payload, temporaryId: id }));
    dispatch(addTaskLocal({ ...payload, id }));
  };
  const plusBackground = (canDrop && isOver) ? '#32EB40' : 'gray';
  return (
    <div
      className={`to-do-list ${small}`}
      key={listId}
      ref={drop}
    >
      <h3 className="to-do-list-title">{title}</h3>
      <button className="to-do-list-info-btn" type="button" onClick={() => setIsOpenInfoModal(true)}>&#9998;</button>
      <div className="to-do-list-buttons">
        <Button className="to-do-add-task" onClick={() => setIsOpenAddTaskModal(true)}>add task</Button>
        <Button className="to-do-remove-list" invert onClick={() => handleRemoveList(listId)}>remove list</Button>
      </div>
      {tasks.filter(([, task]) => task.listId === listId).map(([id, { title, checked }]) => (
        <ToDoItem
          id={id}
          title={title}
          key={id}
          checked={checked}
          removeTask={removeTask}
          checkTask={checkTask}
          onTaskClick={onTaskClick}
        />
      ))}
      {canDrop
        && <div className="to-do-can-drop-item" style={{ background: plusBackground }} />}
      <ModalListInfo
        isOpen={isOpenInfoModal}
        listId={listId}
        onClose={() => setIsOpenInfoModal(false)}
        onEditTitle={handleEditListTitle}
        currentList={list}
      />
      <ModalAddTask
        isOpen={isOpenAddTaskModal}
        onAccept={handleTaskModalAccept}
        onCancel={() => setIsOpenAddTaskModal(false)}
      />
    </div>
  );
};

ToDoList.propTypes = {
  listId: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]))).isRequired,
  removeTask: PropTypes.func.isRequired,
  checkTask: PropTypes.func.isRequired,
  onItemDrop: PropTypes.func.isRequired,
  onTaskClick: PropTypes.func.isRequired,
  list: PropTypes.shape({
    listId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
  }).isRequired,
  title: PropTypes.string,
};

ToDoList.defaultProps = {
  title: 'Title is not defined',
};

export default ToDoList;

import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { editTaskTitle, removeTask, checkTask } from '../../utilities/api';
import { editTaskTitleLocal, removeTaskLocal, checkTaskLocal } from '../../actions/actionCreator';
import ItemTypes from '../../ItemTypes';
import ModalTaskInfo from './modal-task-info';

import './todo-item.css';

const ToDoItem = ({
  title, id, checked, task,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const classes = classNames(
    'to-do-item',
    { checked },
  );
  const [{ isDragging }, drag] = useDrag({
    item: { itemId: id, type: ItemTypes.ITEM },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const handleEditTaskTitle = (payload) => {
    dispatch(editTaskTitle(payload));
    dispatch(editTaskTitleLocal(payload));
  };
  const handleRemoveTask = (payload) => {
    dispatch(removeTask(payload));
    dispatch(removeTaskLocal(payload));
  };
  const handleCheckTask = (payload) => {
    dispatch(checkTask(payload));
    dispatch(checkTaskLocal(payload));
  };
  const style = isDragging ? {
    opacity: 0.7,
  } : {};
  return (
    <div className={classes} ref={drag} style={style}>
      <button className="to-do-item-check" type="button" onClick={() => handleCheckTask({ id })}>check task</button>
      <button className="to-do-item-text" type="button" onClick={() => setIsModalOpen(true)}>{title}</button>
      <button className="to-do-item-delete" type="button" onClick={() => handleRemoveTask({ id })}>&#215;</button>
      <ModalTaskInfo
        isOpen={isModalOpen}
        taskId={id}
        onClose={() => setIsModalOpen(false)}
        onEditTitle={handleEditTaskTitle}
        task={task}
      />
    </div>
  );
};

ToDoItem.propTypes = {
  id: PropTypes.string.isRequired,
  task: PropTypes.shape({
    checkTask: PropTypes.bool,
    listId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    title: PropTypes.string,
  }).isRequired,
  title: PropTypes.string,
  checked: PropTypes.bool,
};

ToDoItem.defaultProps = {
  title: 'Title',
  checked: false,
};

export default ToDoItem;

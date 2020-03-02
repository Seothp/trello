import React, { useState } from 'react';
import { connect } from 'react-redux';

import { 
    addList, 
    removeList, 
    addTask, 
    removeTask, 
    checkTask, 
    moveTask, 
    deleteTasks, 
    addBoard, 
    removeBoard,
    editTaskTitle,
} from '../../actions/actionCreator'

import ToDoList from '../todo-list/todo-list';
import ToDoHeader from '../todo-header/todo-header';
import ModalAddList from '../modal-add-list/modal-add-list';
import ModalAddTask from '../modal-add-task/modal-add-task';
import ModalAddBoard from '../modal-add-board/modal-add-board';
import ModalTaskInfo from '../modal-task-info/modal-task-info';
import Button from '../button/button';
import BoardsList from '../boards-list/boards-list'

import './todo.css';

const ToDo = (props) => {
    //data destructuring
    const { lists, tasks, boards } = props;
    //methods destructuring
    const { addList, removeList, addTask, removeTask, checkTask, moveTask, deleteTasks, addBoard, removeBoard, editTaskTitle } = props;

    const [ isOpenModalAddList, setIsOpenModalAddList ] = useState(false);
    const [ isOpenModalAddTask, setIsOpenModalAddTask ] = useState(false);
    const [ isOpenModalAddBoard, setIsOpenModalAddBoard ] = useState(false);
    const [ isOpenModalTaskInfo, setIsOpenModalTaskInfo ] = useState(false);
    const [ currentTask, setCurrentTask ] = useState(0);
    const [ currentList, setCurrentList ] = useState(0);
    const [ currentBoard, setCurrentBoard ] = useState(null);
    
    const changeCurrentListId = id => setCurrentList(id)
    const changeCurrentBoard = id => setCurrentBoard(id)
    const switchModalAddListView = () => setIsOpenModalAddList(!isOpenModalAddList)
    const switchModalAddTaskView = () =>  setIsOpenModalAddTask(!isOpenModalAddTask)
    const switchModalAddBoardView = () => setIsOpenModalAddBoard(!isOpenModalAddBoard)
    const switchModalTaskInfoView = () => setIsOpenModalTaskInfo(!isOpenModalTaskInfo)

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
        switchModalTaskInfoView()
    }
    const onCloseModalTaskInfo = () => switchModalTaskInfoView();
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
    editTaskTitle,
})(ToDo);
import React, { Component } from 'react';

import ToDoList from '../todo-list/todo-list';
import Header from '../todo-header/todo-header';
import ModalAddList from '../modal-add-list/modal-add-list';
import ModalAddTask from '../modal-add-task/modal-add-task';


import './todo.css';

class ToDo extends Component {
    constructor(props) {
        super(props);

        // METHODS

        this.state = {
            openModalAddList: false,
            openModalAddTask: false,

            lists: [],
            tasks: [],
        }
    }



    addList(value) {
        this.setState({
            lists: [...this.state.lists, {
                listId: new Date().getTime(),
                title: value,
            }]
        })
    }

    addTask ({title}) {
        this.setState({
            tasks: [...this.state.tasks, {
                id: new Date().getTime(),
                listId: this.state.curListId,
                title,
                checked: false,
            }]
        })
    }

    removeList (listId) {
        this.setState({
            lists: this.state.lists.filter((item) => item.listId !== listId)
        })
    }

    removeTask (id) {
        this.setState({
            tasks: this.state.tasks.filter((item) => item.id !== id)
        })
    }

    checkTask(id) {
        const mappedTasks = this.state.tasks.map((item) => {
            return item.id === id ? {...item, checked: !item.checked} : item;
        })
        this.setState({
            tasks: mappedTasks,
        })
        console.log(id,this)
    }

    changeItemListId({itemId}, listId) {
        const tasks = this.state.tasks.map((task) => {
            if (itemId === task.id) {
                task.listId = listId;
                return task
            } else {
                return task
            }
        })
        this.setState({
            tasks
        })
    }

    changeCurListId(curListId) {
        this.setState({
            curListId
        })
    }

    switchModalAddListView(e) {
        this.setState({
            openModalAddList: !this.state.openModalAddList,
        })
    }

    onAddTask(listId) {
        this.switchModalAddTaskView();
        this.changeCurListId(listId);
    }

    switchModalAddTaskView(e) {
        this.setState({
            openModalAddTask: !this.state.openModalAddTask,
        })
    }

    onListModalAccept(value) {
        this.addList(value);
    }

    onModalTaskAccept(item) {
        this.addTask(item);
    }

    onItemDrop(item, listId) {
        this.changeItemListId(item, listId);
    }

    render() {
        const { openModalAddList, openModalAddTask, tasks, lists } = this.state
        return (
            <div className="to-do-app">
                <Header>
                    <button className="to-do-add-list" onClick={() => this.switchModalAddListView()}>add list</button>
                </Header>
                <div className="to-do-app-lists">
                    {lists.map(({listId, title}) => (
                        <ToDoList 
                        key={listId} 
                        listId={listId} 
                        title={title} 
                        tasks={tasks}
                        onAddTask={this.onAddTask.bind(this)}
                        checkTask={this.checkTask.bind(this)}
                        removeTask={this.removeTask.bind(this)}
                        removeList={this.removeList.bind(this)}
                        onItemDrop={this.onItemDrop.bind(this)}
                        />
                    ))}
                </div>
                <ModalAddList
                isOpen={openModalAddList}
                onAccept={this.onListModalAccept.bind(this)}  
                onCancel={this.switchModalAddListView.bind(this)}
                />
                <ModalAddTask 
                isOpen={openModalAddTask}
                onAccept={this.onModalTaskAccept.bind(this)}
                onCancel={this.switchModalAddTaskView.bind(this)}
                />
                
            </div>
        )
    }
}

export default ToDo;

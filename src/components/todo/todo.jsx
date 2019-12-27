import React, { Component } from 'react';

import ToDoList from '../todo-list/todo-list';
import Header from '../todo-header/todo-header';
import ModalAddList from '../modal-add-list/modal-add-list';
import ModalAddTask from '../modal-add-task/modal-add-task';

import './todo.css';

class ToDo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: localStorage.lists ? JSON.parse(localStorage.lists) : [],
            tasks: localStorage.tasks ? JSON.parse(localStorage.tasks) : [],
            openModalAddList: false,
            openModalAddTask: false,
            curListId: 0,
        }
    }
    showModalAddList() {
        this.setState({
            openModalAddList: true,
        })
    }

    onAddTask(listId) {
        this.showModalAddTask();
        this.setState({
            curListId: listId,
        })
    }

    hideModalAddList(e) {
        this.setState({
            openModalAddList: false,
        })
    }

    showModalAddTask() {
        this.setState({
            openModalAddTask: true,
        })
    }

    hideModalAddTask(e) {
        this.setState({
            openModalAddTask: false,
        })
    }

    async addList(value) {
        this.setState({
            lists: [...this.state.lists, {
                listId: new Date().getTime(),
                title: value,
            }]
        })
    }

    async addTask ({title}) {
        this.setState({
            tasks: [...this.state.tasks, {
                id: new Date().getTime(),
                listId: this.state.curListId,
                title,
                checked: false,
            }]
        })
    }

    async removeList(listId) {
        this.setState({
            lists: this.state.lists.filter((item) => item.listId !== listId)
        })
        this.refreshLocalStorage();
    }

    async removeTask(id) {
        this.setState({
            tasks: this.state.tasks.filter((item) => item.id !== id)
        })
        this.refreshLocalStorage();
    }
    
    async checkTask(id) {
        const mappedTasks = this.state.tasks.map((item) => {
            return item.id === id ? {...item, checked: !item.checked} : item;
        })
        this.setState({
            tasks: mappedTasks,
        })
    }
    async changeItemListId({itemId}, listId) {
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
    refreshLocalStorage() {
        localStorage.tasks = JSON.stringify(this.state.tasks);
        localStorage.lists = JSON.stringify(this.state.lists);
    }

    onListModalAccept(value) {
        this.addList(value).then(() => this.refreshLocalStorage());
    }

    onTaskModalAccept(item) {
        this.addTask(item).then(() => this.refreshLocalStorage());
    }
    async onRemoveList(listId) {
        this.removeList(listId).then(() => this.refreshLocalStorage());
        let thisListTasks = this.state.tasks.filter(item => item.listId === listId);
        for (let item of thisListTasks) {
            await this.onRemoveTask(item.id)
        }
    }
    onRemoveTask(id) {
        console.log(id)
        this.removeTask(id).then(() => this.refreshLocalStorage());
    }
    onItemDrop(item, listId) {
        this.changeItemListId(item, listId).then(() => this.refreshLocalStorage());
    }
    onCheckTask(id) {
        this.checkTask(id).then(() => this.refreshLocalStorage())
    }
    render() {
        const { tasks, openModalAddList, openModalAddTask } = this.state
        return (
            <div className="to-do-app">
                <Header>
                    <button className="to-do-add-list" onClick={() => this.showModalAddList()}>add list</button>
                </Header>
                <div className="to-do-app-lists">
                    {this.state.lists.map(({listId, title}) => (
                        <ToDoList 
                        key={listId} 
                        listId={listId} 
                        title={title} 
                        tasks={tasks}
                        onAddTask={this.onAddTask.bind(this)}
                        checkTask={this.onCheckTask.bind(this)}
                        removeTask={this.onRemoveTask.bind(this)}
                        removeList={this.onRemoveList.bind(this)}
                        onItemDrop={this.onItemDrop.bind(this)}
                        />
                    ))}
                </div>
                <ModalAddList
                isOpen={openModalAddList}
                onAccept={this.onListModalAccept.bind(this)}  
                onCancel={this.hideModalAddList.bind(this)}
                />
                <ModalAddTask 
                isOpen={openModalAddTask}
                onAccept={this.onTaskModalAccept.bind(this)}
                onCancel={this.hideModalAddTask.bind(this)}
                />
                
            </div>
        )
    }
}

export default ToDo;

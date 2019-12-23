import React, { Component } from 'react';

import ToDoList from '../todo-list/todo-list';
import Header from '../todo-header/todo-header';
import ModalAddList from '../modal-add-list/modal-add-list';
import ModalAddTask from '../modal-add-task/modal-add-task'

class ToDo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: [
                {
                    listId: 12312312,
                    title: 'wdadad'
                }, {
                    listId: 12312399,
                    title: 'wdadad'
                }
            ],
            tasks: [
                {
                    id: 1,
                    listId: 12312312,
                    title: 'first task',
                    checked: false,
                }, {
                    id: 2,
                    listId: 12312399,
                    title: 'second task',
                    checked: false,
                }
            ],
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
        e.stopPropagation();
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

    addList(value) {
        this.setState({
            lists: [...this.state.lists, {
                listId: new Date().getTime(),
                title: value,
            }]
        })
    }

    addTask({title}) {
        this.setState({
            tasks: [...this.state.tasks, {
                id: new Date().getTime(),
                listId: this.state.curListId,
                title,
                checked: false,
            }]
        })
        console.log(this.state.tasks)
    }

    removeList(listId) {
        this.setState({
            lists: this.state.lists.filter((item) => item.listId !== listId)
        })
    }

    removeTask(id) {
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
    }
    render() {
        const { tasks, openModalAddList, openModalAddTask } = this.state
        return (
            <div className="to-do-app">
                <Header>
                    <button className="to-do-add-list" onClick={() => this.showModalAddList()}>add list</button>
                </Header>
                {this.state.lists.map(({listId, title}) => (
                    <ToDoList 
                    key={listId} 
                    listId={listId} 
                    title={title} 
                    tasks={tasks}
                    onAddTask={this.onAddTask.bind(this)}
                    checkTask={this.checkTask.bind(this)}
                    removeTask={this.removeTask.bind(this)}
                    removeList={this.removeList.bind(this)}
                    />
                ))}
                <ModalAddList
                isOpen={openModalAddList}
                onAccept={this.addList.bind(this)}  
                onCancel={this.hideModalAddList.bind(this)}
                />
                <ModalAddTask 
                isOpen={openModalAddTask}
                onAccept={this.addTask.bind(this)}
                onCancel={this.hideModalAddTask.bind(this)}
                />
                
            </div>
        )
    }
}

export default ToDo;

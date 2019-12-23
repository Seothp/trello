import React, { Component } from 'react';

import ToDoList from '../todo-list/todo-list';
import Header from '../todo-header/todo-header';
import ModalAddList from '../modal-add-list/modal-add-list';

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
        }
    }
    showModalAddList() {
        this.setState({
            openModalAddList: true,
        })
    }

    hideModalAddList(e) {
        console.log(e);
        e.stopPropagation();
        this.setState({
            openModalAddList: false,
        })
    }

    showModalAddTask() {
        
    }

    hideModalAddTask(e) {
        
    }

    addList(value) {
        this.setState({
            lists: [...this.state.lists, {
                listId: new Date().getTime(),
                title: value,
            }]
        })
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

    addTask({id, listId, title}) {
        this.setState({
            tasks: [...this.state.tasks, {
                id,
                listId,
                title,
                checked: false,
            }]
        })
        console.log(this.state.tasks)
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
        const { tasks } = this.state
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
                    addTask={this.addTask.bind(this)}
                    checkTask={this.checkTask.bind(this)}
                    removeTask={this.removeTask.bind(this)}
                    removeList={this.removeList.bind(this)}
                    />
                ))}
                {this.state.openModalAddList && 
                <ModalAddList 
                isOpen={this.state.openModalAddList}
                onAccept={this.addList.bind(this)}  
                onCancel={this.hideModalAddList.bind(this)}
                />
                }
                
            </div>
        )
    }
}

export default ToDo;

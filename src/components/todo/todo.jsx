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
        this.addList = this.props.addList;
        this.addTask = this.props.addTask;
        this.removeList = this.props.removeList;
        this.removeTask = this.props.removeTask;
        this.checkTask = this.props.checkTask;
        this.changeItemListId = this.props.changeItemListId;
        this.changeCurListId = this.props.changeCurListId;

        this.state = {
            openModalAddList: false,
            openModalAddTask: false,
        }
    }
    
    showModalAddList() {
        this.setState({
            openModalAddList: true,
        })
    }

    onAddTask(listId) {
        this.showModalAddTask();
        this.changeCurListId(listId);
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

    onListModalAccept(value) {
        this.addList(value);
    }

    onTaskModalAccept(item) {
        this.props.addTask(item);
    }

    onItemDrop(item, listId) {
        this.changeItemListId(item, listId);
    }

    render() {
        const { openModalAddList, openModalAddTask } = this.state
        return (
            <div className="to-do-app">
                <Header>
                    <button className="to-do-add-list" onClick={() => this.showModalAddList()}>add list</button>
                </Header>
                <span className="lists-count">{this.props.lists.length}</span>
                <div className="to-do-app-lists">
                    {this.props.lists.map(({listId, title}) => (
                        <ToDoList 
                        key={listId} 
                        listId={listId} 
                        title={title} 
                        tasks={this.props.tasks}
                        onAddTask={this.onAddTask.bind(this)}
                        checkTask={this.checkTask}
                        removeTask={this.removeTask}
                        removeList={this.removeList}
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

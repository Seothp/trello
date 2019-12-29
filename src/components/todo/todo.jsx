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
                    <button className="to-do-add-list" onClick={() => this.switchModalAddListView()}>add list</button>
                </Header>
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

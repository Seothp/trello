import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addList, removeList, addTask, removeTask, checkTask, moveTask } from '../../actions/actionCreator'

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
        }
    }


    addTask ({title}) {
        let item = {
            id: new Date().getTime(),
            listId: this.state.curListId,
            title,
        }
        this.props.addTask(item);
    }
    
    
    removeTask (id) {
        this.props.removeTask({id});
    }

    checkTask(id) {
        this.props.checkTask({id});
    }

    changeItemListId({itemId}, listId) {
        const id = itemId;
        this.props.moveTask({id, listId})
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
        const listId = Date.now()
        this.props.addList(listId, value);
    }

    onModalTaskAccept(item) {
        this.addTask(item);
    }

    onItemDrop(item, listId) {
        this.changeItemListId(item, listId);
    }

    render() {
        const { openModalAddList, openModalAddTask, } = this.state
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
                        checkTask={this.checkTask.bind(this)}
                        removeTask={this.removeTask.bind(this)}
                        removeList={this.props.removeList.bind(this)}
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

export default connect( ({ lists, tasks }) => ({
    lists,
    tasks
  }), { addList, removeList, addTask, removeTask, checkTask, moveTask })(ToDo);
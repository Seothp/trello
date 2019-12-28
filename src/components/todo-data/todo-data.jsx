import React, { Component } from 'react' 

import ToDo from '../todo/todo'
class ToDoData extends Component {
    constructor(props) {
        super(props);

        //binding methods
        this.updateLocalStorage = this.updateLocalStorage.bind(this);
        this.addList = this.addList.bind(this);
        this.addTask = this.addTask.bind(this);
        this.removeList = this.removeList.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.checkTask = this.checkTask.bind(this);
        this.changeItemListId = this.changeItemListId.bind(this);
        this.changeCurListId = this.changeCurListId.bind(this);

        this.state = {
            lists: localStorage.lists ? JSON.parse(localStorage.lists) : [],
            tasks: localStorage.tasks ? JSON.parse(localStorage.tasks) : [],
            curListId: 0,
            key: 0,
        }
    }
    componentDidUpdate () {
        this.updateLocalStorage();
    }

    updateLocalStorage() {
        localStorage.tasks = JSON.stringify(this.state.tasks);
        localStorage.lists = JSON.stringify(this.state.lists);
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


    render() {
        const { lists, tasks } = this.state;
        return(
            <ToDo
            lists={lists}
            tasks={tasks}
            addList={this.addList}
            addTask={this.addTask}
            removeList={this.removeList}
            removeTask={this.removeTask}
            checkTask={this.checkTask}
            changeItemListId={this.changeItemListId}
            changeCurListId={this.changeCurListId}
            />
        )
    }
}

export default ToDoData

import React, { Component } from 'react';

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
                }, {
                    id: 2,
                    listId: 12312399,
                    title: 'second task',
                }
            ],
        }
    }
    render() {
        return (
            <div className="to-do-app" onClick={this.incCount}>
                {this.state.lists.map(({listId, title}) => (
                    <div className="to-do-list" key={listId}>
                        {title}
                        {this.state.tasks.filter((task) => task.listId === listId).map(({id, title})=>(
                            <div className="to-do-item" key={id} >{title}</div>
                        ))}
                    </div>
                ))}
            </div>
        )
    }
}

export default ToDo;
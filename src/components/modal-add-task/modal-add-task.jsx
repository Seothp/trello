import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../modal/modal'

class ModalAddTask extends Component {
    state = {
        titleValue: '',

    }

    handleInputChange({target: {value}}) {
        this.setState({
            titleValue: value,
        })
    }

    render() {
        const { titleValue } = this.state;
        const { isOpen, listId, onAccept, onCancel } = this.props;
        return(
            <Modal
            onCancel={onCancel}
            isOpen={isOpen}
            >
                <div className="modal-add-task">
                    <div className="add-task-form">
                        <input type="text" className="add-task-title" value={titleValue} onChange={this.handleInputChange.bind(this)}/>
                        <button onClick={() => onAccept({listId, title: titleValue})}>add</button>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default ModalAddTask;
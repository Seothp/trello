import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../modal/modal'

import './modal-add-task.css'

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
        const { isOpen, onAccept, onCancel } = this.props;
        return(
            <Modal
            onCancel={onCancel}
            isOpen={isOpen}
            >
                <div className="modal-add-task">
                    <div className="add-task-form">
                        <input type="text" className="add-task-title" value={titleValue} onChange={this.handleInputChange.bind(this)}/>
                        <button className='modal-add-task-btn' onClick={() => onAccept({title: titleValue})}>add</button>
                    </div>
                </div>
            </Modal>
        )
    }
}

ModalAddTask.propTypes = {
    isOpen: PropTypes.bool, 
    onAccept: PropTypes.func, 
    onCancel: PropTypes.func,
}

ModalAddTask.defaultProps = {
    isOpen: false, 
    onAccept: () => {}, 
    onCancel: () => {},
}


export default ModalAddTask;

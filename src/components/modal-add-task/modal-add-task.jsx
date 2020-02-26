import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../modal/modal'

import './modal-add-task.css'

class ModalAddTask extends Component {
    state = {
        inputValue: '',

    }

    handleInputChange({target: {value}}) {
        this.setState({
            inputValue: value,
        })
    }

    clearModal() {
        this.setState({
            inputValue: '',
        })
    }

    onAccept(inputValue) {
        this.props.onAccept(inputValue);
        this.props.onCancel();
        this.clearModal();
    }

   
    render() {
        const { inputValue } = this.state;
        const { isOpen, onCancel } = this.props;
        return(
            <Modal
                onCancel={onCancel}
                isOpen={isOpen}
            >
                <div className="modal-add-task">
                    <div className="add-task-form">
                        <input type="text" className="add-task-title" value={inputValue} onChange={this.handleInputChange.bind(this)}/>
                        <button className='modal-add-task-btn' onClick={() => this.onAccept({title: inputValue})}>add</button>
                    </div>
                </div>
            </Modal>
        )
    }
}

ModalAddTask.propTypes = {
    isOpen: PropTypes.bool, 
    onAccept: PropTypes.func.isRequired, 
    onCancel: PropTypes.func.isRequired,
}

ModalAddTask.defaultProps = {
    isOpen: false,
}


export default ModalAddTask;

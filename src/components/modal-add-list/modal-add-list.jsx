import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from '../modal/modal'

import './modal-add-list.css';

class ModalAddList extends Component {
    state = {
        inputValue: '',
    }

    handleInputChange({target: {value}}) {
        this.setState({
            inputValue: value,
        })
    }

    render() {
        const { inputValue } = this.state;
        const { onAccept, onCancel, isOpen } = this.props;
        return (
            <Modal isOpen={isOpen} onCancel={onCancel}>
                <div className="modal-add-list">
                    <input type="text" className="input-title" value={inputValue} onChange={this.handleInputChange.bind(this)}/>
                    <button className="modal-add-list-btn" onClick={() => onAccept(inputValue)}>add</button>
                </div>
            </Modal>
            
        )
    }
    
}

ModalAddList.propTypes = {
    isOpen: PropTypes.bool,
    onAccept: PropTypes.func,
    onCancel: PropTypes.func,
}

ModalAddList.defaultProps = {
    isOpen: false,
    onAccept: () => {},
    onCancel: () => {},
}

export default ModalAddList
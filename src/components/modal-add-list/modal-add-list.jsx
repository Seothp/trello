import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from '../modal/modal'

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
        const { onAccept, onCancel, isOpen } = this.props
        return (
            <Modal onAccept={onAccept} isOpen={isOpen} onCancel={onCancel}>
                <div className="modal-add-list">
                    <input type="text" className="input-title" onChange={this.handleInputChange.bind(this)}/>
                    <button className="modal-add-list-btn" onClick={() => onAccept(this.state.inputValue)}>add</button>
                </div>
            </Modal>
            
        )
    }
    
}

ModalAddList.propTypes = {
    onAccept: PropTypes.func,
    onCancel: PropTypes.func,
    isOpen: PropTypes.bool,
}

ModalAddList.defaultProps = {
    isOpen: false,
    onAccept: () => {},
    onCancel: () => {},
}

export default ModalAddList
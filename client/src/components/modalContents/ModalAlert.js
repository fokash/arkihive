import React from 'react';

class ModalAlert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
    }
    // send register response message
    messageHandler(message, messageType) {
        let messageFieldName = messageType + 'Alert';
        const messageField = document.getElementsByName(messageFieldName)[0];
        messageField.classList.add("show-" + messageType + "-field");
        this.setState({
            'message': message
        });
    }
    componentDidMount() {
        this.messageHandler(this.props.message, this.props.type);
    }
    render() { 
        return (
            <div>
                <div className="alert alert-danger fade in" name="errorAlert"><strong>Error! </strong>{this.state.message}</div>
                <div className="alert alert-success fade in" name="successAlert"><strong>Yay! </strong>{this.state.message}</div>
                <button type="button" className="btn btn-primary" onClick={this.props.isAlertModalCheck} data-dismiss="modal">OK</button>
            </div>
        );
    }
}
 
export default ModalAlert;
import React, {Component} from 'react';
import helpers from '../../utils/helpers';
import ModalAlert from './ModalAlert';

class ModalForgotPasswordContent extends Component {
    constructor() {
        super();
        this.state = {
            message: '',
            isAlertModal: false
        };
        this.isAlertModalCheck = this.isAlertModalCheck.bind(this);
    }
    // send register response message
    messageHandler(message, messageType) {
        let messageFieldName = messageType + 'FieldForgotPassword';
        const messageField = document.getElementsByName(messageFieldName)[0];
        messageField.classList.add("show-" + messageType + "-field");
        this.setState({
            'message': message
        });
    }
    // validate email
    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    // handle form submission
    forgotPassword() {
        const forgotPasswordForm = document.forms['forgotPasswordForm'];
        let requestObject = {
            email: forgotPasswordForm['email'].value
        };
        this.props.showPageLoaderFromChild(true);
        helpers.callService('api/forgotPassword', 'post', requestObject)
        .then((data) => {
            this.props.showPageLoaderFromChild(false);
            let responseData = data.section.data;
            if (responseData.success) {
                this.setState({
                    message: responseData.message,
                    isAlertModal: true
                });
            }
            else {
                this.messageHandler(responseData.message, 'error');
            }
        });
        document.forms['forgotPasswordForm'].reset();
    }
    // validate the form
    validateForm() {
        const formFields = ['email'];
        const forgotPasswordForm = document.forms['forgotPasswordForm'];
        let validationFlag = (forgotPasswordForm[formFields[0]].value).trim() ? true : false;

        (validationFlag)
        ? this.validateEmail(forgotPasswordForm['email'].value)
            ? this.forgotPassword()
            : this.messageHandler('Invalid email ID', 'error')
        : this.messageHandler('Fill all the fields', 'error');
    }
    isAlertModalCheck() {
        this.setState({
            isAlertModal: false
        });
    }
    render() {
        if (!this.state.isAlertModal) {
            const passwordRules = "6-16 characters,\n\rminimum 1 lowercase alphabet,\n\rminimum 1 uppercase,\n\rminimum 1 number\n\rminimum 1 special character (!@#$%^&*)";
            return (
                <div>
                    <form name="forgotPasswordForm">
                        <div className="form-group">
                            <p>Enter the email address tagged to your Arkihive account to change your password.</p>
                            <input type="text" className="form-control" placeholder="Email" name="email" id="email" />
                            <div className="alert alert-danger fade in" name="errorFieldForgotPassword"><strong>Error! </strong>{this.state.message}</div>
                            <div className="alert alert-success fade in" name="successFieldForgotPassword">{this.state.message}</div>
                            <button type="button" onClick={this.validateForm.bind(this)} className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            );
        }
        else {
            return (
                <div>
                    <ModalAlert message={this.state.message} isAlertModalCheck={this.isAlertModalCheck} type="success" />
                </div>
            );
        }
    }
}
 
export default ModalForgotPasswordContent;
import React from 'react';
import helpers from '../../utils/helpers';

class ModalLoginContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
    }
    // send register response message
    messageHandler(message, messageType) {
        let messageFieldName = messageType + 'Field';
        const messageField = document.getElementsByName(messageFieldName)[0];
        messageField.classList.add("show-" + messageType + "-field");
        this.setState({
            'message': message
        });
    }
    // validate email
    validateEmail(email) {
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email);
    }
    // validate password
    validatePassword(passwordField) {
        return passwordField.value.match(passwordField.pattern) ? true : false;
    }
    // login user
    loginUser(email, password) {
        const loginForm = document.forms['loginForm'];
        let requestObject = {
            email: loginForm['email'].value,
            password: loginForm['password'].value
        };
        helpers.getHomepageData('authenticate', 'post', requestObject)
        .then((data) => {
            let responseData = data.section.data;
            if (responseData.success) {
                window.sessionStorage.accessToken = responseData.token;
                this.props.navigateTo('/project');
            }
            else {
                this.messageHandler(responseData.message, 'error');
            }
        });
        document.forms['loginForm'].reset();
    }
    // validate the form
    validateForm() {
        const formFields = ['email', 'password'];
        const loginForm = document.forms['loginForm'];
        let validationFlag = false;
        for (let i=0; i<formFields.length; i++) {
            validationFlag = (loginForm[formFields[i]].value).trim() ? true : false;
        }
        (validationFlag)
        ? this.validateEmail(loginForm['email'].value)
            ? this.validatePassword(loginForm['password'])
                ? this.loginUser(loginForm['email'].value, loginForm['password'].value)
                : this.messageHandler('Invalid Password', 'error')
            : this.messageHandler('Invalid email ID', 'error')
        : this.messageHandler('Fill all the fields', 'error');
    }
    render() { 
        return (
            <div>
                <button type="button" className="btn btn-primary btn-facebook">FACEBOOK</button>
                <p>OR</p>
                <button type="button" className="btn btn-primary btn-google">GOOGLE+</button>
                <p>OR</p>
                <form name="loginForm">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Email" name="email" id="email" />
                        <input type="password" className="form-control" placeholder="Password" name="password" id="password"  pattern="^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$" />
                        <div className="alert alert-danger fade in" name="errorField"><strong>Error! </strong>{this.state.message}</div>
                        <div className="alert alert-success fade in" name="successField"><strong>Yay! </strong>{this.state.message}</div>
                        <button type="button" className="btn btn-primary" onClick={this.validateForm.bind(this)}>Login</button>
                        <div className="login-options">
                            <span><a href="#">Forgot Password?</a></span>
                            <span><a href="#registerModal" data-toggle="modal" data-dismiss="modal">New User?</a></span>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
 
export default ModalLoginContent;
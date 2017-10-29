import React from 'react';
import helpers from '../../utils/helpers';

class ModalRegisterContent extends React.Component {
    constructor() {
        super();
        this.state = {
            message: ''
        };
    }
    // send register response message
    messageHandler(message, messageType) {
        let messageFieldName = messageType + 'FieldRegister';
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
    // validate password
    validatePassword(passwordField) {
        return passwordField.value.match(passwordField.pattern) ? true : false;
    }
    // compare password
    comparePassword(passwordField, confirmPasswordField) {
        return (passwordField.value === confirmPasswordField.value) ? true : false;
    }
    // handle form submission
    registerUser() {
        const registerForm = document.forms['registerForm'];
        let requestObject = {
            name: registerForm['name'].value,
            email: registerForm['email'].value,
            password: registerForm['password'].value
        };
        helpers.getHomepageData('register', 'post', requestObject)
        .then((data) => {
            let responseData = data.section.data;
            if (responseData.success) {
                this.messageHandler(responseData.message, 'success');
            }
            else {
                this.messageHandler(responseData.message, 'error');
            }
        });
        document.forms['registerForm'].reset();
    }
    // validate the form
    validateForm() {
        const formFields = ['name', 'email', 'password', 'confirmPassword'];
        const registerForm = document.forms['registerForm'];
        const terms = registerForm['terms'].checked;
        let validationFlag = false;
        for (let i=0; i<formFields.length; i++) {
            validationFlag = (registerForm[formFields[i]].value).trim() ? true : false;
        }
        (validationFlag && terms)
        ? this.validateEmail(registerForm['email'].value)
            ? this.validatePassword(registerForm['password']) 
                ? this.comparePassword(registerForm['password'], registerForm['confirmPassword'])
                    ? this.registerUser()
                    : this.messageHandler('Your passwords do not match', 'error')
                : this.messageHandler('Invalid Password', 'error')
            : this.messageHandler('Invalid email ID', 'error')
        : this.messageHandler('Fill all the fields', 'error');
    }
    render() { 
        const passwordRules = "6-16 characters,\n\rminimum 1 lowercase alphabet,\n\rminimum 1 uppercase,\n\rminimum 1 number\n\rminimum 1 special character (!@#$%^&*)";
        return (
            <div>
                <form name="registerForm" className="form-register">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Name" name="name" id="name" />
                        <input type="text" className="form-control" placeholder="Email" name="email" id="email" />
                        <input type="password" className="form-control" placeholder="Password" name="password" id="password" pattern="^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$" />
                        <a href="#" data-tooltip data-line={passwordRules}><span id="tooltip" className="password-info">i</span></a>
                        <input type="password" className="form-control" placeholder="Retype Password" name="confirmPassword" id="confirmPassword" />
                        <div className="alert alert-danger fade in" name="errorFieldRegister"><strong>Error! </strong>{this.state.message}</div>
                        <div className="alert alert-success fade in" name="successFieldRegister"><strong>Yay! </strong>{this.state.message}</div>
                        <label><input type="checkbox" name="terms" value="" />I agree to Arkihive Terms of Service and Privacy Policy</label>
                        <button type="button" onClick={this.validateForm.bind(this)} className="btn btn-primary">Register</button>
                    </div>
                </form>
            </div>
        );
    }
}
 
export default ModalRegisterContent;
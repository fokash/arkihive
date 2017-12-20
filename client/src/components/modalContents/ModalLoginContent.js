import React from 'react';
import helpers from '../../utils/helpers';
import socialLogin from '../../config/socialLogin';
import Loader from '../common/Loader';

class ModalLoginContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
    }
    // send register response message
    messageHandler(message, messageType) {
        let messageFieldName = messageType + 'FieldLogin';
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
        this.props.showPageLoaderFromChild(true);
        helpers.callService('api/authenticate', 'post', requestObject)
        .then((data) => {
            this.props.showPageLoaderFromChild(false);
            let responseData = data.section.data;
            if (responseData.success) {
                window.sessionStorage.ahAccessToken = responseData.token;
                window.sessionStorage.ahUserName = responseData.name;
                window.sessionStorage.ahUserPhotoUrl = "";
                this.props.navigateTo('/project');
            }
            else {
                this.messageHandler(responseData.message, 'error');
            }
        });
        document.forms['loginForm'].reset();
    }
    // login facebook
    loginFacebook() {
        let componentProps = this.props;
        window.fbAsyncInit = (componentProps) => {
            FB.init({
              appId            : socialLogin.facebookClientId,
              autoLogAppEvents : true,
              xfbml            : true,
              version          : 'v2.10'
            });
            FB.AppEvents.logPageView();

            FB.login((response) => {
                if (response.status === 'connected') {
                    FB.api('/me', 'get', {fields: 'first_name,last_name,email,picture'}, (response) => {
                        let username = response.first_name + ' ' + response.last_name;
                        window.sessionStorage.ahAccessToken = FB.getAuthResponse().accessToken;
                        window.sessionStorage.ahUserName = username;
                        window.sessionStorage.ahUserPhotoUrl = response.picture.data.url;
                        this.props.navigateTo('/project');
                    });
                }
            });
        };
        
        (function(d, s, id){
             let js, fjs = d.getElementsByTagName(s)[0];
             if (d.getElementById(id)) {return;}
             js = d.createElement(s); js.id = id;
             js.src = "https://connect.facebook.net/en_US/sdk.js";
             fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
    googleSignInCallback(e) {
        if (e["status"]["signed_in"]) {
            window.gapi.client.load("plus", "v1", function() {
                if (e["access_token"]) {
                    this.getUserGoogleProfile( e["access_token"] );
                } else if (e["error"]) {
                    this.messageHandler(responseData.message, 'Error occured while importing data');
                }
            }.bind(this));
        } else {
            this.messageHandler(responseData.message, 'Error occured while importing data');
        }
    }
    // handle google user profile
    getUserGoogleProfile(accesstoken) {
        let e = window.gapi.client.plus.people.get({
            userId: "me"
        });
        e.execute(function(e) {
            if (e.error) {
                this.messageHandler(responseData.message, 'Error occured while importing data');
                return;
            
            } else if (e.id) {
                //Profile data
                window.sessionStorage.ahAccessToken = accesstoken;
                window.sessionStorage.ahUserName = e.displayName;
                window.sessionStorage.ahUserPhotoUrl = e.image.url;
                this.props.navigateTo('/project');
                return;
            }
        }.bind(this));
    }
    // login google
    loginGoogle() {
        let response = null;
        window.gapi.auth.signIn({
            callback: function(authResponse) {
                this.googleSignInCallback( authResponse );
            }.bind( this ),
            clientid: socialLogin.googleClientId, //Google client Id
            cookiepolicy: "single_host_origin",
            requestvisibleactions: "http://schema.org/AddAction",
            scope: "https://www.googleapis.com/auth/plus.login email"
        });
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
    componentDidMount(){
        // Google Sign in pre-setup
        (() => {
            let e = document.createElement("script");
            e.type = "text/javascript";
            e.async = true;
            e.src = "https://apis.google.com/js/client:platform.js?onload=gPOnLoad";
            let t = document.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(e, t);
        })();
    }
    render() { 
        return (
            <div>
                <button type="button" className="btn btn-primary btn-facebook" onClick={this.loginFacebook.bind(this)}>FACEBOOK</button>
                <p>OR</p>
                <button type="button" className="btn btn-primary btn-google" onClick={this.loginGoogle.bind(this)}>GOOGLE+</button>
                <p>OR</p>
                <form name="loginForm">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Email" name="email" />
                        <input type="password" className="form-control" placeholder="Password" name="password" pattern="^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$" />
                        <div className="alert alert-danger fade in" name="errorFieldLogin"><strong>Error! </strong>{this.state.message}</div>
                        <div className="alert alert-success fade in" name="successFieldLogin"><strong>Yay! </strong>{this.state.message}</div>
                        <button type="button" className="btn btn-primary" onClick={this.validateForm.bind(this)}>Login</button>
                        <div className="login-options">
                            <span><a href="#forgotPasswordModal" data-toggle="modal" data-dismiss="modal">Forgot Password?</a></span>
                            <span><a href="#registerModal" data-toggle="modal" data-dismiss="modal">New User?</a></span>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
 
export default ModalLoginContent;
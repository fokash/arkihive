import React from 'react';
import Modal from './Modal';
import {Link} from 'react-router-dom';
import ModalLoginContent from '../modalContents/ModalLoginContent';
import ModalRegisterContent from '../modalContents/ModalRegisterContent';
import ModalForgotPasswordContent from '../modalContents/ModalForgotPasswordContent';
import helpers from '../../utils/helpers';
import envConfig from '../../config/environment';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin : false,
      username: '',
      userPhotoUrl: ''
    };
  }
  isLoginCheck() {
    if (window.sessionStorage.ahAccessToken) {
      this.setState({
        isLogin: true
      });
    }
    else {
      this.setState({
        isLogin: false
      });
    }
  }
  // managing header background color on scroll
  scrollHeight() {
    const headerBar = document.getElementById('headerBar');
    const headerBgColorThreshold = 580;
    const documentScrollPosition = document.documentElement.scrollTop;
    if (documentScrollPosition >= headerBgColorThreshold) {
      headerBar.classList.add("nav-white");
      headerBar.classList.remove("nav-grey");
    }
    else {
      headerBar.classList.add("nav-grey");
      headerBar.classList.remove("nav-white");
    }
  }
  // display and hide elements based on login state
  loginElementToggle(preLoginElement, postLoginElement) {
    return this.state.isLogin ? postLoginElement : preLoginElement;
  }
  postLogoutAction() {
    sessionStorage.removeItem('ahAccessToken');
    sessionStorage.removeItem('ahUserName');
    sessionStorage.removeItem('ahUserPhotoUrl');
    this.props.navigateTo('/');
  }
  // logout action
  logout() {
    this.props.showPageLoaderFromChild(true);
    helpers.callService('api/logout', 'get', {token: window.sessionStorage.ahAccessToken})
    .then((data) => {
      this.props.showPageLoaderFromChild(false);
      let responseData = data.section.data;
      if (responseData.success) {
        this.postLogoutAction();
      }
    });
  }
  displayUsername() {
    if (window.sessionStorage.ahUserName) {
      this.setState({
        username: window.sessionStorage.ahUserName
      });
    }
  }
  setUserPhotoUrl() {
    if (window.sessionStorage.ahUserPhotoUrl) {
      if(window.sessionStorage.ahUserPhotoUrl !== "") {
        this.setState({
          userPhotoUrl: window.sessionStorage.ahUserPhotoUrl
        });
      }
    }
    else {
      let envURL = envConfig() + "images/user-photos/login-user-default.png";
      this.setState({
        userPhotoUrl: envURL
      });
    }
  }
  menuHighlighter() {
    let routeName = this.props.history.location.pathname || null;
    routeName = routeName.replace(/\//g, '');
    const menuElem = document.getElementById(routeName);
    const navNoOutlineBtn = document.getElementsByClassName("nav-no-outline-btn");
    
    // house keeping - remove active class from all the text buttons
    for(let i = 0; i < navNoOutlineBtn.length; i++) {
      if(navNoOutlineBtn) {
        navNoOutlineBtn[i].classList.remove("active");
      }
    }
    
    // append active class to the current page
    if(menuElem) {
      menuElem.classList.add("active");
    }
  }
  // component lifecycles
  componentWillReceiveProps() {
    this.isLoginCheck();
    this.displayUsername();
    this.setUserPhotoUrl();
    this.menuHighlighter();
  }
  // load the scroll function after Component DOM load
  componentDidMount() {
    window.addEventListener('scroll', this.scrollHeight);
    this.isLoginCheck();
    this.displayUsername();
    this.setUserPhotoUrl();
    this.menuHighlighter();
  }
  // render the component
  render() {
    return (
      <div>
        <Modal title="Login to Arkihive" id="loginModal">
          <ModalLoginContent navigateTo={this.props.navigateTo} showPageLoaderFromChild={this.props.showPageLoaderFromChild} />
        </Modal>
        <Modal title="Register in Arkihive" id="registerModal">
          <ModalRegisterContent showPageLoaderFromChild={this.props.showPageLoaderFromChild} />
        </Modal>
        <Modal title="Forgot your Password" id="forgotPasswordModal">
          <ModalForgotPasswordContent showPageLoaderFromChild={this.props.showPageLoaderFromChild} />
        </Modal>
        <nav id="headerBar" className="navbar navbar-default navbar-fixed-top" role="navigation">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand"><img src={require('../../images/arkihive-logo.svg')} /></Link>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/getinspired"><button type="button" id="getinspired" className="btn btn-no-outline nav-no-outline-btn">Get Inspired</button></Link>
              </li>
              <li>
                  {this.loginElementToggle(
                    <a><button type="button" id="professionalshive" className="btn btn-no-outline nav-no-outline-btn">Professionals Hive</button></a>,
                    <a><button type="button" id="professionals" className="btn btn-no-outline nav-no-outline-btn">Professionals</button></a>
                  )}
              </li>
              <li>
                {this.loginElementToggle(
                  <a><button type="button" href="#loginModal" data-toggle="modal" className="btn btn-outline-dark">Login In</button></a>,
                  <a><button type="button" href="#" id="project" className="btn btn-no-outline nav-no-outline-btn">Project</button></a>
                )}
              </li>
              <li>
                {this.loginElementToggle(
                  <a><button type="button" href="#registerModal" data-toggle="modal" className="btn btn-outline-dark">Sign Up</button></a>,
                  <div className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown">
                      <img width="36" className="img-circle login-user-photo" src={this.state.userPhotoUrl} />
                    </a>
                    <ul className="dropdown-menu login-user">
                      <li className="user-info-block">
                        <div className="user-info-label">Logged in as</div>
                        <div className="user-info-content">{this.state.username}</div>
                      </li>
                      <li><a>Profile</a></li>
                      <li><a onClick={this.logout.bind(this)}>Logout</a></li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
};

export default Header;

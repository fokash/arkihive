import React from 'react';
import Modal from './Modal';
import ModalLoginContent from '../modalContents/ModalLoginContent';
import ModalRegisterContent from '../modalContents/ModalRegisterContent';
import helpers from '../../utils/helpers';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin : false
    };
  }
  isLoginCheck() {
    if (window.sessionStorage.accessToken) {
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
  // logout action
  logout() {
    let requestObject = {
      token: window.sessionStorage.accessToken
    };
    helpers.getHomepageData('logout', 'get', requestObject)
    .then((data) => {
        let responseData = data.section.data;
        if (responseData.success) {
            sessionStorage.removeItem('accessToken');
            this.props.navigateTo('/');
        }
    });
  }
  // component lifecycles
  componentWillReceiveProps() {
    this.isLoginCheck();
  }
  // load the scroll function after Component DOM load
  componentDidMount() {
    window.addEventListener('scroll', this.scrollHeight);
    this.isLoginCheck();
  }
  // render the component
  render() {
    return (
      <div>
        <Modal title="Login to Arkihive" id="loginModal">
          <ModalLoginContent navigateTo={this.props.navigateTo} />
        </Modal>
        <Modal title="Register in Arkihive" id="registerModal">
          <ModalRegisterContent />
        </Modal>
        <nav id="headerBar" className="navbar navbar-default navbar-fixed-top" role="navigation">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#"><img src={require('../../images/arkihive-logo.svg')} /></a>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a><button type="button" className="btn btn-no-outline">Get Inspired</button></a>
              </li>
              <li>
                  {this.loginElementToggle(
                    <a><button type="button" className="btn btn-no-outline">Professionals Hive</button></a>,
                    <a><button type="button" className="btn btn-no-outline">People</button></a>
                  )}
              </li>
              <li>
                {this.loginElementToggle(
                  <a><button type="button" href="#loginModal" data-toggle="modal" className="btn btn-outline-dark">Login In</button></a>,
                  <a><button type="button" href="#" className="btn btn-no-outline active">Project</button></a>
                )}
              </li>
              <li>
                {this.loginElementToggle(
                  <a><button type="button" href="#registerModal" data-toggle="modal" className="btn btn-outline-dark">Sign Up</button></a>,
                  <div className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown">
                      <img width="36" className="img-circle login-user-photo" src={"http://localhost:4000/images/user-photos/login-user.jpg"} />
                    </a>
                    <ul className="dropdown-menu login-user">
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

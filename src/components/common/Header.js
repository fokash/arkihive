import React from 'react';
import Modal from './Modal';
import ModalLoginContent from '../modalContents/ModalLoginContent';
import ModalRegisterContent from '../modalContents/ModalRegisterContent';

class Header extends React.Component {
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
  // load the scroll function after Component DOM load
  componentDidMount() {
    window.addEventListener('scroll', this.scrollHeight);
  }
  // render the component
  render() {
    return (
      <div>
        <Modal title="Login to Arkihive" id="loginModal">
          <ModalLoginContent />
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
            <a className="navbar-brand" href="#"><img src={require('../../images/arkihive-logo.png')} /></a>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li><a><button type="button" className="btn btn-no-outline">Get Inspired</button></a></li>
              <li><a><button type="button" className="btn btn-no-outline">Professionals Hive</button></a></li>
              <li><a><button type="button" href="#loginModal" data-toggle="modal" className="btn btn-outline-dark">Login In</button></a></li>
              <li><a><button type="button" href="#registerModal" data-toggle="modal" className="btn btn-outline-dark">Sign Up</button></a></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
};

export default Header;

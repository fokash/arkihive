import React from 'react';

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
      <nav id="headerBar" className="navbar navbar-default navbar-fixed-top container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#"><img src={require('../../images/arkihive-logo.png')} /></a>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            <li><a><button type="button" className="btn btn-no-outline">Get Inspired</button></a></li>
            <li><a><button type="button" className="btn btn-outline-dark">Professionals Hire</button></a></li>
            <li><a><button type="button" className="btn btn-outline-dark">Sign In</button></a></li>
          </ul>
        </div>
      </nav>
    );
  }
};

export default Header;

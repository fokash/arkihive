import React from 'react';
import $ from 'jquery';

class Header extends React.Component {
  scrollHeight() {
    const myNav = document.getElementById('mynav');
    window.onscroll = function () {
        "use strict";
        if (document.body.scrollTop >= 200 ) {
            myNav.classList.add("nav-grey");
            myNav.classList.remove("nav-white");
        }
        else {
            myNav.classList.add("nav-white");
            myNav.classList.remove("nav-grey");
        }
    };
  }
  componentDidMount() {
    this.scrollHeight();
  }
  render() {
    return (
      <nav id="mynav" className="navbar navbar-default navbar-fixed-top container-fluid">
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

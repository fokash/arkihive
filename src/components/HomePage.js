import React from 'react';
import {Link} from 'react-router-dom';
import Header from './common/Header';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="homepage-content">
          <div className="get-started">
            <div className="row get-started-text">
              <div className="col-lg-1"></div>
              <div className="col-lg-10">
                <p style={{fontFamily: 'Roboto'}} className="get-started-small-text">lets connect & build together</p>
                <p className="get-started-big-text">Are you looking to design your house?</p>
                <p><a><button type="button" className="btn btn-primary">GET STARTED</button></a></p>
              </div>
              <div className="col-lg-1"></div>
            </div>
            <div className="row get-started-projects">
              <p className="col-lg-2"><a href="#"><img src={require('../images/homepage-pot-1.png')} /></a></p>
              <p className="col-lg-2"><a href="#"><img src={require('../images/homepage-pot-2.png')} /></a></p>
              <p className="col-lg-2"><a href="#"><img src={require('../images/homepage-pot-3.png')} /></a></p>
              <p className="col-lg-2"><a href="#"><img src={require('../images/homepage-pot-4.png')} /></a></p>
              <p className="col-lg-2"><a href="#"><img src={require('../images/homepage-pot-5.png')} /></a></p>
            </div>
          </div>
          <h1>and...</h1>
          <h1>and...</h1>
          <h1>and...</h1>
          <h1>and...</h1>
          <h1>and...</h1>
          <h1>and...</h1>
        </div>
      </div>
    );
  }
}

export default HomePage;

import React from 'react';

class GetStarted extends React.Component {
  // render the component
  render() {
    return (
      <div className="get-started">
        <div className="row get-started-text">
          <div className="col-lg-1"></div>
          <div className="col-lg-10">
            <p className="get-started-small-text">lets connect & build together</p>
            <p className="big-text">Are you looking to design your house?</p>
            <p><a><button type="button" className="btn btn-primary">GET STARTED</button></a></p>
          </div>
          <div className="col-lg-1"></div>
        </div>
        <div className="container-fluid">
          <div className="row get-started-projects">
            <p className="col"><a href="#"><img src={require('../../images/homepage-pot-1.png')} /></a></p>
            <p className="col"><a href="#"><img src={require('../../images/homepage-pot-2.png')} /></a></p>
            <p className="col"><a href="#"><img src={require('../../images/homepage-pot-3.png')} /></a></p>
            <p className="col"><a href="#"><img src={require('../../images/homepage-pot-4.png')} /></a></p>
            <p className="col"><a href="#"><img src={require('../../images/homepage-pot-5.png')} /></a></p>
          </div>
        </div>
      </div>
    );
  }
}

export default GetStarted;

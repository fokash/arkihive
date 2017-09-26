import React from 'react';
import {Link} from 'react-router-dom';
import Header from './common/Header';
import GetStarted from './homePage/GetStarted';
import Steps from './homePage/Steps';
import Hexagon from './common/Hexagon';

class HomePage extends React.Component {
  // render the component
  render() {
    return (
      <div>
        <Header />
        <div className="homepage-content">
          <GetStarted />
          <div className="horizontal-component-spacer"></div>
          <Steps />
          <div className="horizontal-component-spacer"></div>
          <div className="how-it-works">
            <Hexagon />
            <Hexagon />
            <Hexagon />
            <div className="row how-title">
              <p className="col-lg-10 col-lg-offset-1 big-text">How it works?</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;

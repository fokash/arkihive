import React from 'react';
import {Link} from 'react-router-dom';
import Header from './common/Header';
import GetStarted from './homePage/GetStarted';
import Steps from './homePage/Steps';
import HowItWorks from './homePage/HowItWorks';
import Hexagon from './common/Hexagon';
import ClientSay from './homePage/ClientSay';

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
          <HowItWorks />
          <div className="horizontal-component-spacer"></div>
          <ClientSay />
        </div>
      </div>
    );
  }
}

export default HomePage;

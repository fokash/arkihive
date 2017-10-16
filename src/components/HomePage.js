import React from 'react';
import {Link} from 'react-router-dom';
import Header from './common/Header';
import GetStarted from './homePage/GetStarted';
import Steps from './homePage/Steps';
import HowItWorks from './homePage/HowItWorks';
import Hexagon from './common/Hexagon';
import ClientSay from './homePage/ClientSay';
import Footer from './common/footer';

class HomePage extends React.Component {
  // render the component
  render() {
    return (
      <div className="homepage">
        <Header />
        <div className="homepage-content">
          <GetStarted />
          <div className="horizontal-component-spacer"></div>
          <Steps />
          <div className="horizontal-component-spacer"></div>
          <HowItWorks />
          <div className="horizontal-component-spacer"></div>
          <ClientSay />
          <div className="horizontal-component-spacer"></div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default HomePage;

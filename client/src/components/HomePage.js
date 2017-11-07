import React from 'react';
import GetStarted from './homePage/GetStarted';
import Steps from './homePage/Steps';
import HowItWorks from './homePage/HowItWorks';
import Hexagon from './common/Hexagon';
import ClientSay from './homePage/ClientSay';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  // render the component
  render() {
    return (
      <div className="homepage">
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
      </div>
    );
  }
}

export default HomePage;

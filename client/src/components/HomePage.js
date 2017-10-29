import React from 'react';
import {Link} from 'react-router-dom';
import Header from './common/Header';
import GetStarted from './homePage/GetStarted';
import Steps from './homePage/Steps';
import HowItWorks from './homePage/HowItWorks';
import Hexagon from './common/Hexagon';
import ClientSay from './homePage/ClientSay';
import Footer from './common/footer';
import navigation from '../utils/navigation';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.navigateTo = this.navigateTo.bind(this);
  }
  navigateTo(routeName) {
    navigation(routeName, this.props);
  }
  // render the component
  render() {
    return (
      <div className="homepage">
        <Header navigateTo={this.navigateTo} />
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

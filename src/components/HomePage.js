import React from 'react';
import {Link} from 'react-router-dom';
import Header from './common/Header';
import GetStarted from './homePage/GetStarted';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="homepage-content">
          <GetStarted />
          <div className="horizontal-component-spacer"></div>
          <div className="arkihive-steps">
            <div className="row">
              <p className="col-lg-10 col-lg-offset-1 arkihive-steps-description1">Arkihive is a unique platform to collaborate with architects, designers, contractors, and suppliers for your constructional needs</p>
            </div>
            <div className="row arkihive-steps-hexagon">
              <div className="col-lg-4 hexagon">
                <div>
                  <p className="hexagon-top"></p>
                  <p className="hexagon-middle"></p>
                  <p className="hexagon-bottom"></p>
                </div>
              </div>
              <div className="col-lg-4 hexagon">
                <div>
                  <p className="hexagon-top"></p>
                  <p className="hexagon-middle"></p>
                  <p className="hexagon-bottom"></p>
                </div>
              </div>
              <div className="col-lg-4 hexagon">
                <div>
                  <p className="hexagon-top"></p>
                  <p className="hexagon-middle"></p>
                  <p className="hexagon-bottom"></p>
                </div>
              </div>
            </div>
            <div className="row">
              <p className="col-lg-10 col-lg-offset-1 arkihive-steps-description2">Streamline all your constructional needs online!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;

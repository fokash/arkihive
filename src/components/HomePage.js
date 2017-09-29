import React from 'react';
import {Link} from 'react-router-dom';
import Header from './common/Header';
import GetStarted from './homePage/GetStarted';
import Steps from './homePage/Steps';
import Hexagon from './common/Hexagon';
import {PathLine} from 'react-svg-pathline';

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
            <svg>
              <PathLine points={[{x:165, y:0}, {x:165, y:95}, {x:222, y:132}]} stroke="#00d563" strokeWidth="2" fill="none" r={2} />
              <PathLine points={[{x:222, y:132}, {x:222, y:160}, {x:717, y:160}]} stroke="#00d563" strokeWidth="2" fill="none" r={15} />
              <PathLine points={[{x:717, y:160}, {x:787, y:200}]} stroke="#00d563" strokeWidth="2" fill="none" r={2} />
              <PathLine points={[{x:787, y:200}, {x:840, y:170}, {x:840, y:385}]} stroke="#00d563" strokeWidth="2" fill="none" r={40} />
              <PathLine points={[{x:840, y:385}, {x:735, y:448}]} stroke="#00d563" strokeWidth="2" fill="none" r={2} />
              <PathLine points={[{x:735, y:448}, {x:735, y:480}, {x:46, y:480}, {x:46, y:675}]} stroke="#00d563" strokeWidth="2" fill="none" r={15} />
            </svg>
            <div className="workflow-contents">
              <div className="workflow-step">
                <div className="number-circle">1</div>
                <h3>Post your Requirements</h3>
                <p>Arkihive is a unique platform to collaborate with architects, designers, contractors</p>
              </div>
              <div className="workflow-step">
                <div className="number-circle">2</div>
                <h3>Choose the Professionals</h3>
                <p>Arkihive is a unique platform to collaborate with architects, designers, contractors</p>
              </div>
              <div className="workflow-step">
                <div className="number-circle">3</div>
                <h3>Evaluate Proposals</h3>
                <p>Arkihive is a unique platform to collaborate with architects, designers, contractors</p>
              </div>
              <div className="workflow-step">
                <div className="number-circle">4</div>
                <h3>Manage your Projects</h3>
                <p>Arkihive is a unique platform to collaborate with architects, designers, contractors</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;

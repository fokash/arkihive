import React from 'react';
import Hexagon from '../common/Hexagon';

class Steps extends React.Component {
  // managing steps hive section animation on scroll
  animateStepsOnScroll() {
    let executed = false;
    window.onscroll = () => {
      const hiveElement = document.getElementsByName('steps')[0];
      const elementScrollPosition = parseInt(hiveElement.getBoundingClientRect().top - 200);
      const documentScrollPosition = document.documentElement.scrollTop;
      const hive1 = hiveElement.querySelector('#hive1');
      const hive2 = hiveElement.querySelector('#hive2');
      const hive3 = hiveElement.querySelector('#hive3');
      if(!executed){
        if (documentScrollPosition >= elementScrollPosition) {
            executed = true;
            hive1.classList.add("hive-animate-left");
            hive2.classList.add("hive-animate-center");
            hive3.classList.add("hive-animate-right");
        }
      }
    };
  }
  // load the scroll function after Component DOM load
  componentDidMount() {
    this.animateStepsOnScroll();
  }
  // render the component
  render() {
    return (
      <div className="arkihive-steps">
        <div className="row">
          <p className="col-lg-10 col-lg-offset-1 arkihive-steps-description1">Arkihive is a unique platform to collaborate with architects, designers, contractors, and suppliers for your constructional needs</p>
        </div>
        <div className="row">
          <p className="col-lg-10 col-lg-offset-1 big-text">Streamline all your constructional needs online!</p>
        </div>
        <div className="row arkihive-steps-hive" name="steps">
          <div className="col-lg-4 hive hive1" id="hive1">
            <Hexagon />
            <div className="hive-content">
              <p className="hive-graphic"><img width="60" src={require('../../images/step1-ruler-pencil-line.png')} /></p>
              <p className="hive-shadow"></p>
              <p className="hive-text">Design your Space</p>
            </div>
          </div>
          <div className="col-lg-4 hive hive2" id="hive2">
            <div className="hive-wrapper">
              <p className="hive-top"></p>
              <p className="hive-middle"></p>
              <p className="hive-bottom"></p>
            </div>
            <div className="hive-content">
              <p className="hive-graphic"><img width="60" src={require('../../images/step2-truck-line.png')} /></p>
              <p className="hive-shadow"></p>
              <p className="hive-text">Purchase the Materials</p>
            </div>
          </div>
          <div className="col-lg-4 hive hive3" id="hive3">
            <div className="hive-wrapper">
              <p className="hive-top"></p>
              <p className="hive-middle"></p>
              <p className="hive-bottom"></p>
            </div>
            <div className="hive-content">
              <p className="hive-graphic"><img width="60" src={require('../../images/step3-building-line.png')} /></p>
              <p className="hive-shadow"></p>
              <p className="hive-text">Execute the Design</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Steps;

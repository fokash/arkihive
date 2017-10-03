import React from 'react';
import {PathLine} from 'react-svg-pathline';
import Hexagon from '../common/Hexagon';

class HowItWorks extends React.Component {
    // managing workflow animation on scroll
    animateWorkflowOnScroll() {
        const worksflowElement = document.getElementsByName('workflow')[0];
        const workflowScrollPosition = parseInt(worksflowElement.getBoundingClientRect().top + 500);
        const documentScrollPosition = document.documentElement.scrollTop;
        if (documentScrollPosition >= workflowScrollPosition) {
            worksflowElement.classList.add("workflow-animate");
        }
    }
    // load the scroll function after Component DOM load
    componentDidMount() {
        window.addEventListener('scroll', this.animateWorkflowOnScroll);
    }
    // render the component
    render() { 
        return (
            <div className="how-it-works" name="workflow">
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <div className="row how-title">
                    <p className="col-lg-10 col-lg-offset-1 big-text">How it works?</p>
                </div>
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
        );
    }
}
 
export default HowItWorks;
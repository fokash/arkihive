import React from 'react';
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
                <div className="section-content-width">
                    <Hexagon />
                    <Hexagon />
                    <Hexagon />
                    <div className="row how-title">
                        <p className="col-lg-10 col-lg-offset-1 big-text">How it works?</p>
                    </div>
                    <div className="workflow-contents">
                        <div className="row">
                            <div className="workflow-line col-xs-12 col-sm-3 col-md-4 col-lg-4">
                                <p>
                                    <img width="32" src={require('../../images/icon-mail.svg')} />
                                    <img width="32" src={require('../../images/icon-mail-selected.svg')} />
                                    <img width="32" src={require('../../images/icon-mail.svg')} />
                                </p>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-5 col-lg-5 col-sm-offset-1 col-lg-offset-1">
                                <div className="workflow-step">
                                    <h3>Post your Requirements</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="workflow-line col-xs-12 col-sm-3 col-md-4 col-lg-4">
                                <p>
                                    <img width="32" src={require('../../images/icon-account.svg')} />
                                    <img width="32" src={require('../../images/icon-account.svg')} />
                                    <img width="32" src={require('../../images/icon-account-selected.svg')} />
                                    <img width="32" src={require('../../images/icon-account.svg')} />
                                </p>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-5 col-lg-5 col-sm-offset-1 col-lg-offset-1">
                                <div className="workflow-step">
                                    <h3>Choose the Professionals</h3>
                                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="workflow-line col-xs-12 col-sm-3 col-md-4 col-lg-4">
                                <p className="evaluate-proposals">
                                    <img width="32" src={require('../../images/icon-list.svg')} />
                                    <img width="32" src={require('../../images/icon-list.svg')} />
                                    <img width="32" src={require('../../images/icon-list-selected.svg')} />
                                    <img width="32" src={require('../../images/icon-list.svg')} />
                                    <img width="32" src={require('../../images/icon-list.svg')} />
                                </p>
                                <p className="evaluate-proposals">
                                    <img width="32" src={require('../../images/icon-list.svg')} />
                                    <img width="32" src={require('../../images/icon-list.svg')} />
                                    <img width="32" src={require('../../images/icon-list.svg')} />
                                </p>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-5 col-lg-5 col-sm-offset-1 col-lg-offset-1">
                                <div className="workflow-step">
                                    <h3>Evaluate Proposals</h3>
                                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="workflow-line col-xs-12 col-sm-3 col-md-4 col-lg-4">
                                <p className="manage-projects">
                                    <img width="32" src={require('../../images/icon-check.svg')} />
                                </p>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-5 col-lg-5 col-sm-offset-1 col-lg-offset-1">
                                <div className="workflow-step">
                                    <h3>Manage your Projects</h3>
                                    <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
        );
    }
}
 
export default HowItWorks;
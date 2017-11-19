import React, {Component} from 'react';
import PersonaInfo from '../common/PersonaInfo';

export class UserProjectDetails extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return ( 
            <div className="user-project-section">
                <div className="section-content-width">
                    <h2 className="page-section-heading">Project</h2>
                    <div className="row user-project" data-image-url="./images/blue-red-furniture.jpg">
                        <div className="col-xs-6 col-sm-7 col-md-5 col-lg-5 user-project-desciption">
                            <h3>New Home: Build my dream house</h3>
                            <p className="user-project-location">Bommanahalli, Begur Main Road, Bengaluru 5600107</p>
                            <p className="user-project-comments">Description of the new house. Arkihive is a unique platform to collaborate with architects, designers, contractors.</p>
                            <div className="row user-selected-professionals">
                                <div className="col-xs-12 col-sm-5 col-md-6 col-lg-6"><PersonaInfo imageLocation="client-photos/client-photo-1.jpg" personaName="Madhavan" personaRole="Architect" /></div>
                                <div className="col-xs-12 col-sm-5 col-md-6 col-lg-6"><PersonaInfo imageLocation="client-photos/client-photo-2.jpg" personaName="Sivanand" personaRole="Lift Specialist" /></div>
                            </div>
                            <button>VIEW DETAILS</button>
                        </div>
                        <div className="col-xs-4 col-sm-offset-1 col-sm-4 col-md-offset-0 col-md-5 col-lg-4 user-project-workflow-content">
                            <ul className="workflow-content">
                                <li><img src={require('../../images/icon-checked-selected.svg')} />Post Requirements</li>
                                <li><img src={require('../../images/icon-checked-selected.svg')} />Choose Professionals</li>
                                <li><img src={require('../../images/icon-checked-selected.svg')} />Evaluate Proposals</li>
                                <li><img src={require('../../images/icon-checked-active.svg')} />Manage Project</li>
                                <li><img src={require('../../images/icon-checked-unselected.svg')} />Complete Project</li>
                            </ul>
                        </div>
                        <div className="hidden-xs hidden-sm user-project-workflow-shape"></div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default UserProjectDetails;
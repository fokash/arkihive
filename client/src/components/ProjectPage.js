import React, {Component} from 'react';
import navigation from '../utils/navigation';
import UserProjectDetails from './projectPage/userProjectDetails';
import ShowcaseTile from './common/ShowcaseTile';

class ProjectPage extends Component {
    constructor(props) {
        super(props);
        this.navigateTo = this.navigateTo.bind(this);
    }
    navigateTo(routeName) {
        this.setState({
            loginCheck: true
        });
        navigation(routeName, this.props);
    }
    render() {
        return (
            <div className="projectpage-content">
                <UserProjectDetails />
                <div className="horizontal-component-spacer minimum-spacer"></div>
                <div className="get-inspired-section">
                    <div className="section-content-width">
                        <h2 className="page-section-heading">Get Inspired</h2>
                        <div className="row get-inspired">
                            <div className="col-lg-4">
                                <ShowcaseTile 
                                    tileImageURL="get-inspired/1.jpg" 
                                    likeCount="22" 
                                    imageLocation="client-photos/client-photo-1.jpg"
                                    personaName="Madhavan"
                                    personaRole="Architect"
                                    likeStatus="false"
                                />
                            </div>
                            <div className="col-lg-4">
                                <ShowcaseTile 
                                    tileImageURL="get-inspired/2.jpg" 
                                    likeCount="22" 
                                    imageLocation="client-photos/client-photo-2.jpg"
                                    personaName="Madhavan"
                                    personaRole="Architect"
                                    likeStatus="false"
                                />
                            </div>
                            <div className="col-lg-4">
                                <ShowcaseTile 
                                    tileImageURL="get-inspired/3.jpg" 
                                    likeCount="22" 
                                    imageLocation="client-photos/client-photo-3.jpg"
                                    personaName="Madhavan"
                                    personaRole="Architect"
                                    likeStatus="false"
                                />
                            </div>
                            <div className="col-lg-4">
                                <ShowcaseTile 
                                    tileImageURL="get-inspired/4.jpg" 
                                    likeCount="22" 
                                    imageLocation="client-photos/client-photo-4.jpg"
                                    personaName="Madhavan"
                                    personaRole="Architect"
                                    likeStatus="false"
                                />
                            </div>
                            <div className="col-lg-4">
                                <ShowcaseTile 
                                    tileImageURL="get-inspired/5.jpg" 
                                    likeCount="22" 
                                    imageLocation="client-photos/client-photo-5.jpg"
                                    personaName="Madhavan"
                                    personaRole="Architect"
                                    likeStatus="false"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectPage;

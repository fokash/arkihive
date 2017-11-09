import React, {Component} from 'react';
import navigation from '../utils/navigation';
import UserProjectDetails from './projectPage/userProjectDetails';
import GetInspired from './projectPage/GetInspired';

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
                <GetInspired />
            </div>
        );
    }
}

export default ProjectPage;

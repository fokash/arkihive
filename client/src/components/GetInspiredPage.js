import React, {Component} from 'react';
import navigation from '../utils/navigation';
import GetInspired from './common/GetInspired';

class GetInspiredPage extends Component {
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
            <div className="getinspired-content">
                <GetInspired />
            </div>
        );
    }
}

export default GetInspiredPage;
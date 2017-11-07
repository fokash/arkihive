import React, {Component} from 'react';
import {Router} from 'react-router-dom';
import Routes from './config/routes';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import navigation from './utils/navigation';
import history from './utils/history';

export class App extends Component {
    constructor(props) {
        super(props);
        this.navigateTo = this.navigateTo.bind(this);
    }
    navigateTo(routeName) {
        navigation(routeName, history);
    }
    render() { 
        return (
            <Router history={history}> 
                <div>
                    <Header navigateTo={this.navigateTo} />
                    <Routes/>
                    <Footer />
                </div>
            </Router>
        );
    }
}
 
export default App;

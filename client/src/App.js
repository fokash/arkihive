import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import Routes from './config/routes';
import Loader from './components/common/Loader';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import navigation from './utils/navigation';
import history from './utils/history';

export class App extends Component {
    constructor(props) {
        super(props);
        this.navigateTo = this.navigateTo.bind(this);
        this.showPageLoaderFromChild = this.showPageLoaderFromChild.bind(this);
        this.state = {
            showPageLoader: true
        };
    }
    navigateTo(routeName) {
        navigation(routeName, history);
    }
    initialloaderControl() {
        setTimeout(() => {
            this.setState({
                showPageLoader: false
            });
        }, 500);
    }
    showPageLoaderFromChild(value) {
        this.setState({
            showPageLoader: value
        });
    }
    componentDidMount() {
        this.initialloaderControl();
    }
    render() { 
        return (
            <Router history={history}> 
                <div>
                    <Loader showLoader={this.state.showPageLoader} type="page" />
                    <Header history={history} navigateTo={this.navigateTo} showPageLoaderFromChild={this.showPageLoaderFromChild} />
                    <Routes />
                    <Footer />
                </div>
            </Router>
        );
    }
}
 
export default App;

import React, {Component} from 'react';
import Logo from '../common/Logo';

export class Loader extends Component {
    constructor(props) {
        super(props);
    }
    hideLoaderOverlay() {
        return this.props.showLoader 
            ? (this.props.type !== "component") 
                ? "show-loader" 
                : "hide-component-loader"
            : "hide-loader";
    }
    hideLoaderContent() {
        return this.props.showLoader 
            ? (this.props.type === "component") 
                ? "show-component-loader" 
                : "show-loader"
            : "hide-loader";
    }
    render() { 
        return ( 
            <div className="loader">
                <div className={`loader-overlay ${this.hideLoaderOverlay()}`}></div>
                <div className={`loader-content ${this.hideLoaderContent()}`}>
                    <Logo />
                </div>
            </div>
         );
    }
}
 
export default Loader;
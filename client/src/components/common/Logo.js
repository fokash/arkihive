import React, {Component} from 'react';

export class Logo extends Component {
    render() { 
        return ( 
            <div className="logo">
                <div className="logo-hexagon"></div>
                <div className="logo-triangle"></div>
                <div className="logo-stroke-black"></div>
                <div className="logo-stroke-grey"></div>
            </div>
         );
    }
}
 
export default Logo;
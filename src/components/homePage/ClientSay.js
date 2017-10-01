import React from 'react';
import Hexagon from '../common/Hexagon';

class ClientSay extends React.Component {
    render() { 
        return (
            <div className="client-say" name="clientsay">
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <div className="row how-title">
                <p className="col-lg-10 col-lg-offset-1 big-text">Client say!</p>
                </div>
                <div className="client-say-content">
                <div className="row">
                    <div className="col-lg-6">
                    <div className="col-lg-3 col-lg-offset-1 client-photo"><img className="img-circle" src={require('../../images/client-say/steve-jobs.jpg')} /></div>
                    <div className="col-lg-8">
                        <p className="client-say-name">Steve Jobs</p>
                        <p className="client-say-location">San Francisco, CA</p>
                        <p className="client-say-comment">Happy to see you again and again the commitment and dedication on your part with the communities. Best wishes!</p>
                    </div>
                    </div>
                    <div className="col-lg-6">
                    <div className="col-lg-3 client-photo"><img className="img-circle" src={require('../../images/client-say/bill-gates.jpg')} /></div>
                    <div className="col-lg-8">
                        <p className="client-say-name">Bill Gates</p>
                        <p className="client-say-location">Seattle, WA</p>
                        <p className="client-say-comment">Happy to see you again and again the commitment and dedication on your part with the communities. Best wishes!</p>
                    </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                    <div className="col-lg-3 col-lg-offset-1 client-photo"><img className="img-circle" src={require('../../images/client-say/elon-musk.jpg')} /></div>
                    <div className="col-lg-8">
                        <p className="client-say-name">Elon Musk</p>
                        <p className="client-say-location">Los Angeles, CA</p>
                        <p className="client-say-comment">Happy to see you again and again the commitment and dedication on your part with the communities. Best wishes!</p>
                    </div>
                    </div>
                    <div className="col-lg-6">
                    <div className="col-lg-3 client-photo"><img className="img-circle" src={require('../../images/client-say/mark-zuckerberg.jpg')} /></div>
                    <div className="col-lg-8">
                        <p className="client-say-name">Mark Zuckerberg</p>
                        <p className="client-say-location">White Plains, NY</p>
                        <p className="client-say-comment">Happy to see you again and again the commitment and dedication on your part with the communities. Best wishes!</p>
                    </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                    <div className="col-lg-3 col-lg-offset-1 client-photo"><img className="img-circle" src={require('../../images/client-say/larry-page.jpg')} /></div>
                    <div className="col-lg-8">
                        <p className="client-say-name">Larry Page</p>
                        <p className="client-say-location">Palo Alto, CA</p>
                        <p className="client-say-comment">Happy to see you again and again the commitment and dedication on your part with the communities. Best wishes!</p>
                    </div>
                    </div>
                    <div className="col-lg-6">
                    <div className="col-lg-3 client-photo"><img className="img-circle" src={require('../../images/client-say/sergey-brin.jpg')} /></div>
                    <div className="col-lg-8">
                        <p className="client-say-name">Sergey brin</p>
                        <p className="client-say-location">Los Altos, CA</p>
                        <p className="client-say-comment">Happy to see you again and again the commitment and dedication on your part with the communities. Best wishes!</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}
 
export default ClientSay;
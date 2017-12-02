import React, {Component} from 'react';
import ShowcaseTile from './ShowcaseTile';

export class GetInspired extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return (
            <div className="get-inspired-section">
                <div className="section-content-width">
                    <h2 className="page-section-heading">Get Inspired</h2>
                    <div className="row get-inspired">
                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                            <ShowcaseTile 
                                tileImageURL="get-inspired/1.jpg" 
                                likeCount="22" 
                                imageLocation="client-photos/client-photo-1.jpg"
                                personaName="Madhavan"
                                personaRole="Architect"
                                likeStatus="false"
                            />
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                            <ShowcaseTile 
                                tileImageURL="get-inspired/2.jpg" 
                                likeCount="5" 
                                imageLocation="client-photos/client-photo-2.jpg"
                                personaName="Madhavan"
                                personaRole="Architect"
                                likeStatus="true"
                            />
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                            <ShowcaseTile 
                                tileImageURL="get-inspired/3.jpg" 
                                likeCount="12" 
                                imageLocation="client-photos/client-photo-3.jpg"
                                personaName="Madhavan"
                                personaRole="Architect"
                                likeStatus="false"
                            />
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                            <ShowcaseTile 
                                tileImageURL="get-inspired/4.jpg" 
                                likeCount="16" 
                                imageLocation="client-photos/client-photo-4.jpg"
                                personaName="Madhavan"
                                personaRole="Architect"
                                likeStatus="true"
                            />
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                            <ShowcaseTile 
                                tileImageURL="get-inspired/5.jpg" 
                                likeCount="2" 
                                imageLocation="client-photos/client-photo-5.jpg"
                                personaName="Madhavan"
                                personaRole="Architect"
                                likeStatus="false"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default GetInspired;
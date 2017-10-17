import React from 'react';
import Hexagon from '../common/Hexagon';
import Slider from 'react-slick';
import helpers from '../../utils/helpers';

class ClientSay extends React.Component {
    constructor() {
        super();
        this.state = {
            clientSay: []
        };
    }
    componentWillMount() {
        helpers.getHomepageData('clientSay')
            .then((data) => {
                this.setState({
                    'clientSay': data.section.data
                });
            });
    }
    render() {
        const sliderSettings = {
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            responsive: [{
                breakpoint: 992,
                settings: {
                  dots: true,
                  arrows: false,
                  swipeToSlide: true
                }
            },
            {
              breakpoint: 1200,
              settings: {
                dots: false,
                arrows: true,
                swipeToSlide: false
              }
            }]
        };
        return (
            <div className="client-say" name="clientsay">
                <div className="section-content-width">
                    <div className="row how-title">
                        <p className="col-lg-10 col-lg-offset-1 big-text">What our client say!</p>
                    </div>
                    <div className="client-say-content">
                        <Slider {...sliderSettings}>
                            {this.state.clientSay.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <div className="client-slide">
                                            <div className="client-say-comment">{item.comment}</div>
                                            <div className="client-photo">
                                                <img width="75" className="img-circle" src={require('../../images/client-say/' + (index+1) + '.jpg')} />
                                                <p>
                                                    <span className="client-say-name">{item.name}</span>
                                                    <span className="client-say-location">{item.location}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default ClientSay;
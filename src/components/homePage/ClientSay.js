import React from 'react';
import Hexagon from '../common/Hexagon';
import Slider from 'react-slick';

class ClientSay extends React.Component {
    render() {
        const sliderSettings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true
        };
        return (
            <div className="client-say" name="clientsay">
                <div className="section-content-width">
                    <div className="row how-title">
                        <p className="col-lg-10 col-lg-offset-1 big-text">What our client say!</p>
                    </div>
                    <div className="client-say-content">
                        <Slider {...sliderSettings}>
                            <div>
                                <div className="client-slide">
                                    <div className="client-say-comment">I am proud of the thoughtfulness, commitment and quality of work Arkihive has demonstrated through the design, construction and commissioning of our production facility.</div>
                                    <p className="client-photo">
                                        <img width="75" className="img-circle" src={require('../../images/client-say/steve-jobs.jpg')} />
                                        <p>
                                            <span className="client-say-name">Steve Jobs</span>
                                            <span className="client-say-location">San Francisco, CA</span>
                                        </p>
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div className="client-slide">
                                    <div className="client-say-comment">We challenged Arkihive to complete the project in just over five months. This was an incredibly fast-track schedule, given that retrofits of this scale, as we were told by our own advisors, typically require at least eight to nine months.</div>
                                    <p className="client-photo">
                                        <img width="75" className="img-circle" src={require('../../images/client-say/bill-gates.jpg')} />
                                        <p>
                                            <span className="client-say-name">Bill Gates</span>
                                            <span className="client-say-location">Seattle, WA</span>
                                        </p>
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div className="client-slide">
                                    <div className="client-say-comment">We’re good at what we do but our specialty is not in construction. When we needed a design and construction specialist, Arkihive was there for us. Shri and I had a vision and an idea of how much we wanted to spend and a definite date for our grand opening.</div>
                                    <p className="client-photo">
                                        <img width="75" className="img-circle" src={require('../../images/client-say/elon-musk.jpg')} />
                                        <p>
                                            <span className="client-say-name">Elon Musk</span>
                                            <span className="client-say-location">Los Angeles, CA</span>
                                        </p>
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div className="client-slide">
                                    <div className="client-say-comment">The pressure was put on this team from the day we broke ground and they heeded the call. These dedicated young construction professionals show what great teamwork is all about.</div>
                                    <p className="client-photo">
                                        <img width="75" className="img-circle" src={require('../../images/client-say/mark-zuckerberg.jpg')} />
                                        <p>
                                            <span className="client-say-name">Mark Zuckerberg</span>
                                            <span className="client-say-location">White Plains, NY</span>
                                        </p>
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div className="client-slide">
                                    <div className="client-say-comment">Arkihive worked with us to overcome the various project challenges and completed the job on time and within budget. Even upon completion, Arkihive has continued to be a valuable resource for us. We would highly recommend them for your upcoming project.</div>
                                    <p className="client-photo">
                                        <img width="75" className="img-circle" src={require('../../images/client-say/larry-page.jpg')} />
                                        <p>
                                            <span className="client-say-name">Larry Page</span>
                                            <span className="client-say-location">Palo Alto, CA</span>
                                        </p>
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div className="client-slide">
                                    <div className="client-say-comment">Happy to see you again and again the commitment and dedication on your part with the communities. Best wishes!</div>
                                    <p className="client-photo">
                                        <img width="75" className="img-circle" src={require('../../images/client-say/sergey-brin.jpg')} />
                                        <p>
                                            <span className="client-say-name">Sergey Brin</span>
                                            <span className="client-say-location">Los Altos, CA</span>
                                        </p>
                                    </p>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default ClientSay;
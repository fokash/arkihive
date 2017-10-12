import React from 'react';
import Slider from 'react-slick';

class GetStarted extends React.Component {
  // render the component
  render() {
    const sliderSettings = {
      infinite: true,
      speed: 500,
      autoplay: false,
      responsive: [{
        breakpoint: 480,
        settings: {
          dots: true,
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          swipeToSlide: true,
        }
      },{
        breakpoint: 767,
        settings: {
          dots: true,
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 2,
          swipeToSlide: true,
        }
      },
      {
        breakpoint: 991,
        settings: {
          dots: true,
          arrows: false,
          slidesToShow: 3,
          slidesToScroll: 3,
          swipeToSlide: true,
        }
      },
      {
        breakpoint: 1440,
        settings: {
          dots: false,
          arrows: true,
          slidesToShow: 4,
          slidesToScroll: 4,
          swipeToSlide: false,
        }
      },
      {
        breakpoint: 5000,
        settings: {
          dots: false,
          arrows: true,
          slidesToShow: 5,
          slidesToScroll: 5,
          swipeToSlide: false,
        }
      }]
    };
    return (
      <div className="get-started">
        <div className="section-content-width">
          <div className="row get-started-text">
            <div className="col-lg-1"></div>
            <div className="col-lg-10">
              <p className="big-text">Are you looking to design your house?</p>
              <p className="description-text">lets connect & build together</p>
              <p><a><button type="button" className="btn btn-primary">GET STARTED</button></a></p>
            </div>
            <div className="col-lg-1"></div>
          </div>
          <div className="container-fluid">
            <div className="row get-started-projects">
              <Slider {...sliderSettings}>
                <div className="slide-1">
                  <p className="col">
                    <a href="#">
                      <span className="get-started-project-image"><img src={require('../../images/get-started-photos/get-started-image-01.jpg')} /></span>
                      <span className="get-started-project-text">{"apartment aerial view".toUpperCase()}</span>
                    </a>
                  </p>
                </div>
                <div className="slide-2">
                  <p className="col">
                    <a href="#">
                      <span className="get-started-project-image"><img src={require('../../images/get-started-photos/get-started-image-02.jpg')} /></span>
                      <span className="get-started-project-text">{"apartment exterior".toUpperCase()}</span>
                    </a>
                  </p>
                </div>
                <div className="slide-3">
                  <p className="col">
                    <a href="#">
                      <span className="get-started-project-image"><img src={require('../../images/get-started-photos/get-started-image-03.jpg')} /></span>
                      <span className="get-started-project-text">{"apartment design".toUpperCase()}</span>
                    </a>
                  </p>
                </div>
                <div className="slide-4">
                  <p className="col">
                    <a href="#">
                      <span className="get-started-project-image"><img src={require('../../images/get-started-photos/get-started-image-04.jpg')} /></span>
                      <span className="get-started-project-text">{"interior".toUpperCase()}</span>
                    </a>
                  </p>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GetStarted;

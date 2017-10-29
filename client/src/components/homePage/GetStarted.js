import React from 'react';
import Slider from 'react-slick';
import helpers from '../../utils/helpers';

class GetStarted extends React.Component {
  // define initial state
  constructor() {
    super();
    this.state = {
      bigText: [],
      projectGallery: []
    };
  }
  // fade in and fade out an element
  fadeIn(el) {
    if(el) {
      el.style.opacity = 0;
      let i=0;
      let tick = function() {
        el.style.opacity = +el.style.opacity + 0.04;
        if (+el.style.opacity < 1) {
          (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        }
      };
      tick();
    }
  }
  // change the get started content after 5s
  changeContent() {
    let counter = 0;
    setInterval(() => {
      let textBank = this.state.bigText;
      let bigTextElement = document.getElementById("changingBigText");
      counter = (counter === textBank.length) ? 0 : counter;
      if(bigTextElement) {
        this.fadeIn(bigTextElement);
        bigTextElement.innerHTML = textBank[counter].text;
        ++counter;
      }
    }, 5000);
  }
  componentWillMount() {
    // helpers.getHomepageData('authenticate')
    //   .then((data) => {
    //     this.setState({
    //       'projectGallery': data.section.data
    //     });
    //   });
    helpers.getHomepageData('getProjectGallery', 'get')
    .then((data) => {
      this.setState({
        'projectGallery': data.section.data.projectGallery
      });
    });
    helpers.getHomepageData('getBigText', 'get')
      .then((data) => {
        this.state.bigText = data.section.data.texts;
      });
  }
  componentDidMount() {
    this.changeContent();
  }
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
              <p className="big-text" id="changingBigText">Are you looking to design your house?</p>
              <p className="description-text">lets connect & build together</p>
              <p><a><button type="button" className="btn btn-primary">GET STARTED</button></a></p>
            </div>
            <div className="col-lg-1"></div>
          </div>
          <div className="container-fluid">
            <div className="row get-started-projects">
              <Slider {...sliderSettings}>
                {this.state.projectGallery.map((item, index) => {
                  return (
                    <div key={index} className={"slide-" + (index+1)}>
                      <p className="col">
                        <a href="#">
                          <span className="get-started-project-image"><img src={"http://localhost:4000/images/get-started/get-started-image-" + (index+1) + ".jpg"} /></span>
                          <span className="get-started-project-text">{item.description.toUpperCase()}</span>
                        </a>
                      </p>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GetStarted;

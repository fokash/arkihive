import React from 'react';
import Slider from 'react-slick';
import helpers from '../../utils/helpers';
import envConfig from '../../config/environment';
import Loader from '../common/Loader';

class GetStarted extends React.Component {
  // define initial state
  constructor() {
    super();
    this.state = {
      i: 0,
      bigText: {
        verbs: [],
        nouns: []
      },
      projectGallery: [],
      showPageLoader: true
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
  // function to type the character
  typeCharacter(str, element, milliseconds, callback) {
    let i = 0;
    // str = str.toUpperCase();
    (function type() {
      if (i >= str.length) {
        callback();
        return;
      }
      element.innerHTML += str[i];
      i++;
      setTimeout(type, milliseconds);
    })();
  }
  // function to erase the character
  eraseCharacter(str, element, milliseconds, callback) {
    // str = str.toUpperCase();
    let i = str.length;
    (function erase() {
      if (i === 0) {
        callback();
        return;
      }
      element.innerHTML = str = str.slice(0, -1);
      i--;
      setTimeout(erase, milliseconds);
    })();
  }
  // type the noun part of the big text
  typeNoun(noun, changingBigTextNoun, callback) {
    let i = -1;
    let nounCycle = () => {
      i++;
      if(i >= noun.length) { 
        callback();
        return; 
      }
      this.typeCharacter(noun[i], changingBigTextNoun, 100, () => {
        setTimeout(() => {
          this.eraseCharacter(noun[i], changingBigTextNoun, 100, () => {
            setTimeout(nounCycle, 250);
          });
        }, 5000);
      });
    };
    nounCycle();
  };
  // initiates the type cycle for all the combinations
  typeCycle(verb, noun, changingBigTextVerb, changingBigTextNoun) {
    let i = -1;
    let typeVerb = () => {
      i++;
      if(i >= verb.length) { 
        this.typeCycle(verb, noun, changingBigTextVerb, changingBigTextNoun);
        return; 
      }
      this.typeCharacter(verb[i], changingBigTextVerb, 100, () => {
        this.typeNoun(noun, changingBigTextNoun, () => {
          this.eraseCharacter(verb[i], changingBigTextVerb, 100, () => {
            setTimeout(typeVerb, 250);
          });
        });
      });
    };
    typeVerb();
  };
  bigTextDeserializer(arr, type) {
    let newArray = [];
    arr.map((item) => {
      newArray.push(item[type]);
    });
    return newArray;
  }
  // change the get started content after 5s
  changeContent() {
    let verb = this.bigTextDeserializer(this.state.bigText.verbs, "verb");
    let noun = this.bigTextDeserializer(this.state.bigText.nouns, "noun");
    let changingBigTextVerb = document.getElementById("changingBigTextVerb");
    let changingBigTextNoun = document.getElementById("changingBigTextNoun");
    
    this.typeCycle(verb, noun, changingBigTextVerb, changingBigTextNoun);
  }
  componentWillMount() {
    helpers.callService('api/getProjectGallery', 'get')
    .then((data) => {
      this.setState({
        'projectGallery': data.section.data.projectGallery,
        'showPageLoader': false
      });
    });
    helpers.callService('api/getBigText', 'get')
      .then((data) => {
        this.state.bigText.verbs = data.section.data.verbs;
        this.state.bigText.nouns = data.section.data.nouns;
        this.changeContent();
      });
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
              <p className="big-text">Are you looking to <span id="changingBigTextVerb"></span> your </p>
              <p className="big-text big-text-line-2"><span id="changingBigTextNoun"></span>?</p>
              <p className="description-text">lets connect & build together</p>
              <p><a><button type="button" className="btn btn-primary">GET STARTED</button></a></p>
            </div>
            <div className="col-lg-1"></div>
          </div>
          <div className="container-fluid">
            <div className="row get-started-projects">
              <Loader showLoader={this.state.showPageLoader} type="component" />
              <Slider {...sliderSettings}>
                {this.state.projectGallery.map((item, index) => {
                  return (
                    <div key={index} className={"slide-" + (index+1)}>
                      <p className="col">
                        <a href="#">
                          <span className="get-started-project-image"><img src={envConfig() + "images/get-started/get-started-image-" + (index+1) + ".jpg"} /></span>
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

import React from 'react';
import Header from './common/Header';
import Footer from './common/footer';
import navigation from '../utils/navigation';

class ProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.navigateTo = this.navigateTo.bind(this);
  }
  navigateTo(routeName) {
    this.setState({
      loginCheck: true
    });
    navigation(routeName, this.props);
  }
  render() {
    return (
      <div className="">
        <Header navigateTo={this.navigateTo} />
        <Footer />
      </div>
    );
  }
}

export default ProjectPage;

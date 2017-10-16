import React from 'react';
import {Route, Switch} from 'react-router-dom';
import HomePage from '../components/HomePage';
import AboutPage from '../components/AboutPage';

const FourOFour = () => <h1>404</h1>;

const routes = () => (
  <div>
    <Switch>
      <Route exact path="/" component={HomePage}/>
      <Route path="about" component={AboutPage}/>
      <Route component={FourOFour}/>
    </Switch>
  </div>
);

export default routes;

import React from 'react';
import {Route, Switch} from 'react-router-dom';
import HomePage from '../components/HomePage';
import ProjectPage from '../components/ProjectPage';

const FourOFour = () => <h1>404</h1>;

const routes = () => (
    <Switch>
      <Route exact path="/" component={HomePage}/>
      <Route path="/project" component={ProjectPage}/>
      <Route component={FourOFour}/>
    </Switch>
);

export default routes;

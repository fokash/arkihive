// import fontcss from './fonts/font-index.scss';
import css from './app.scss';
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Routes from './config/routes';
import favicon from './favicon.ico';

const App = () => (
  <BrowserRouter>
    <Routes/>
  </BrowserRouter>
);
render(
  <App/>, document.getElementById('root'));

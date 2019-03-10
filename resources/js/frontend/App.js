import React, { Component } from 'react';
import {  BrowserRouter as Router,Route, Switch } from 'react-router-dom';
import './App.css';

import '@coreui/icons/css/coreui-icons.min.css';

import './scss/style.css'

import Full from './containers/DefaultLayout/DefaultLayout.js';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" name="Home" component={Full} />
        </Switch>
      </Router>
    );
  }
}

export default App;

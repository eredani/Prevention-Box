import React, { Component } from 'react';
import {  BrowserRouter as Router,Route, Switch } from 'react-router-dom';
import './App.css';

import '@coreui/icons/css/coreui-icons.min.css';

import './scss/style.css'

import Full from './containers/DefaultLayout/DefaultLayout.js';

import IdleTimer from 'react-idle-timer'

class App extends Component {
  constructor(props) {
    super(props)
    this.idleTimer = null
    this.onIdle = this._onIdle.bind(this)
  }
  render() {
    return (
      <div>
        <IdleTimer
          ref={ref => { this.idleTimer = ref }}
          element={document}
          onIdle={this.onIdle}
          debounce={250}
          timeout={600000} />
        <Router>
        <Switch>
          <Route path="/" name="Home" component={Full} />
        </Switch>
      </Router>
      </div>

    );
  }
  _onIdle(e) {
    if(window.location.pathname!="/home")
    {
      window.location.href="/home";
    }
  }
}
export default App;

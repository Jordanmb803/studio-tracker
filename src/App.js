import React, { Component } from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage';
import DailyView from './components/DailyView/DailyView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route path='/' component={LandingPage} exact/>
            <Route path='/dailyview' component={DailyView}/>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;

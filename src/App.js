import React, { Component } from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import LandingPage from './components/LandingPage/LandingPage';
import DailyView from './components/DailyView/DailyView';
import CourseList from './components/CourseList/CourseList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <HashRouter>
          <Switch>
            <Route path='/' component={LandingPage} exact />
            <Route path='/dailyview' component={DailyView} exact />
            <Route path='/dailyview/:course' component={CourseList} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;

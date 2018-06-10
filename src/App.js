import React, { Component } from 'react';
// import './reset.css';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import LandingPage from './components/LandingPage/LandingPage';
import DailyView from './components/DailyView/DailyView';
import CourseList from './components/CourseList/CourseList';
import AdminLanding from './components/AdminLanding/AdminLanding';
import CreatePrivateCourse from './components/CreatePrivateCourse/CreatePrivateCourse';
import EditUser from './components/EditUser/EditUser';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <HashRouter>
          <Switch>
            <Route path='/' component={LandingPage} exact />
            <Route path='/dailyview' component={DailyView} exact />
            <Route path='/dailyview/:course/:classid/:userid' component={CourseList} />
            <Route path='/adminlanding' component={AdminLanding} />
            <Route path='/create/privatescourse/:teacher_id' component={CreatePrivateCourse} />
            <Route path='/edituser/:user_name/:user_id' component={EditUser} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;

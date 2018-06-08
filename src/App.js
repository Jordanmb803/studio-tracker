import React, { Component } from 'react';
// import './reset.css';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import LandingPage from './components/LandingPage/LandingPage';
import DailyView from './components/DailyView/DailyView';
import CourseList from './components/CourseList/CourseList';
import AdminLanding from './components/AdminLanding/AdminLanding';
import CreateCourse from './components/CreateCourse/CreateCourse';
import EditCourse from './components/EditCourse/EditCourse';
import EditUser from './components/EditUser/EditUser';
import CreateUser from './components/CreateUser/CreateUser';
import UpdateCourseRoll from './components/UpdateCourseRoll/UpdateCourseRoll';
import RemoveUserFromRoll from './components/RemoveUserFromRoll/RemoveUserFromRoll';
import CreatePrivateCourse from './components/CreatePrivateCourse/CreatePrivateCourse';

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
            <Route path='/createcourse' component={CreateCourse} />
            <Route path='/editcourse/:course/:classid' component={EditCourse}/>
            <Route path='/edituser/:user_name/:user_id' component={EditUser} />
            <Route path='/admin/createuser' component={CreateUser} />
            <Route path='/update/courseroll/:course/:class_id' component={UpdateCourseRoll} />
            <Route path='/update/removeuser/courseroll/:course/:class_id' component={RemoveUserFromRoll} />
            <Route path='/dailyview/create/privatecourse' component={CreatePrivateCourse} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;

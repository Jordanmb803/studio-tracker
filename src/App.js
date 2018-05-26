import React, { Component } from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import LandingPage from './components/LandingPage/LandingPage';
import DailyView from './components/DailyView/DailyView';
import CourseList from './components/CourseList/CourseList';
import AdminLanding from './components/AdminLanding/AdminLanding';
import TrackHours from './components/TrackHours/TrackHours';
import TrackAttendance from './components/TrackAttendance/TrackAttendance';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Courses from './components/Courses/Courses';
import EditCourse from './components/EditCourse/EditCourse';
import UsersList from './components/UsersList/UsersList';
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
            <Route path='/trackhours' component={TrackHours} />
            <Route path='/trackattendance' component={TrackAttendance} />
            <Route path='/createcourse' component={CreateCourse} />
            <Route path='/courses' component={Courses} />
            <Route path='/editcourse/:course/:classid' component={EditCourse}/>
            <Route path='/userslist' component={UsersList} />
            <Route path='/edituser/:user_name/:user_id' component={EditUser} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;

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
import Register from './components/Register/Register';
import { connect } from 'react-redux';
import Courses from './components/Courses/Courses';

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
            <Route path='/registeruser' component={Register} />
            <Route path='/courses' component={Courses} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    user: state.user
  }
}

export default App;

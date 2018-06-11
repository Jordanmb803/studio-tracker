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
        {/* <Nav /> */}
        <HashRouter>
          {/* <Switch> */}
          <div className='rts'>
            <Route path='/' component={LandingPage} exact />
            <Route path='/nav' component={Nav} />
            <Route path='/nav/dailyview' component={DailyView} exact /> 
            <Route path='/nav/dailyview/:course/:classid/:userid' component={CourseList} />
            <Route path='/nav/adminlanding' component={AdminLanding} />
            <Route path='/nav/create/privatescourse/:teacher_id' component={CreatePrivateCourse} />
            <Route path='/nav/edituser/:user_name/:user_id' component={EditUser} />
          {/* </Switch> */}
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;

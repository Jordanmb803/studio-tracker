import React, { Component } from 'react';
import './AdminLanding.css';
import { Switch, Route, Link} from 'react-router-dom';
import TrackHours from '../TrackHours/TrackHours';
import TrackAttendance from '../TrackAttendance/TrackAttendance';
import Courses from '../Courses/Courses';
import UsersList from '../UsersList/UsersList';

class AdminLanding extends Component {
    render() {
        return (
            <div className='adminLandingRoutes' >
                <div className='adminLanding'>
                    <Link className='adminLinks' to='/adminlanding/trackhours'><button className='adminOption'>Hours</button></Link>
                    <Link className='adminLinks' to='/adminlanding/trackattendance'><button className='adminOption'>Attendance</button></Link>
                    <Link className='adminLinks' to='/adminlanding/courses'><button className='adminOption'>Classes</button></Link>
                    <Link className='adminLinks' to='/adminlanding/userslist'><button className='adminOption'>Users</button></Link>
                </div>
                <div>
                    <Switch>
                        <Route path='/adminlanding/trackhours' component={TrackHours} />
                        <Route path='/adminlanding/trackattendance' component={TrackAttendance} />
                        <Route path='/adminlanding/courses' component={Courses} />
                        <Route path='/adminlanding/userslist' component={UsersList} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default AdminLanding;
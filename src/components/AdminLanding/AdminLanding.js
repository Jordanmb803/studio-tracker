import React, { Component } from 'react';
import './AdminLanding.css';
import { Switch, Route, Link } from 'react-router-dom';
import TrackHours from '../TrackHours/TrackHours';
import TrackAttendance from '../TrackAttendance/TrackAttendance';
import Courses from '../Courses/Courses';
import UsersList from '../UsersList/UsersList';


class AdminLanding extends Component {
    constructor() {
        super()
        this.state = {
            active: 0
        }
        this.activeTab = this.activeTab.bind(this)
    }

    activeTab(tabNum) {
        this.setState({
            active: tabNum
        })
    }

    render() {
        console.log(this.state.active)
        return (
            <div className='adminLandingRoutes' >
                <div className='adminLanding'>
                    <Link className='adminLinks' id={this.state.active === 0 ? 'active' : null} to='/adminlanding/trackhours'
                        onClick={() => this.activeTab(0)}
                    ><h3 className='adminOption'>Hours</h3></Link>
                    <Link className='adminLinks' id={(this.state.active === 1) ? 'active' : null} to='/adminlanding/trackattendance'
                        onClick={() => this.activeTab(1)}
                    ><h3 className='adminOption'>Attendance</h3></Link>
                    <Link className='adminLinks' id={(this.state.active === 2) ? 'active' : null} to='/adminlanding/courses'
                        onClick={() => this.activeTab(2)}
                    ><h3 className='adminOption'>Classes</h3></Link>
                    <Link className='adminLinks' id={(this.state.active === 3) ? 'active' : null} to='/adminlanding/userslist'
                        onClick={() => this.activeTab(3)}
                    ><h3 className='adminOption'>Users</h3></Link>
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
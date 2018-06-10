import React, { Component } from 'react';
import './AdminLanding.css';
import { Switch, Route, Link } from 'react-router-dom';
import TrackHours from '../TrackHours/TrackHours';
import TrackAttendance from '../TrackAttendance/TrackAttendance';
import Courses from '../Courses/Courses';
import CreateCourse from '../CreateCourse/CreateCourse';
import EditCourse from '../EditCourse/EditCourse';
import CreateUser from '../CreateUser/CreateUser';
import UsersList from '../UsersList/UsersList';
import EditUser from '../EditUser/EditUser';
import UpdateCourseRoll from '../UpdateCourseRoll/UpdateCourseRoll';
import RemoveUserFromRoll from '../RemoveUserFromRoll/RemoveUserFromRoll';
import { connect } from 'react-redux';
import { changeActiveTab } from '../../ducks/user';



class AdminLanding extends Component {



    render() {
        let { activeTab } = this.props
        let { changeActiveTab } = this.props
        console.log(this.props.activeTab)
        return (
            <div className='adminLandingRoutes' >
                <div className='adminLanding'>
                    <Link className='adminLinks' id={activeTab === 0 ? 'active' : null} to='/adminlanding/trackhours'
                        onClick={() => changeActiveTab(0)}
                    ><h3 className='adminOption'>Hours</h3></Link>
                    <Link className='adminLinks' id={(activeTab === 1) ? 'active' : null} to='/adminlanding/trackattendance'
                        onClick={() => changeActiveTab(1)}
                    ><h3 className='adminOption'>Attendance</h3></Link>
                    <Link className='adminLinks' id={(activeTab === 2) ? 'active' : null} to='/adminlanding/courses'
                        onClick={() => changeActiveTab(2)}
                    ><h3 className='adminOption'>Classes</h3></Link>
                    <Link className='adminLinks' id={(activeTab === 3) ? 'active' : null} to='/adminlanding/userslist'
                        onClick={() => changeActiveTab(3)}
                    ><h3 className='adminOption'>Users</h3></Link>
                </div>
                <div className='routes'>
                    <Switch>
                        <Route path='/adminlanding/trackhours' component={TrackHours} />
                        <Route path='/adminlanding/trackattendance' component={TrackAttendance} />
                        <Route path='/adminlanding/courses' component={Courses} />
                        <Route path='/adminlanding/createcourse' component={CreateCourse} />
                        <Route path='/adminlanding/editcourse/:course/:classid' component={EditCourse} />
                        <Route path='/adminlanding/userslist' component={UsersList} />
                        <Route path='/adminlanding/edituser/:user_name/:user_id' component={EditUser} />
                        <Route path='/adminlanding/createuser' component={CreateUser} />
                        <Route path='/adminlanding/update/courseroll/:course/:class_id' component={UpdateCourseRoll} />
                        <Route path='/adminlanding/update/removeuser/courseroll/:course/:class_id' component={RemoveUserFromRoll} />
                    </Switch>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        activeTab: state.activeTab
    }
}

export default connect(mapStateToProps, { changeActiveTab })(AdminLanding);
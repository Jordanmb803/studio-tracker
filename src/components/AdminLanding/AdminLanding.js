import React, { Component } from 'react';
import './AdminLanding.css';
import { Link } from 'react-router-dom';

class AdminLanding extends Component {
    render(){
        return(
            <div className='adminLanding'>
                <Link to='/trackhours'><button className='adminOption'>Track Hours</button></Link>
                <Link to='/trackattendance'><button className='adminOption'>Track Attendance</button></Link>
                <Link to='/createcourse'><button className='adminOption'>Create Class</button></Link>
                <Link to='/registeruser'><button className='adminOption'>Register Teacher/Student</button></Link>
            </div>
        )
    }
}

export default AdminLanding;
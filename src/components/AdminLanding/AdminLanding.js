import React, { Component } from 'react';
import './AdminLanding.css';
import { Link } from 'react-router-dom';

class AdminLanding extends Component {
    render() {
        return (
            <div className='adminLanding'>
                <Link className='adminLinks' to='/trackhours'><button className='adminOption'>Track Hours</button></Link>
                <Link className='adminLinks' to='/trackattendance'><button className='adminOption'>Track Attendance</button></Link>
                <Link className='adminLinks' to='/courses'><button className='adminOption'>Classes</button></Link>
                <Link className='adminLinks' to='/userslist'><button className='adminOption'>Teachers/Students</button></Link>
            </div>
        )
    }
}

export default AdminLanding;
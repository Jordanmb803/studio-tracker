import React, { Component } from 'react';
import './AdminLanding.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class AdminLanding extends Component {
    render() {
        return (
            <div className='adminLanding'>
                <Link className='adminLinks' to='/trackhours'><button className='adminOption'>Track Hours</button></Link>
                <Link className='adminLinks' to='/trackattendance'><button className='adminOption'>Track Attendance</button></Link>
                <Link className='adminLinks' to='/createcourse'><button className='adminOption'>Create Class</button></Link>
                <Link className='adminLinks' to='/registeruser'><button className='adminOption'>Register Teacher/Student</button></Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default AdminLanding;
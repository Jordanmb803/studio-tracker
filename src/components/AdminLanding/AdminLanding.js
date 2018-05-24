import React, { Component } from 'react';
import './AdminLanding.css';

class AdminLanding extends Component {
    render(){
        return(
            <div className='adminLanding'>
                <button className='adminOption'>Track Hours</button>
                <button className='adminOption'>Track Attendance</button>
                <button className='adminOption'>Create Class</button>
                <button className='adminOption'>Register Teacher/Student</button>
            </div>
        )
    }
}

export default AdminLanding;
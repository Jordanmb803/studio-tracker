import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Courses.css';

class Courses extends Component {
    render(){
        return(
            <div className='Courses'>
               List of Courses here
                <Link to='/createcourse'><button>Create New Course</button></Link>
            </div>
        )
    }
}

export default Courses;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCourses } from '../../ducks/user';
import { connect } from 'react-redux';
import './Courses.css';
import editIcon from './edit-icon.png';
import deleteIcon from './delete-icon.png';
import axios from 'axios';

class Courses extends Component {
    constructor() {
        super()
        this.state = {
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        this.props.getCourses()
    }

    deleteCourse(class_id) {
        axios.delete(`/deletecourse/${class_id}`).then(res => {
            console.log('table delete')
            this.componentDidMount()
        })
    }

    render() {
        return (
            <div className='Courses'>
            <h2>Center Stage Class List</h2>
                {this.props.danceCourses.map((course, i) => {
                    return (
                        <div className='courseBreakDown' key={course + i}>
                            <h3>{course.title}</h3>
                            <p>id: {course.class_id}</p>
                            <p>#: {course.class_num}</p>
                            <p>minutes: {course.length}</p>
                            <p>day: {course.day}</p>
                            <p>time: {course.time}</p>
                            <p>teacher: {course.teacher}</p>
                            <Link to={`/editcourse/${course.title}/${course.class_id}`}><img src={editIcon} className='deleteEditIcons' alt='edit icon'/></Link>
                            <img onClick={()=> this.deleteCourse(course.class_id)} src={deleteIcon} className='deleteEditIcons' alt='delete Icon'/>
                        </div>
                    )
                })}
                <Link to='/createcourse'><button>Create New Course</button></Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        danceCourses: state.danceCourses
    }
}

export default connect(mapStateToProps, { getCourses })(Courses);
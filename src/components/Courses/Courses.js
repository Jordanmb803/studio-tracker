import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCourses } from '../../ducks/user';
import { connect } from 'react-redux'
import './Courses.css';

class Courses extends Component {
    constructor() {
        super()
        this.state = {
        }
    }

    componentDidMount() {
        this.props.getCourses()
    }

    render() {
        return (
            <div className='Courses'>
            <h2>Center Stage Class List</h2>
                {this.props.danceCourses.map((course, i) => {
                    return (
                        <div key={course + i}>
                            <h3>{course.title}</h3>
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
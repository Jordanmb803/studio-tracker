import React, { Component } from 'react';
import './CourseList.css';
import { connect } from 'react-redux';
import axios from 'axios';
import Student from '../Student/Student';

class CourseList extends Component {
    constructor() {
        super()
        this.state = {
            courseRoll: [],
        }
    }

    componentDidMount() {
        axios.get('/courseroll').then(res => {
            this.setState({
                courseRoll: res.data
            })
        })
    }



    render() {
        let displayStudent = this.state.courseRoll.filter(course => {
            return course.class_id === Number(this.props.match.params.classid)
        }).map((student, i) => {
            return (
                <div key={student + i}>
                    <Student user_name={student.user_name}
                                today={this.props.today}
                    />
                </div>
            )
        })

        return (
            <div className='dailyView'>
                <h3>{this.props.match.params.course}</h3>
                {displayStudent}
                <button className='submitRole'>Submit Roll</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        danceCourses: state.danceCourses,
        today: state.today
    }
}

export default connect(mapStateToProps)(CourseList);
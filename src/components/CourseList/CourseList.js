import React, { Component } from 'react';
import './CourseList.css';
import { connect } from 'react-redux';
import axios from 'axios';

class CourseList extends Component {
    constructor() {
        super()
        this.state = {
            courseRoll: []
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

        let displayStudentID = this.state.courseRoll.filter(course => {
            return course.class_id === Number(this.props.match.params.classid)
        }).map( (student, i) => {
            return (
                <div key={student + i}>
                    <p>{student.user_name}</p>
                </div>
            )
        })


        return (
            <div className='dailyView'>
                <h3>{this.props.match.params.course}</h3>
                {displayStudentID}
                <button className='submitRole'>Submit Roll</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        danceCourses: state.danceCourses
    }
}

export default connect(mapStateToProps)(CourseList);
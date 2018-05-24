import React, { Component } from 'react';
import './CreateCourse.css';

class CreateCourse extends Component {
    constructor() {
        super()
        this.state = {
            classNumber: 0,
            classTitle: '',
            classLength: 0,
            dayOfWeek: '',
            time: '',
            teacherName: '',
        }
    }
    render() {
        return (
            <div className='createCourse'>
                <h3 className='createCourseHeader'>Create A New Class</h3>
                <input placeholder='Class Number' className='courseInput' />
                <input placeholder='Class Title' className='courseInput' />
                <input placeholder='Class length in minutes' className='courseInput' />
                <input placeholder='Day of the Week, Options: S, M, T, W, TH, F, SAT' className='courseInput' />
                <input placeholder='Time, Ex: 7pm' className='courseInput' />
                <input placeholder='Teacher Name' className='courseInput' />
                <button className='createCourseButton'>Create New Class</button>
            </div>
        )
    }
}

export default CreateCourse;
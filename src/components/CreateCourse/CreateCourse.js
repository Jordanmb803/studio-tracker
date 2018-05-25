import React, { Component } from 'react';
import './CreateCourse.css';
import axios from 'axios';

class CreateCourse extends Component {
    constructor() {
        super()
        this.state = {
            classNumber: 0,
            classTitle: '',
            length: 0,
            dayOfWeek: '',
            time: '',
            teacherName: '',
            users: []
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.createCourse = this.createCourse.bind(this)
    }

    componentDidMount(){
        axios.get('/getallusers').then(res => {
            this.setState({
                users: res.data
            })
        })
    }


    createCourse(){
        const classNumber = Number(this.state.classNumber)
        const length = Number(this.state.length)
        const {classTitle, dayOfWeek, time, teacherName} = this.state
        axios.post('/createcourse', {classNumber, classTitle, length, dayOfWeek, time, teacherName}).then(()=> {
          console.log('we made it')
        })
    }

    render() {
        return (
            <div className='createCourse'>
                <h3 className='createCourseHeader'>Create A New Class</h3>
                <input placeholder='Class Number' className='courseInput' onChange={e => this.setState({ classNumber: e.target.value})}/>
                <input placeholder='Class Title' className='courseInput'  onChange={e => this.setState({ classTitle: e.target.value})}/>
                <input placeholder='Class length in minutes' className='courseInput'  onChange={e => this.setState({ length: e.target.value})}/>
                <input placeholder='Day of the Week, Options: S, M, T, W, TH, F, SAT' className='courseInput'  onChange={e => this.setState({ dayOfWeek: e.target.value})}/>
                <input placeholder='Time, Ex: 7pm' className='courseInput'  onChange={e => this.setState({ time: e.target.value})}/>
                <input placeholder='Teacher Name' className='courseInput'  onChange={e => this.setState({ teacherName: e.target.value})}/>
                <button className='createCourseButton' onClick={()=> this.createCourse()}>Create New Class</button>
            </div>
        )
    }
}

export default CreateCourse;
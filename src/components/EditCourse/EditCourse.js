import React, { Component } from 'react';
import './EditCourse.css';
import { connect } from 'react-redux';
import axios from 'axios';

class EditCourse extends Component {
    constructor() {
        super()
        this.state = {
            classNumber: 0,
            classTitle: '',
            length: 0,
            dayOfWeek: '',
            time: '',
            teacherName: '',
            teacher_id: 0,
            users: []
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.editCourse = this.editCourse.bind(this)
    }


    componentDidMount() {
        axios.get('/getallusers').then(res => {
            this.setState({
                users: res.data
            })
        })
    }

    editCourse() {
        let teacherID = this.state.users.filter( user => {
            return user.user_name == this.state.teacherName && user.type == 'teacher'
        }).map(teacher => {
            return teacher.user_id
        })
        console.log(teacherID)
        const teacher_id = teacherID[0]
        const { classid } = this.props.match.params
        const { classNumber, classTitle, length, dayOfWeek, time, teacherName } = this.state
        axios.put('/editcourse', { classid, classNumber, classTitle, length, dayOfWeek, time, teacherName, teacher_id }).then(res => {
            console.log('update course')
        })
    }

    render() {
        console.log(this.props)
        return (
            <div className='EditCourse'>
                {this.props.match.params.course}

                {this.props.danceCourses.filter(course => {
                    return course.class_id == this.props.match.params.classid
                }).map(course => {
                    return (
                    <div>
                        <p>id: {course.class_id}</p>
                        <p>#: {course.class_num}</p>
                        <p>minutes: {course.length}</p>
                        <p>day: {course.day}</p>
                        <p>time: {course.time}</p>
                        <p>teacher: {course.teacher}</p>
                    </div>
               )
                })
                }
                <div>
                    <input placeholder='Class Title' onChange={e => this.setState({ classTitle: e.target.value })} />
                    <input placeholder='Class Number' onChange={e => this.setState({ classNumber: e.target.value })} />
                    <select className='courseInput' onChange={e => this.setState({ length: e.target.value })} name='length' form='length'>
                        <option value=''>Select Class Length</option>
                        <option value='60'>1 Hour</option>
                        <option value='90'>1.5 Hours</option>
                    </select>
                    <select className='courseInput' onChange={e => this.setState({ dayOfWeek: e.target.value })} name='dayOfTheWeek' form='dayOfTheWeek'>
                        <option value=''>Select Day</option>
                        <option value='S'>Sunday</option>
                        <option value='M'>Monday</option>
                        <option value='T'>Tuesday</option>
                        <option value='W'>Wednesday</option>
                        <option value='TH'>Thursday</option>
                        <option value='F'>Friday</option>
                        <option value='SAT'>Saturday</option>
                    </select>

                    <select className='courseInput' onChange={e => this.setState({ time: e.target.value })} name='time' form='time'>
                        <option value=''>Select Time</option>
                        <option value='9am'>9am</option>
                        <option value='10am'>10am</option>
                        <option value='11am'>11am</option>
                        <option value='12pm'>12pm</option>
                        <option value='1pm'>1pm</option>
                        <option value='2pm'>2pm</option>
                        <option value='3pm'>3pm</option>
                        <option value='4pm'>4pm</option>
                        <option value='5pm'>5pm</option>
                        <option value='6pm'>6pm</option>
                        <option value='7pm'>7pm</option>
                        <option value='8pm'>8pm</option>
                        <option value='9pm'>9pm</option>
                    </select>
                    <p>Select A Teacher</p>
                    <div className='teachersDiv'>
                        {this.state.users.filter(user => {
                            return user.type === 'teacher'
                        }).map((teacher, i) => {
                            return (<div key={i + teacher} >
                                <img src={teacher.profile_picture} alt={teacher} className='teacherPics' onClick={() => this.setState({ teacherName: teacher.user_name })} />
                                <p className='teacherName'>{teacher.user_name}</p>
                            </div>
                            )
                        })
                        }
                    </div>
                    <button onClick={() => this.editCourse()}>Update Class</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        danceCourses: state.danceCourses
    }
}

export default connect(mapStateToProps)(EditCourse);
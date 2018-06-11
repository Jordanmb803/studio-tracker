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
        let teacherID = this.state.users.filter(user => {
            return user.user_name === this.state.teacherName && user.type === 'teacher'
        }).map(teacher => {
            return teacher.user_id
        })
        const teacher_id = teacherID[0]
       
        let teacher = this.state.users.find(user => {
            return user.user_id === teacher_id
        })

        
        let email = teacher.email
        console.log(email)
        
        const { classid } = this.props.match.params
        const { classNumber, classTitle, length, dayOfWeek, time, teacherName } = this.state
        axios.put('/editcourse', { classid, classNumber, classTitle, length, dayOfWeek, time, teacherName, teacher_id }).then(res => {
            this.props.history.push('/nav/adminlanding/courses')
        })
        let message = `Changes were made to ${this.props.match.params.course}. The updated class information is: Title: ${classTitle}, Day: ${dayOfWeek}, Time: ${time}, Assigned Teacher: ${teacherName}.`
        let subject = `${this.props.match.params.course} class info updated`
        
        axios.post(`/sendemail/${email}/${subject}`, {message}).then(res => {
            console.log('email sent')
        })
    }

    render() {
        return (
            <div className='TrackHours'>
                <div className='classTaughtDiv' id='previosInfo'>
                    <h3 className='courseTitle'>{this.props.match.params.course}</h3>

                    {this.props.danceCourses.filter(course => {
                        return course.class_id === Number(this.props.match.params.classid)
                    }).map((course, i) => {
                        return (
                            <div key={course + i} className='classInfoDiv'>
                                <div id='info'>
                                    <p id='label'>ID </p>
                                    <p>{course.class_id}</p>
                                </div>
                                <div id='info'>
                                    <p id='label'>Class # </p>
                                    <p>{course.class_num}</p>
                                </div>
                                <div id='info'>
                                    <p id='label'>Length</p>
                                    <p>{course.length}</p>
                                </div>
                                <div id='info'>
                                    <p id='label'>Day </p>
                                    <p>{course.day}</p>
                                </div>
                                <div id='info'>
                                    <p id='label'>Time</p>
                                    <p>{course.time}</p>
                                </div>
                                <div id='info'>
                                    <p id='label'>Teacher</p>
                                    <p>{course.teacher}</p>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
                <h2 className='instructions'>Edit Info below for the Class Listed Above</h2>
                <div className='newInfo'>
                    <div className='textFieldsDiv'>
                        <input className='newInfoInput' id='title' placeholder='Class Title' onChange={e => this.setState({ classTitle: e.target.value })} />
                        <input className='newInfoInput' id='num' placeholder='Class Number' onChange={e => this.setState({ classNumber: e.target.value })} />
                    </div>
                    <div className='selectBoxesDiv'>
                        <select className='newInfoInput' onChange={e => this.setState({ length: e.target.value })} name='length' form='length'>
                            <option value=''>Class Length</option>
                            <option value='60'>1 Hour</option>
                            <option value='90'>1.5 Hours</option>
                        </select>

                        <select id='smallSelect' className='newInfoInput' onChange={e => this.setState({ dayOfWeek: e.target.value })} name='dayOfTheWeek' form='dayOfTheWeek'>
                            <option value=''>Day</option>
                            <option value='S'>Sunday</option>
                            <option value='M'>Monday</option>
                            <option value='T'>Tuesday</option>
                            <option value='W'>Wednesday</option>
                            <option value='TH'>Thursday</option>
                            <option value='F'>Friday</option>
                            <option value='SAT'>Saturday</option>
                        </select>

                        <select id='smallSelect' className='newInfoInput' onChange={e => this.setState({ time: e.target.value })} name='time' form='time'>
                            <option value=''>Time</option>
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
                    </div>


                    <p className='selectTeacherLabel'>Select A Teacher</p>
                    <div className='teachersDiv'>
                        {this.state.users.filter(user => {
                            return user.type === 'teacher'
                        }).map((teacher, i) => {
                            return (
                                <div className='teacherPicNameDiv' key={i + teacher} >
                                    <img src={teacher.profile_picture} alt={teacher} className='teacherPics' onClick={() => this.setState({ teacherName: teacher.user_name })} />
                                    <p className='teacherName'>{teacher.user_name}</p>
                                </div>
                            )
                        })
                        }
                    </div>
                    <button className='updateButton' onClick={() => this.editCourse()}>Update Class</button>
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
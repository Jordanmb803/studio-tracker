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
            teacher_id: 0,
            users: []
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.createCourse = this.createCourse.bind(this)
    }

    componentDidMount() {
        axios.get('/getallusers').then(res => {
            this.setState({
                users: res.data
            })
        })
    }


    createCourse() {
        const classNumber = Number(this.state.classNumber)
        const length = Number(this.state.length)
        const { classTitle, dayOfWeek, time, teacher_id } = this.state
        console.log(teacher_id)

        let teacherUser = this.state.users.find(user => {
            return user.user_id === Number(teacher_id)
        })

        console.log(teacherUser)

        let teacher = teacherUser.user_name

        axios.post('/createcourse', { classNumber, classTitle, length, dayOfWeek, time, teacher, teacher_id }).then(res => {
            console.log('we made it')
            this.props.history.push('/nav/adminlanding/courses')
        })
    }

    render() {
        console.log(this.state.teacher_id)
        return (
            <div className='TrackHours'>
                <h1 className='thHeader'>Create A New Class</h1>

                <div className='newInfo'>
                    <div className='textFieldsDiv' >
                        <input className='newInfoInput' id='title' placeholder='Class Title' onChange={e => this.setState({ classTitle: e.target.value })} />
                        <input className='newInfoInput' id='num' placeholder='Class Number' onChange={e => this.setState({ classNumber: e.target.value })} />
                    </div >
                    <div className='selectBoxesDiv'>
                        <select className='newInfoInput' onChange={e => this.setState({ length: e.target.value })} name='length' form='length'>
                            <option value=''>Length</option>
                            <option value='60'>1 Hour</option>
                            <option value='90'>1.5 Hours</option>
                        </select>


                        <select className='newInfoInput' id='smallSelect' onChange={e => this.setState({ dayOfWeek: e.target.value })} name='dayOfTheWeek' form='dayOfTheWeek'>
                            <option value=''>Day</option>
                            <option value='S'>Sunday</option>
                            <option value='M'>Monday</option>
                            <option value='T'>Tuesday</option>
                            <option value='W'>Wednesday</option>
                            <option value='TH'>Thursday</option>
                            <option value='F'>Friday</option>
                            <option value='SAT'>Saturday</option>
                        </select>

                        <select className='newInfoInput' id='smallSelect' onChange={e => this.setState({ time: e.target.value })} name='time' form='time'>
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

                    <div className='selectTeacherAndButtonDiv'>
                        <p className='selectTeacherLabel'>Select A Teacher</p>
                        <div className='teachersDiv'>
                            <select className='selectTeacher' onChange={(e) => this.setState({ teacher_id: e.target.value })}>
                                <option value=''>Teacher</option>
                            {this.state.users.filter(user => {
                                return user.type === 'teacher'
                            }).map((teacher, i) => {
                                return (
                                        <option key={i + teacher} value={teacher.user_id}>{teacher.user_name}</option>
                                )
                            })
                            }
                            </select>
                        </div>
                    </div>
                    <button id='createCourseButton' className='updateButton' onClick={() => this.createCourse()}>Create New Class</button>
                </div>
            </div>
        )
    }
}

export default CreateCourse;
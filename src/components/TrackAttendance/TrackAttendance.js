import React, { Component } from 'react';
import './TrackAttendance.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUsers } from '../../ducks/user';
import DatePicker from 'react-date-picker';
import '../TrackHours/TrackHours.css';


class TrackAttendance extends Component {
    constructor() {
        super()
        this.state = {
            search: '',
            hours: [],
            students: [],
            user: 0,
            dateOne: '',
            dateTwo: ''
        }
        this.searchStudent = this.searchStudent.bind(this)
    }

    componentDidMount() {
        this.props.getUsers()

    }

    searchStudent() {
        const { dateOne, dateTwo, user } = this.state
        const firstDate = `'${dateOne.getFullYear()}-${dateOne.getMonth() + 1}-${dateOne.getDate()}'`
        const secondDate = `'${dateTwo.getFullYear()}-${dateTwo.getMonth() + 1}-${dateTwo.getDate()}'`
        console.log(firstDate, secondDate)
        axios.post('/hours/attendance', { firstDate, secondDate, user }).then(res => {
            console.log(res.data)
            this.setState({
                hours: res.data
            })
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className='TrackHours'>
                <h1 className='thHeader'>Student Attendance</h1>
                <div className='dateSelectorDiv'>
                    <div className='dateTitleCol'>
                        <p>From: </p>
                        <DatePicker calendarClassName='datePickerTH' value={this.state.dateOne} onChange={e => this.setState({ dateOne: e })} />
                        <select className='selectTeacher' onChange={e => this.setState({ user: e.target.value })}>
                            <option value='' >Student</option>
                            {
                                this.props.users.filter(user => {
                                    return user.type === 'student'
                                }).map((student, i) => {
                                    return (
                                        <option value={student.user_id} key={student + i}>{student.user_name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='dateTitleCol'>
                        <p>To:</p>
                        <DatePicker calendarClassName='datePickerTH' value={this.state.dateTwo} onChange={e => this.setState({ dateTwo: e })} />
                        <button className='searchButton' onClick={() => this.searchStudent()}>Search</button>
                    </div>
                </div>
                {
                    this.state.hours.map(attendance => {
                        return (
                            <div className='classTaughtDiv' key={attendance}>
                                <p className='date'>{attendance.date}</p>
                                <div className='classInfoDiv'>
                                    <div id='info'>
                                        <p>ID </p>
                                        <p>{attendance.user_id}</p>
                                    </div>
                                    <div id='info'>
                                        <p>Student </p>
                                        <p>{attendance.user_name}</p>
                                    </div>
                                    <div id='info'>
                                        <p>Title </p>
                                        <p>{attendance.title}</p>
                                    </div>
                                    <div id='info'>
                                        <p>Length </p>
                                        <p>{attendance.length}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        users: state.users,
    }
}

export default connect(mapStateToProps, { getUsers })(TrackAttendance);
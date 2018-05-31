import React, { Component } from 'react';
import './TrackAttendance.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUsers } from '../../ducks/user';
import DatePicker from 'react-date-picker';


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
            <div className='trackAttendance'>
                <h1>Track Attendance</h1>
                <select onChange={e => this.setState({ user: e.target.value })}>
                <option value = '' >Student</option>
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

                <DatePicker className='datePicker' value={this.state.dateOne} onChange={e => this.setState({ dateOne: e })} />
                <DatePicker className='datePicker' value={this.state.dateTwo} onChange={e => this.setState({ dateTwo: e })} />

                    <button onClick={() => this.searchStudent()}>Search</button>
                {
                    this.state.hours.map(attendance => {
                        return (
                            <div key={attendance}>
                                <p>{attendance.date}</p>
                                <p>{attendance.user_id}</p>
                                <p>{attendance.user_name}</p>
                                <p>{attendance.class_id}</p>
                                <p>{attendance.title}</p>
                                <p>{attendance.length}</p>
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
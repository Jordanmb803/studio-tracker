import React, { Component } from 'react';
import './CreatePrivateCourse.css';
import { getUsers } from '../../ducks/user';
import { connect } from 'react-redux';
import axios from 'axios';


class CreatePrivateCourse extends Component {
    constructor() {
        super()
        this.state = {
            student_name: '',
            length: 0,
            day: '',
            time: '',
            teacher_id: 0,
        }
        this.addPrivateCourse = this.addPrivateCourse.bind(this)
    }

    componentDidMount() {
        const { teacher_id } = this.props.match.params
        this.props.getUsers()

        this.setState({
            teacher_id: teacher_id
        })
    }

    addPrivateCourse() {
        let user = this.props.users.find(user => {
            if (user.user_id === Number(this.state.teacher_id)) {
                return user.user_name
            }
        })

        let teacher_name = user.user_name

        let { student_name, length, day, time, teacher_id } = this.state

        axios.post('/privates/createprivate', { student_name, length, day, time, teacher_name, teacher_id })
            .then(res => {
                this.props.history.push('/dailyview')
                console.log('privateCreated')
            })

    }

    render() {
        console.log('test')
        return (
            <div className='dailyView'>
                <h1 className='thHeader'>Create Private Class</h1>
                <div className='privatesInfoDiv'>
                    <input className='privateInfo' placeholder='Student Name' onChange={e => this.setState({ student_name: e.target.value })} />
                    <select className='privateInfo' onChange={e => this.setState({ length: e.target.value })}>
                        <option value=''>Length</option>
                        <option value='60'>1 Hour</option>
                        <option value='90'>1 1/2 Hours</option>
                    </select>

                    <select className='privateInfo' onChange={e => this.setState({ day: e.target.value })}>
                        <option value=''>Day</option>
                        <option value='S'>Sunday</option>
                        <option value='M'>Monday</option>
                        <option value='T'>Tuesday</option>
                        <option value='W'>Wednesday</option>
                        <option value='TH'>Thursday</option>
                        <option value='F'>Friday</option>
                        <option value='SAT'>Saturday</option>
                    </select >

                    <select className='privateInfo' onChange={e => this.setState({ time: e.target.value })}>
                        <option value=''>Time</option>
                        <option value='9am'>9am</option>
                        <option value='10am'>10am</option>
                        <option value='10am'>11am</option>
                        <option value='10am'>12pm</option>
                        <option value='10am'>1pm</option>
                        <option value='10am'>2pm</option>
                        <option value='10am'>3pm</option>
                        <option value='10am'>4pm</option>
                        <option value='10am'>5pm</option>
                        <option value='10am'>6pm</option>
                        <option value='10am'>7pm</option>
                        <option value='10am'>8pm</option>
                        <option value='10am'>9pm</option>
                    </select>

                    <button onClick={() => this.addPrivateCourse()}>Schedule</button>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps, { getUsers })(CreatePrivateCourse);
import React, { Component } from 'react';
import './TrackHours.css';
import DatePicker from 'react-date-picker';
import { connect } from 'react-redux';
import { getUsers } from '../../ducks/user';
import axios from 'axios';

class TrackHours extends Component {
    constructor() {
        super()
        this.state = {
            dateOne: ''
            , dateTwo: ''
            , user: 0
            , hours: []
            , total: []
        }
        this.searchHours = this.searchHours.bind(this)
    }

    componentDidMount() {
        this.props.getUsers()
    }

    searchHours() {
        const { dateOne, dateTwo, user } = this.state

        const firstDate = `'${dateOne.getFullYear()}-${dateOne.getMonth()}-${dateOne.getDate()}'`
        const secondDate = `'${dateTwo.getFullYear()}-${dateTwo.getMonth()}-${dateTwo.getDate()}'`

        axios.post('/hours/teachers', { firstDate, secondDate, user }).then(res => {
            this.setState({
                hours: res.data
            })
        })

        axios.post('/hours/teachers/total', { firstDate, secondDate, user }).then(res => {
            this.setState({
                total: res.data
            })
        })

    }


    render() {
        return (
            <div className='TrackHours'>
                <h1 className='thHeader'>Employee Hours</h1>

                <div className='dateSelectorDiv'>
                    <div className='dateTitleCol'>
                        <p>From: </p><DatePicker calendarClassName='datePickerTH' value={this.state.dateOne} onChange={e => this.setState({ dateOne: e })} />
                        <select className='selectTeacher' onChange={e => this.setState({ user: e.target.value })}>
                            <option value=''>Teacher</option>
                            {
                                this.props.users.filter(user => {
                                    return user.type === 'teacher'
                                }).map((teacher, i) => {
                                    return (
                                        <option key={teacher.user_id + i} value={teacher.user_id} >{teacher.user_name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='dateTitleCol'>
                        <p>To: </p><DatePicker calendarClassName='datePickerTH' value={this.state.dateTwo} onChange={e => this.setState({ dateTwo: e })} />
                        <button className='searchButton' onClick={() => this.searchHours()}>Search</button>
                    </div>
                </div>
                {
                    this.state.hours.map((teacher, i) => {

                        return (
                            <div className='classTaughtDiv' key={teacher + i}>

                                <p className='date'>{teacher.date}</p>
                                <div className='classInfoDiv'>
                                    <div className='info'>
                                        <p id='label'>ID: </p>
                                        <p>{teacher.user_id}</p>
                                    </div>
                                    <div className='info'>
                                        <p id='label'>Teacher: </p>
                                        <p>{teacher.user_name}</p>
                                    </div>
                                    <div className='info'>
                                        <p id='label'>Class: </p>
                                        <p>{teacher.title}</p>
                                    </div>
                                    <div className='info'>
                                        <p id='label'>Length: </p>
                                        <p>{teacher.length}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

                {
                    this.state.total.map((total, i) => {
                        return (
                            <div key={total + i}>
                                <p id='totalHours'>Total Hours: {total.sum}</p>
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
        users: state.users
    }
}

export default connect(mapStateToProps, { getUsers })(TrackHours);
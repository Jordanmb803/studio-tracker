import React, { Component } from 'react';
import './TrackHours.css';
import DatePicker from 'react-date-picker';
import { connect } from 'react-redux';
import { getUsers } from '../../ducks/user';
import axios from 'axios';
import moment from 'moment';

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
        let { dateOne, dateTwo, user } = this.state
        console.log(dateOne, dateTwo)

        let firstDate = `'${dateOne.getFullYear()}-${dateOne.getMonth() + 1}-${dateOne.getDate()}'`
        let secondDate = `'${dateTwo.getFullYear()}-${dateTwo.getMonth() + 1}-${dateTwo.getDate()}'`
        

        axios.post('/hours/teachers', { firstDate, secondDate, user }).then(res => {
            console.log(firstDate, secondDate, user)
            this.setState({
                hours: res.data
            })
            this.componentDidMount()
            
        })

        axios.post('/hours/teachers/total', { firstDate, secondDate, user }).then(res => {
            this.setState({
                total: res.data,
            })
            this.componentDidMount()
        })


    }

    
    
    render() {
        
        return (
            <div className='TrackHours'>
                <h1 className='thHeader'>Employee Hours</h1>

                <div className='dateSelectorDiv'>
                    <div className='dateTitleCol'>
                        <p className='toFromDate'>From: </p><DatePicker calendarClassName='datePickerTH' value={this.state.dateOne} onChange={e => this.setState({ dateOne: e })} />
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
                    <div id='rightCol' className='dateTitleCol'>
                        <p className='toFromDate'>To: </p><DatePicker calendarClassName='datePickerTH' value={this.state.dateTwo} onChange={e => this.setState({ dateTwo: e })} />
                        <button className='searchButton' onClick={() => this.searchHours()}>Search</button>
                    </div>
                </div>
                {
                    this.state.hours.map((teacher, i) => {

                        return (
                            <div className='classTaughtDiv' key={teacher + i}>

                                <p className='date'>{moment(teacher.date).format('MMM Do YYYY')}</p>
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
                                <p id='totalHours'>Total Hours: {total.sum / 60}</p>
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
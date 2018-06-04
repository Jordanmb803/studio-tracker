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
                <h1 className='thHeader'>Track Hours</h1>

                <div className='dateSelectorDiv'>
                    <div className='dateTitleCol'>
                        <p>From: </p><DatePicker className='datePickerTH' value={this.state.dateOne} onChange={e => this.setState({ dateOne: e })} />
                    </div>
                    <div className='dateTitleCol'>
                        <p>To: </p><DatePicker className='datePickerTH' value={this.state.dateTwo} onChange={e => this.setState({ dateTwo: e })} />
                    </div>
                </div>
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
                <button onClick={() => this.searchHours()}>Search</button>
                {
                    this.state.hours.map( (teacher, i) => {

                        return (
                            <div key={teacher + i}>
                                <p>{teacher.date}</p>
                                <p>{teacher.user_id}</p>
                                <p>{teacher.user_name}</p>
                                <p>{teacher.title}</p>
                                <p>{teacher.length}</p>
                            </div>
                        )
                    })
                }

                {
                    this.state.total.map((total, i) => {
                        return (
                            <div key={total + i}>
                                <p>Total Hours: {total.sum}</p>
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
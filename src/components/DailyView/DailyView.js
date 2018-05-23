import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DailyView.css';
import axios from 'axios';
import { getUser } from '../../ducks/user';
import DatePicker from 'react-date-picker';

class DailyView extends Component {
    constructor() {
        super()
        this.state = {
            todaysClasses: [],
            days: ['S', 'M', 'T', 'W', 'TH', 'F', 'SAT'],
            today: new Date(),
            user_id: 1
        }
    }
    componentDidMount() {
        let { days, today, user_id } = this.state

        console.log(user_id)

        this.props.getUser()

        axios.get(`/todayclasses/${days[today.getDay()]}/${user_id}`).then(res => {
            console.log(res.data)
            this.setState({
                todaysClasses: res.data
            })
        })
    }
    // need a function that fires when a date selector is changed that will change the value of selectDate

    render() {
        let { today } = this.state
        let lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)

        console.log(this.state.todaysClasses, this.props)
        return (
            <div className='dailyView'>
                <h3>{this.props.user.user_name}'s Schedule</h3>
                <p>{`${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`}</p>

                <DatePicker />

                <div className='schedule'>
                    <div className='scheduleLabBox'>
                        <p className='scheduleLab'>9am:</p>
                        <p className='scheduleLab'>10am:</p>
                        <p className='scheduleLab'>11am:</p>
                        <p className='scheduleLab'>12pm:</p>
                        <p className='scheduleLab'>1pm:</p>
                        <p className='scheduleLab'>2pm:</p>
                        <p className='scheduleLab'>3pm:</p>
                        <p className='scheduleLab'>4pm:</p>
                        <p className='scheduleLab'>5pm:</p>
                        <p className='scheduleLab'>6pm:</p>
                        <p className='scheduleLab'>7pm:</p>
                        <p className='scheduleLab'>8pm:</p>
                        <p className='scheduleLab'>9pm:</p>
                        <p className='scheduleLab'>10pm:</p>
                    </div>
                    <div className='classBox'>
                        {this.state.todaysClasses.map((danceClass, i) => {
                            return (
                                <div key={i}><p className='class'>{danceClass.title}</p></div>
                            )
                        })}

                    </div>
                </div>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}


export default connect(mapStateToProps, { getUser })(DailyView);
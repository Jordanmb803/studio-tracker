import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DailyView.css';
import axios from 'axios';

class DailyView extends Component {
    constructor() {
        super()
        this.state = {
            todaysClasses: [],
            days: ['S', 'M', 'T', 'W', 'TH', 'F', 'SAT'],
            today: new Date()
        }
    }
    componentDidMount() {
        const { days, today } = this.state
        console.log(days[today.getDay()])
        axios.get(`/todayclasses/${days[today.getDay()]}`).then(res => {
            console.log(res.data)
            this.setState({
                todaysClasses: res.data
            })
        })
    }
    // need a function that fires when a date selector is changed that will change the value of selectDate

    render() {
        const { today } = this.state

        console.log(this.props.user)
        console.log(this.state.todaysClasses)
        return (
            <div className='dailyView'>
                <h3>{this.props.user.user_name}'s Schedule</h3>
                <p>{`${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`}</p>
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
                        {this.state.todaysClasses.map( (danceClass, i) => {
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


export default connect(mapStateToProps)(DailyView);
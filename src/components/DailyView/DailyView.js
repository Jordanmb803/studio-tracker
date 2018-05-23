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
            danceClasses: [],
            days: ['S', 'M', 'T', 'W', 'TH', 'F', 'SAT'],
            today: new Date()
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.changeDate = this.changeDate.bind(this)
        // this.componentWillUpdate = this.componentWillUpdate.bind(this)
    }



    // componentDidMount() {
    //     let { days, today, user_id } = this.state
    //     this.props.getUser()
    //     axios.get(`/todayclasses/${days[today.getDay()]}/${user_id}`).then(res => {
    //         this.setState({
    //             todaysClasses: res.data,
    //         })
    //     })
    // }


    componentDidMount() {
        this.props.getUser()
        axios.get(`/danceclasses`).then(res => {
            this.setState({
                danceClasses: res.data
            })
        })
    }

    changeDate = today => this.setState({ today })



    render() {
        let { today } = this.state

        console.log(this.props.user)


        return (
            <div className='dailyView'>
                <h3>{this.props.user.user_name}'s Schedule</h3>
                <DatePicker value={today} onChange={this.changeDate} />

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
                        {this.state.danceClasses.filter(course => {
                            return course.teacher_id == this.props.user.user_id && course.day == this.state.days[today.getDay()]
                        }).map((course, i) => {
                            return (
                                <div key={i}>
                                    <p className='course'>{course.title}</p>
                                </div>
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
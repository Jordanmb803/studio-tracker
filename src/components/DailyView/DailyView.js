import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DailyView.css';
import axios from 'axios';
import { getUser } from '../../ducks/user';
import DatePicker from 'react-date-picker';
import { Link } from 'react-router-dom';

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
    }

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

        return (
            <div className='dailyView'>
                <h3>{this.props.user.user_name}'s Schedule</h3>
                <DatePicker className='datePicker' value={today} onChange={this.changeDate} />

                <div className='schedule'>


                    <div className='classTime'> <p className='scheduleLab'>9am:</p>{this.state.danceClasses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '9am'
                    }).map((course, i) => {
                        return (
                            <Link to={`/displayview/${course.title}`}><div className='courseBox' key={i}>
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}</div>


                    <div className='classTime'> <p className='scheduleLab'>10am:</p>{this.state.danceClasses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '10am'
                    }).map((course, i) => {
                        return (
                            <Link to={`/displayview/${course.title}`}><div className='courseBox' key={i}>
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}</div>


                    <div className='classTime'> <p className='scheduleLab'>11am:</p>{this.state.danceClasses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '11am'
                    }).map((course, i) => {
                        return (
                            <Link to={`/displayview/${course.title}`}> <div className='courseBox' key={i}>
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}</div>


                    <div className='classTime'> <p className='scheduleLab'>12pm:</p>{this.state.danceClasses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '12pm'
                    }).map((course, i) => {
                        return (
                            <Link to={`/displayview/${course.title}`}><div className='courseBox' key={i}>
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}</div>


                    <div className='classTime'> <p className='scheduleLab'>1pm:</p>{this.state.danceClasses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '1pm'
                    }).map((course, i) => {
                        return (
                            <Link to={`/displayview/${course.title}`}><div className='courseBox' key={i}>
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}</div>


                    <div className='classTime'> <p className='scheduleLab'>2pm:</p>{this.state.danceClasses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '2pm'
                    }).map((course, i) => {
                        return (
                            <Link to={`/displayview/${course.title}`}><div className='courseBox' key={i}>
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}</div>


                    <div className='classTime'> <p className='scheduleLab'>3pm:</p>{this.state.danceClasses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '3pm'
                    }).map((course, i) => {
                        return (
                            <Link to={`/displayview/${course.title}`}><div className='courseBox' key={i}>
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}</div>


                    <div className='classTime'> <p className='scheduleLab'>4pm:</p>{this.state.danceClasses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '4pm'
                    }).map((course, i) => {
                        return (
                            <Link to={`/displayview/${course.title}`}><div className='courseBox' key={i}>
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}</div>


                    <div className='classTime'> <p className='scheduleLab'>5pm:</p>{this.state.danceClasses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '5pm'
                    }).map((course, i) => {
                        return (
                            <Link to={`/displayview/${course.title}`}><div className='courseBox' key={i}>
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}</div>

                    <div className='classTime'> <p className='scheduleLab'>6pm:</p>{this.state.danceClasses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '6pm'
                    }).map((course, i) => {
                        return (
                            <Link to={`/displayview/${course.title}`}><div className='courseBox' key={i}>
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}</div>


                    <div className='classTime'> <p className='scheduleLab'>7pm:</p>{this.state.danceClasses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '7pm'
                    }).map((course, i) => {
                        return (
                            <Link to={`/displayview/${course.title}`}><div className='courseBox' key={i}>
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}</div>


                    <div className='classTime'> <p className='scheduleLab'>8pm:</p>{this.state.danceClasses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '8pm'
                    }).map((course, i) => {
                        return (
                            <Link to={`/displayview/${course.title}`}><div className='courseBox' key={i}>
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}</div>


                    <div className='classTime'> <p className='scheduleLab'>9pm:</p>{this.state.danceClasses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '9pm'
                    }).map((course, i) => {
                        return (
                            <Link to={`/displayview/${course.title}`}><div className='courseBox' key={i}>
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}</div>


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
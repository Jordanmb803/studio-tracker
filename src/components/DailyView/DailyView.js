import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DailyView.css';
import { getUser, getCourses, changeDate } from '../../ducks/user';
import DatePicker from 'react-date-picker';
import { Link } from 'react-router-dom';

class DailyView extends Component {
    constructor() {
        super()
        this.state = {
            days: ['S', 'M', 'T', 'W', 'TH', 'F', 'SAT']
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        this.props.getUser()
        this.props.getCourses()
    }


    render() {
        let { today } = this.props

        return (
            <div className='dailyView'>
                <h3 id='teacherName'>{this.props.user.user_name}'s Schedule</h3>

                <DatePicker className='datePicker' value={today} onChange={e => this.props.changeDate(e)} />

                <div className='schedule'>
                    <div className='classTime'> <p className='scheduleLab'>9am:</p>{this.props.danceCourses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '9am'
                    }).map((course, i) => {
                        return (
                            <Link key={i} to={`/dailyview/${course.title}/${course.class_id}/${course.teacher_id}`}><div className='courseBox'>
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}</div>


                    <div className='classTime'> <p className='scheduleLab'>10am:</p>{this.props.danceCourses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '10am'
                    }).map((course, i) => {
                        return (
                            <Link key={i} to={`/dailyview/${course.title}/${course.class_id}`}><div className='courseBox'>
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}</div>


                    <div className='classTime'> <p className='scheduleLab'>11am:</p>{this.props.danceCourses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '11am'
                    }).map((course, i) => {
                        return (
                            <Link key={i} to={`/dailyview/${course.title}/${course.class_id}`}> <div className='courseBox'>
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}</div>


                    <div className='classTime'> <p className='scheduleLab'>12pm:</p>{this.props.danceCourses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '12pm'
                    }).map((course, i) => {
                        return (
                            <Link key={i} to={`/dailyview/${course.title}/${course.class_id}`}><div className='courseBox'>
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}</div>


                    <div className='classTime'> <p className='scheduleLab'>1pm:</p>{this.props.danceCourses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '1pm'
                    }).map((course, i) => {
                        return (
                            <Link key={i} to={`/dailyview/${course.title}/${course.class_id}`}><div className='courseBox' >
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}</div>


                    <div className='classTime'> <p className='scheduleLab'>2pm:</p>{this.props.danceCourses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '2pm'
                    }).map((course, i) => {
                        return (
                            <Link key={i} to={`/dailyview/${course.title}/${course.class_id}`}><div className='courseBox' >
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}</div>


                    <div className='classTime'> <p className='scheduleLab'>3pm:</p>{this.props.danceCourses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '3pm'
                    }).map((course, i) => {
                        return (
                            <Link key={i} to={`/dailyview/${course.title}/${course.class_id}`}><div className='courseBox' >
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}</div>


                    <div className='classTime'> <p className='scheduleLab'>4pm:</p>{this.props.danceCourses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '4pm'
                    }).map((course, i) => {
                        return (
                            <Link key={i} to={`/dailyview/${course.title}/${course.class_id}`}><div className='courseBox'>
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}</div>


                    <div className='classTime'> <p className='scheduleLab'>5pm:</p>{this.props.danceCourses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '5pm'
                    }).map((course, i) => {
                        return (
                            <Link key={i} to={`/dailyview/${course.title}/${course.class_id}`}><div className='courseBox'>
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}</div>

                    <div className='classTime'> <p className='scheduleLab'>6pm:</p>{this.props.danceCourses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '6pm'
                    }).map((course, i) => {
                        return (
                            <Link key={i} to={`/dailyview/${course.title}/${course.class_id}`}><div className='courseBox'>
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}</div>


                    <div className='classTime'> <p className='scheduleLab'>7pm:</p>{this.props.danceCourses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '7pm'
                    }).map((course, i) => {
                        return (
                            <Link key={i} to={`/dailyview/${course.title}/${course.class_id}/${course.teacher_id}`}><div className='courseBox' >
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}</div>


                    <div className='classTime'> <p className='scheduleLab'>8pm:</p>{this.props.danceCourses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '8pm'
                    }).map((course, i) => {
                        return (
                            <Link key={i} to={`/dailyview/${course.title}/${course.class_id}`}><div className='courseBox'>
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}</div>


                    <div className='classTime'> <p className='scheduleLab'>9pm:</p>{this.props.danceCourses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '9pm'
                    }).map((course, i) => {
                        return (
                            <Link key={i} to={`/dailyview/${course.title}/${course.class_id}`}><div className='courseBox'>
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
        user: state.user,
        danceCourses: state.danceCourses,
        today: state.today
    }
}


export default connect(mapStateToProps, { getUser, getCourses, changeDate })(DailyView);
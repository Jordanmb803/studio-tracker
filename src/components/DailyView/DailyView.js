import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DailyView.css';
import { getUser, getCourses, changeDate } from '../../ducks/user';
import DatePicker from 'react-date-picker';
import { Link } from 'react-router-dom';
import leftArrow from './left-arrow.png';
import rightArrow from './right-arrow.png';
import moment from 'moment';
import axios from 'axios';
import BigPlusIcon from '../Courses/big-plus-icon.png';
// import WhiteIcon from '../Courses/delete-icon.png';
import WhiteIcon from './whtie-x-icon.png';
// import CreatePrivateCourse from '../CreatePrivateCourse/CreatePrivateCourse';


class DailyView extends Component {
    constructor() {
        super()
        this.state = {
            days: ['S', 'M', 'T', 'W', 'TH', 'F', 'SAT'],
            times: ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm'],
            privates: []
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.yesterday = this.yesterday.bind(this)
        this.tomorrow = this.tomorrow.bind(this)
        this.deletePrivate = this.deletePrivate.bind(this)
    }

    componentDidMount() {
        this.props.getUser()
        this.props.getCourses()

        axios.get('/privates/getallprivates').then(res => {
            this.setState({
                privates: res.data
            })
        })
    }

    yesterday() {
        let momentToday = moment(this.props.today)
        let yesterday = momentToday.clone().subtract(1, 'day')//.format('MM DD, YYYY')

        let yesterdaysDate = new Date(yesterday)
        this.props.changeDate(yesterdaysDate)
    }

    tomorrow() {

        let momentToday = moment(this.props.today)
        let tomorrow = momentToday.clone().add(1, 'day')//.format('MM DD, YYYY')

        let tomorrowsDate = new Date(tomorrow)
        this.props.changeDate(tomorrowsDate)

        // axios.post('/api/console', {momentToday, tomorrow, tomorrowsDate, ...this.props})

    }

    deletePrivate(private_id) {
        axios.delete(`/privates/deleteprivate/${private_id}`).then(res => {
            this.componentDidMount()
        })
    }

    render() {
        let { today } = this.props
        console.log(this.props.danceCourses)

        return (
            <div className='dailyView'>
                <h3 id='teacherName'>{this.props.user.user_name}'s Schedule</h3>
                <div className='datePickerDiv'>
                    <img className='dateToggle' alt='left arrow' src={leftArrow} onClick={() => this.yesterday()} />
                    <DatePicker calendarClassName='datePicker' value={today} onChange={e => this.props.changeDate(e)} />
                    <img className='dateToggle' alt='right arrow' src={rightArrow} onClick={() => this.tomorrow()} />
                </div>
                <div className='schedule'>
                    <div>
                        {this.state.times.map((time, i) => (
                            <div className='classTime' key={i}>
                                <p className='scheduleLab'>{time}</p>
                                {
                                    this.props.danceCourses.filter(course => {
                                        console.log(course.time, time)
                                        return course.teacher_id === this.props.user.user_id
                                            && course.day === this.state.days[today.getDay()]
                                            && course.time === time
                                    }).map((course, i) => {
                                        return (
                                            <Link id='atag' key={i} to={`/nav/dailyview/${course.title}/${course.class_id}/${course.teacher_id}`}><div className='courseBox'>
                                                <p className='course'>{course.title}</p>
                                            </div></Link>
                                        )
                                    })}
                                {
                                    this.state.privates.filter(privateC => {
                                        return privateC.teacher_id === this.props.user.user_id && privateC.day === this.state.days[today.getDay()] && privateC.time === time
                                    }).map((privateCourse, i) => {
                                        return (
                                            <div key={privateCourse.teacher_id + i} id='atag' className='courseBox' >
                                                <p className='course'>{privateCourse.student_name}</p>
                                                <img src={WhiteIcon} alt='delete' className='deleteEditIcons' onClick={() => this.deletePrivate(privateCourse.private_id)} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ))}
                    </div>
                </div>

                <Link to={`/nav/create/privatescourse/${this.props.user.user_id}`} ><img src={BigPlusIcon} alt='addCourse' id='ccButton' /></Link>
                {/* <CreatePrivateCourse /> */}
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
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
import DeleteIcon from '../Courses/delete-icon.png';
import WhiteIcon from './whtie-x-icon.png';
// import CreatePrivateCourse from '../CreatePrivateCourse/CreatePrivateCourse';


class DailyView extends Component {
    constructor() {
        super()
        this.state = {
            days: ['S', 'M', 'T', 'W', 'TH', 'F', 'SAT'],
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

    deletePrivate(private_id){
        axios.delete(`/privates/deleteprivate/${private_id}`).then(res => {
            this.componentDidMount()
        })
    }

    render() {
        let { today } = this.props

        return (
            <div className='dailyView'>
                <h3 id='teacherName'>{this.props.user.user_name}'s Schedule</h3>
                <div className='datePickerDiv'>
                    <img className='dateToggle' alt='left arrow' src={leftArrow} onClick={() => this.yesterday()} />
                    <DatePicker calendarClassName='datePicker' value={today} onChange={e => this.props.changeDate(e)} />
                    <img className='dateToggle' alt='right arrow' src={rightArrow} onClick={() => this.tomorrow()} />
                </div>
                <div className='schedule'>
                    <div className='classTime'> <p className='scheduleLab'>9am:</p>{this.props.danceCourses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '9am'
                    }).map((course, i) => {
                        return (
                            <Link id='atag' key={i} to={`/dailyview/${course.title}/${course.class_id}/${course.teacher_id}`}><div className='courseBox'>
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}
                     {
                        this.state.privates.filter(privateC => {
                            return privateC.teacher_id === this.props.user.user_id && privateC.day === this.state.days[today.getDay()] && privateC.time === '9am'
                        }).map( (privateCourse, i) => {
                            return (
                               <div key={privateCourse.teacher_id + i} id='atag' className='courseBox' >
                                    <p className='course'>{privateCourse.student_name}</p>
                                    <img src={WhiteIcon} alt='delete' className='deleteEditIcons' onClick={()=> this.deletePrivate(privateCourse.private_id)} />
                                </div>
                            )
                        })
                    }
                    </div>


                    <div className='classTime'> <p className='scheduleLab'>10am:</p>{this.props.danceCourses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '10am'
                    }).map((course, i) => {
                        return (
                            <Link id='atag' key={i} to={`/dailyview/${course.title}/${course.class_id}/${course.teacher_id}`}><div className='courseBox'>
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}
                     {
                        this.state.privates.filter(privateC => {
                            return privateC.teacher_id === this.props.user.user_id && privateC.day === this.state.days[today.getDay()] && privateC.time === '10am'
                        }).map((privateCourse, i) => {
                            return (
                               <div key={privateCourse.teacher_id + i} id='atag' className='courseBox' >
                                    <p className='course'>{privateCourse.student_name}</p>
                                    <img src={DeleteIcon} alt='delete' className='deleteEditIcons' onClick={()=> this.deletePrivate(privateCourse.private_id)} />
                                </div>
                            )
                        })
                    }
                    </div>


                    <div className='classTime'> <p className='scheduleLab'>11am:</p>{this.props.danceCourses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '11am'
                    }).map((course, i) => {
                        return (
                            <Link id='atag' key={i} to={`/dailyview/${course.title}/${course.class_id}/${course.teacher_id}`}> <div className='courseBox'>
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}
                     {
                        this.state.privates.filter(privateC => {
                            return privateC.teacher_id === this.props.user.user_id && privateC.day === this.state.days[today.getDay()] && privateC.time === '11am'
                        }).map((privateCourse, i) => {
                            return (
                               <div key={privateCourse.teacher_id + i} id='atag' className='courseBox' >
                                    <p className='course'>{privateCourse.student_name}</p>
                                    <img src={DeleteIcon} alt='delete' className='deleteEditIcons' onClick={()=> this.deletePrivate(privateCourse.private_id)} />
                                </div>
                            )
                        })
                    }
                    </div>


                    <div className='classTime'> <p className='scheduleLab'>12pm:</p>{this.props.danceCourses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '12pm'
                    }).map((course, i) => {
                        return (
                            <Link id='atag' key={i} to={`/dailyview/${course.title}/${course.class_id}/${course.teacher_id}`}><div className='courseBox'>
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}
                    {
                        this.state.privates.filter(privateC => {
                            return privateC.teacher_id === this.props.user.user_id && privateC.day === this.state.days[today.getDay()] && privateC.time === '12pm'
                        }).map((privateCourse, i) => {
                            return (
                               <div key={privateCourse.teacher_id + i} id='atag' className='courseBox' >
                                    <p className='course'>{privateCourse.student_name}</p>
                                    <img src={DeleteIcon} alt='delete' className='deleteEditIcons' onClick={()=> this.deletePrivate(privateCourse.private_id)} />
                                </div>
                            )
                        })
                    }
                    
                    </div>


                    <div className='classTime'> <p className='scheduleLab'>1pm:</p>{this.props.danceCourses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '1pm'
                    }).map((course, i) => {
                        return (
                            <Link id='atag' key={i} to={`/dailyview/${course.title}/${course.class_id}/${course.teacher_id}`}><div className='courseBox' >
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}
                     {
                        this.state.privates.filter(privateC => {
                            return privateC.teacher_id === this.props.user.user_id && privateC.day === this.state.days[today.getDay()] && privateC.time === '1pm'
                        }).map((privateCourse, i) => {
                            return (
                               <div key={privateCourse.teacher_id + i} id='atag' className='courseBox' >
                                    <p className='course'>{privateCourse.student_name}</p>
                                    <img src={DeleteIcon} alt='delete' className='deleteEditIcons' onClick={()=> this.deletePrivate(privateCourse.private_id)} />
                                </div>
                            )
                        })
                    }
                    </div>


                    <div className='classTime'> <p className='scheduleLab'>2pm:</p>{this.props.danceCourses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '2pm'
                    }).map((course, i) => {
                        return (
                            <Link id='atag' key={i} to={`/dailyview/${course.title}/${course.class_id}/${course.teacher_id}`}><div className='courseBox' >
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}
                     {
                        this.state.privates.filter(privateC => {
                            return privateC.teacher_id === this.props.user.user_id && privateC.day === this.state.days[today.getDay()] && privateC.time === '2pm'
                        }).map((privateCourse, i) => {
                            return (
                               <div key={privateCourse.teacher_id + i} id='atag' className='courseBox' >
                                    <p className='course'>{privateCourse.student_name}</p>
                                    <img src={DeleteIcon} alt='delete' className='deleteEditIcons' onClick={()=> this.deletePrivate(privateCourse.private_id)} />
                                </div>
                            )
                        })
                    }
                    </div>


                    <div className='classTime'> <p className='scheduleLab'>3pm:</p>{this.props.danceCourses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '3pm'
                    }).map((course, i) => {
                        return (
                            <Link id='atag' key={i} to={`/dailyview/${course.title}/${course.class_id}/${course.teacher_id}`}><div className='courseBox' >
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}
                     {
                        this.state.privates.filter(privateC => {
                            return privateC.teacher_id === this.props.user.user_id && privateC.day === this.state.days[today.getDay()] && privateC.time === '3pm'
                        }).map((privateCourse, i) => {
                            return (
                               <div key={privateCourse.teacher_id + i} id='atag' className='courseBox' >
                                    <p className='course'>{privateCourse.student_name}</p>
                                    <img src={DeleteIcon} alt='delete' className='deleteEditIcons' onClick={()=> this.deletePrivate(privateCourse.private_id)} />
                                </div>
                            )
                        })
                    }
                    
                    </div>


                    <div className='classTime'> <p className='scheduleLab'>4pm:</p>{this.props.danceCourses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '4pm'
                    }).map((course, i) => {
                        return (
                            <Link id='atag' key={i} to={`/dailyview/${course.title}/${course.class_id}/${course.teacher_id}`}><div className='courseBox'>
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}
                    
                    {
                        this.state.privates.filter(privateC => {
                            return privateC.teacher_id === this.props.user.user_id && privateC.day === this.state.days[today.getDay()] && privateC.time === '4pm'
                        }).map((privateCourse, i) => {
                            return (
                               <div key={privateCourse.teacher_id + i} id='atag' className='courseBox' >
                                    <p className='course'>{privateCourse.student_name}</p>
                                    <img src={DeleteIcon} alt='delete' className='deleteEditIcons' onClick={()=> this.deletePrivate(privateCourse.private_id)} />
                                </div>
                            )
                        })
                    }
                    </div>


                    <div className='classTime'> <p className='scheduleLab'>5pm:</p>{this.props.danceCourses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '5pm'
                    }).map((course, i) => {
                        return (
                            <Link id='atag' key={i} to={`/dailyview/${course.title}/${course.class_id}/${course.teacher_id}`}><div className='courseBox'>
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}
                     {
                        this.state.privates.filter(privateC => {
                            return privateC.teacher_id === this.props.user.user_id && privateC.day === this.state.days[today.getDay()] && privateC.time === '5pm'
                        }).map((privateCourse, i) => {
                            return (
                               <div key={privateCourse.teacher_id + i} id='atag' className='courseBox' >
                                    <p className='course'>{privateCourse.student_name}</p>
                                    <img src={DeleteIcon} alt='delete' className='deleteEditIcons' onClick={()=> this.deletePrivate(privateCourse.private_id)} />
                                </div>
                            )
                        })
                    }
                    </div>

                    <div className='classTime'> <p className='scheduleLab'>6pm:</p>{this.props.danceCourses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '6pm'
                    }).map((course, i) => {
                        return (
                            <Link id='atag' key={i} to={`/dailyview/${course.title}/${course.class_id}/${course.teacher_id}`}><div className='courseBox'>
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}
                     {
                        this.state.privates.filter(privateC => {
                            return privateC.teacher_id === this.props.user.user_id && privateC.day === this.state.days[today.getDay()] && privateC.time === '6pm'
                        }).map((privateCourse, i) => {
                            return (
                               <div key={privateCourse.teacher_id + i} id='atag'  className='courseBox' >
                                    <p className='course'>{privateCourse.student_name}</p>
                                    <img src={DeleteIcon} alt='delete' className='deleteEditIcons' onClick={()=> this.deletePrivate(privateCourse.private_id)} />
                                </div>
                            )
                        })
                    }
                    </div>


                    <div className='classTime'> <p className='scheduleLab'>7pm:</p>{this.props.danceCourses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '7pm'
                    }).map((course, i) => {
                        return (
                            <Link id='atag' key={i} to={`/dailyview/${course.title}/${course.class_id}/${course.teacher_id}`}><div className='courseBox' >
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}
                     {
                        this.state.privates.filter(privateC => {
                            return privateC.teacher_id === this.props.user.user_id && privateC.day === this.state.days[today.getDay()] && privateC.time === '7pm'
                        }).map((privateCourse, i) => {
                            return (
                               <div key={privateCourse.teacher_id + i} className='courseBox' >
                                    <p className='course'>{privateCourse.student_name}</p>
                                    <img src={DeleteIcon} alt='delete' className='deleteEditIcons' onClick={()=> this.deletePrivate(privateCourse.private_id)} />
                                </div>
                            )
                        })
                    }
                    </div>


                    <div className='classTime'> <p className='scheduleLab'>8pm:</p>{this.props.danceCourses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '8pm'
                    }).map((course, i) => {
                        return (
                            <Link id='atag' key={i} to={`/dailyview/${course.title}/${course.class_id}`}><div className='courseBox'>
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}
                    
                    {
                        this.state.privates.filter(privateC => {
                            return privateC.teacher_id === this.props.user.user_id && privateC.day === this.state.days[today.getDay()] && privateC.time === '8pm'
                        }).map((privateCourse, i) => {
                            return (
                               <div key={privateCourse.teacher_id + i} id='atag' className='courseBox' >
                                    <p className='course'>{privateCourse.student_name}</p>
                                    <img src={DeleteIcon} alt='delete' className='deleteEditIcons' onClick={()=> this.deletePrivate(privateCourse.private_id)} />
                                </div>
                            )
                        })
                    }</div>


                    <div className='classTime'> <p className='scheduleLab'>9pm:</p>{this.props.danceCourses.filter(course => {
                        return course.teacher_id === this.props.user.user_id && course.day === this.state.days[today.getDay()] && course.time === '9pm'
                    }).map((course, i) => {
                        return (
                            <Link id='atag' key={i} to={`/dailyview/${course.title}/${course.class_id}`}><div className='courseBox'>
                                <p className='course'>{course.title}</p>
                            </div></Link>
                        )
                    })}
                     {
                        this.state.privates.filter(privateC => {
                            return privateC.teacher_id === this.props.user.user_id && privateC.day === this.state.days[today.getDay()] && privateC.time === '9pm'
                        }).map( (privateCourse, i) => {
                            return (
                               <div key={privateCourse.teacher_id + i} id='atag' className='courseBox' >
                                    <p className='course'>{privateCourse.student_name}</p>
                                    <img src={DeleteIcon} alt='delete' className='deleteEditIcons' onClick={()=> this.deletePrivate(privateCourse.private_id)} />
                                </div>
                            )
                        })
                    }
                    </div>

                </div>
                <Link to={`/create/privatescourse/${this.props.user.user_id}`} id='createCourseBut' ><img src={BigPlusIcon}  alt='addCourse' id='ccButton'/></Link>
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
import React, { Component } from 'react';
import './CourseList.css';
import { connect } from 'react-redux';
import { getUsers } from '../../ducks/user';
import axios from 'axios';
import Student from '../Student/Student';

class CourseList extends Component {
    constructor() {
        super()
        this.state = {
            courseRoll: [],
            date: '',
            visable: true,
            addStudent: [],
            studentsInCourse: []
        }
        this.postHours = this.postHours.bind(this)
        this.deleteHours = this.deleteHours.bind(this)
        this.addStudent = this.addStudent.bind(this)
    }

    componentDidMount() {
        let { today } = this.props
        let date = `'${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}'`
        let class_id = this.props.match.params.classid

        this.props.getUsers()

        //checking to see if roll has already been submitted
        axios.get(`/hours/checkrollsubmission/${date}/${class_id}`).then(res => {
            if (res.data.length > 0) {
                this.setState({
                    visable: false
                })
            } else {
                this.setState({
                    visable: true
                })
            }

            // getting roll the for the class 
            let tempStudentsInCourse = []
            axios.get('/courseroll').then(res => {


                res.data.forEach(reg => {
                    if (reg.class_id === Number(this.props.match.params.classid)) {
                        tempStudentsInCourse.push(reg.user_id)
                    } else {

                    }
                })

                this.setState({
                    courseRoll: res.data,
                    date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
                    studentsInCourse: tempStudentsInCourse
                })

            })
        })

    }

    postHours() {
        const class_id = this.props.match.params.classid
        const user_id = this.props.match.params.userid
        const { date } = this.state
        axios.post(`/inputhours`, { user_id, class_id, date }).then(res => {
            this.setState({
                visable: false,
            })
            this.props.history.push('/dailyview')
        })
    }

    deleteHours() {
        const class_id = this.props.match.params.classid
        const { date } = this.state
        axios.delete(`/delete/allclassinput/${class_id}/${date}`).then(res => {
            this.setState({
                visable: true
            })
        })
    }

    addStudent(userid) {
        let user_id = Number(userid)
        let tempAddStudent = this.state.addStudent
        tempAddStudent.push(user_id)
        console.log(tempAddStudent, user_id)
        this.setState({
            addStudent: tempAddStudent
        })
    }


    render() {


        let displayStudent = this.state.courseRoll.filter(course => {
            return course.class_id === Number(this.props.match.params.classid)
        }).map((student, i) => {
            return (
                <div className={this.state.visable ? 'visable' : 'invisable'} key={student + i}>
                    <Student user_name={student.user_name}
                        user_id={student.user_id}
                        class_id={student.class_id}
                        date={this.state.date}
                    />
                </div>
            )
        })


        let add = this.props.users.filter(user => {
            console.log(this.state.addStudent, user.user_id)
            return this.state.addStudent.includes(user.user_id)
        }).map((student, i) => {
            console.log(student.user_id)
            return (
                <div className={this.state.visable ? 'visable' : 'invisable'} key={student + i}>
                    <Student user_name={student.user_name}
                        user_id={student.user_id}
                        class_id={this.props.match.params.classid}
                        date={this.state.date}
                    />
                </div>
            )
        })
        return (

            <div className='dailyView'>
                <div className='classDateDiv'>
                    <h1 id='courseListHeader' className='thHeader'>{this.props.match.params.course}</h1>
                    <h1 id='courseListHeader' className='thHeader'>{this.state.date}</h1>
                </div>
                <div className='attendanceRollDiv'>
                    {displayStudent}
                    {add}

                    <select className='makeUpStudent' onChange={e => this.addStudent(e.target.value)}>
                        <option value=''>Make Up Student</option>
                        {
                            this.props.users.filter(user => {
                                return !this.state.studentsInCourse.includes(user.user_id) && user.type === 'student'
                            }).map((student, i) => {
                                return (
                                    <option key={student.user_id + i} value={student.user_id}>{student.user_name}</option>
                                )
                            })
                        }

                    </select>
                    <button className={this.state.visable ? 'visable submitRoll' : 'invisable'} onClick={() => this.postHours()}>Submit Roll</button>
                    <button className={this.state.visable ? 'invisable' : 'visable submitRoll'} onClick={() => this.deleteHours()}>Re-Submit</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        danceCourses: state.danceCourses,
        today: state.today,
        users: state.users
    }
}

export default connect(mapStateToProps, { getUsers })(CourseList);
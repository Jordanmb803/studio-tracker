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
            addStudent: 0,
            studentsInCourse: []
        }
        this.postHours = this.postHours.bind(this)
        this.deleteHours = this.deleteHours.bind(this)
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

            let tempStudentsInCourse
            // getting roll the for the class 
            axios.get('/courseroll').then(res => {
                this.setState({
                    courseRoll: res.data,
                    date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
                })
                
            
                this.state.courseRoll.forEach(reg => {
                    if (reg.class_id === Number(this.props.match.params.class_id)) {
                        tempStudentsInCourse.push(reg.user_id)
                        this.setState({
                            studentsInCourse: tempStudentsInCourse
                        })
                    } else {
                        
                    }
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
        axios.delete(`/deleteinput/${class_id}/${date}`).then(res => {
            this.setState({
                visable: true
            })
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


        let addStudent = this.props.users.filter(user => {
            return user.user_id == this.state.addStudent
        }).map((student, i) => {
            console.log(student)
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
                    <h1 id='headerItems'>{this.props.match.params.course}</h1>
                    <h1 id='headerItems'>{this.state.date}</h1>
                </div>
                {displayStudent}
                {addStudent}

                <select onChange={e => this.setState({ addStudent: e.target.value })}>
                    <option value=''>Make Up Student</option>
                    {
                        this.props.users.filter(user => {
                            return !this.state.studentsInCourse.includes(user.user_id) && user.type === 'student'
                        }).map((student, i) => {
                            console.log(student)
                            return (
                                <option key={student.user_id + i} value={student.user_id}>{student.user_name}</option>
                            )
                        })
                    }

                </select>
                <button className={this.state.visable ? 'visable submitRoll' : 'invisable'} onClick={() => this.postHours()}>Submit Roll</button>
                <button className={this.state.visable ? 'invisable' : 'visable submitRoll'} onClick={() => this.deleteHours()}>Re-Submit</button>
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
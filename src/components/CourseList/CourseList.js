import React, { Component } from 'react';
import './CourseList.css';
import { connect } from 'react-redux';
import axios from 'axios';
import Student from '../Student/Student';

class CourseList extends Component {
    constructor() {
        super()
        this.state = {
            courseRoll: [],
            date: '',
            visable: true,
            redirect: false
        }
        this.postHours = this.postHours.bind(this)
        this.deleteHours = this.deleteHours.bind(this)
    }

    componentDidMount() {
        let { today } = this.props
        axios.get('/courseroll').then(res => {
            this.setState({
                courseRoll: res.data,
                date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
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
        })
    }

    deleteHours() {
        const class_id = this.props.match.params.classid
        const user_id = this.props.match.params.userid
        const { date } = this.state
        axios.delete(`/deleteinput/${user_id}/${class_id}/${date}`).then(res => {
            this.setState({
                visable: true
            })
        })
    }

    render() {

        let displayStudent = this.state.courseRoll.filter(course => {
            return course.class_id === Number(this.props.match.params.classid)
        }).map((student, i) => {
            console.log(student.user_id, student.class_id)
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

        return (
            <div className='dailyView'>
                <h3>{this.props.match.params.course}</h3>
                {displayStudent}
                <button className={this.state.visable ? 'visable submitRoll' : 'invisable'} onClick={() => this.postHours()}>Submit Roll</button>
                <button className={this.state.visable ? 'invisable' : 'visable submitRoll'} onClick={() => this.deleteHours()}>Re-Submit</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        danceCourses: state.danceCourses,
        today: state.today
    }
}

export default connect(mapStateToProps)(CourseList);
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
            visable: true
        }
        this.postHours = this.postHours.bind(this)
        this.deleteHours = this.deleteHours.bind(this)
    }

    componentDidMount() {
        let { today } = this.props
        let date = `'${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}'`
        let class_id = this.props.match.params.classid

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
            axios.get('/courseroll').then(res => {
                this.setState({
                    courseRoll: res.data,
                    date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
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

        return (
        
            <div className='dailyView'>
            <div className='classDateDiv'>
                <h1 id='headerItems'>{this.props.match.params.course}</h1>
                <h1 id='headerItems'>{this.state.date}</h1>
            </div>
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
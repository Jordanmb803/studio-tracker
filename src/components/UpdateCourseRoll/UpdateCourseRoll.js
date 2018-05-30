import React, { Component } from 'react';
import './UpdateCourseRoll.css';
import { getUsers } from '../../ducks/user';
import { connect } from 'react-redux';
import TAorStudent from '../TAorStudent/TAorStudent';
import { Link } from 'react-router-dom';
import axios from 'axios';

class UpdateCourseRoll extends Component {
    constructor() {
        super()
        this.state = {
            search: '',
            roll: [],
            usersInCourse: [],
            usersNotInCourse: []
        }
        this.resetUsersInCourse = this.resetUsersInCourse.bind(this)
    }

    componentDidMount() {
        this.props.getUsers()
        axios.get('/courseroll').then(res => {
            this.setState({
                roll: res.data
            })
            let tempUsersInCourse = []
            let tempUsersNotInCourse = []
            let usersInThisCourse = this.state.roll.forEach(reg => {
                if (reg.class_id === Number(this.props.match.params.class_id)) {
                    tempUsersInCourse.push(reg.user_id)
                    this.setState({
                        usersInCourse: tempUsersInCourse
                    })
                } else {
                    tempUsersNotInCourse.push(reg.user_id)
                    this.setState({
                        usersNotInCourse: tempUsersNotInCourse
                    })
                }
            })
        })
    }

    resetUsersInCourse() {
        this.setState({
            usersInCourse: []
        })
    }


    render() {
        console.log(this.state.usersInCourse)
        return (
            <div className='UpdateCourseRoll'>
                <input />

                {
                    this.props.users.filter(user => {
                        return !this.state.usersInCourse.includes(user.user_id) && user.type === 'student'
                    }).map(student => {
                        return (
                            <div>
                                <TAorStudent
                                    user_name={student.user_name}
                                    type={student.type}
                                    user_id={student.user_id}
                                    class_id={this.props.match.params.class_id}
                                />
                            </div>
                        )
                    })
                }
                <Link to='/courses'><button onClick={() => this.resetUsersInCourse()}>Update Roll</button></Link>

            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps, { getUsers })(UpdateCourseRoll);
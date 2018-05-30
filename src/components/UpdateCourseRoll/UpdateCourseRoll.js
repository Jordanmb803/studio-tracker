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
            roll: []
        }
    }

    componentDidMount() {
        this.props.getUsers()
        axios.get('/courseroll').then(res => {
            this.setState({
                roll: res.data
            })
        })
    }



    render() {
        let usersInCourse = []
        let usersInThisCourse = this.state.roll.forEach(reg => {
            if (reg.class_id === Number(this.props.match.params.class_id)) {
                usersInCourse.push(reg.user_id)
                console.log(usersInCourse)
            } else {
                console.log(usersInCourse)
            }
        })
        return (
            <div className='UpdateCourseRoll'>
                <input />

                {
                    this.props.users.filter(user => {
                        return !usersInCourse.includes(user.user_id) && user.type === 'student'
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
                <Link to='/courses'><button>Update Roll</button></Link>

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
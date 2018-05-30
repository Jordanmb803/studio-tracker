import React, { Component } from 'react';
import './RemoveUserFromRoll.css';
import { connect } from 'react-redux';
import { getUsers } from '../../ducks/user';
import axios from 'axios';
import MinusTAorStudent from '../MinusTAorStudent/MinusTAorStudent';

class RemoveUserFromRoll extends Component {
    constructor() {
        super()
        this.state = {
            roll: [],
            usersInCourse: []
        }
    }

    componentDidMount() {
        this.props.getUsers()
        axios.get('/courseroll').then(res => {
            this.setState({
                roll: res.data
            })
            let tempUsersInCourse = []
            this.state.roll.forEach(reg => {
                if (reg.class_id === Number(this.props.match.params.class_id)) {
                    tempUsersInCourse.push(reg.user_id)
                    this.setState({ usersInCourse: tempUsersInCourse })
                }
            })
        })
    }

    render() {
        return (
            <div className='removeUserFromRoll'>
                <h1>{this.props.match.params.course}</h1>
                {
                    this.props.users.filter(user => {
                        return this.state.usersInCourse.includes(user.user_id) && user.type === 'student'
                    }).map(student => {
                        return (
                            <div>
                              < MinusTAorStudent 
                                  user_name={student.user_name}
                                  type={student.type}
                                  user_id={student.user_id}
                                  class_id={this.props.match.params.class_id}
                              />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps, { getUsers })(RemoveUserFromRoll);

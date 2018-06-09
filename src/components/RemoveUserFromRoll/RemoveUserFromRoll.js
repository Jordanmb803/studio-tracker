import React, { Component } from 'react';
import './RemoveUserFromRoll.css';
import { connect } from 'react-redux';
import { getUsers, changeActiveTab } from '../../ducks/user';
import axios from 'axios';
import MinusTAorStudent from '../MinusTAorStudent/MinusTAorStudent';
import { Link } from 'react-router-dom';

class RemoveUserFromRoll extends Component {
    constructor() {
        super()
        this.state = {
            search: '',
            roll: [],
            usersInCourse: []
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
            this.state.roll.forEach(reg => {
                if (reg.class_id === Number(this.props.match.params.class_id)) {
                    tempUsersInCourse.push(reg.user_id)
                    this.setState({ usersInCourse: tempUsersInCourse })
                }
            })
        })
    }


    resetUsersInCourse() {
        this.setState({
            usersInCourse: []
        })
        this.props.changeActiveTab(2)
    }


    render() {
        return (
            <div id='UpdateCourseRoll' className='TrackHours'>
                <h1 className='thHeader'>Remove Students From {this.props.match.params.course}</h1>

                <input className='searchBar' placeholder='Search Student' onChange={e => this.setState({search: e.target.value})} />

                {
                    this.props.users.filter(user => {
                        return this.state.usersInCourse.includes(user.user_id) && user.type === 'student' && user.user_name.toLowerCase().includes(this.state.search.toLowerCase())
                    }).map((student, i) => {
                        return (
                            <div key={student + i}>
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

                <Link to='/adminlanding/courses'><button className='updateButton' id='enrollStudentsButton' onClick={() => this.resetUsersInCourse()}>Update Roll</button></Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.users,
        activeTab: state.activeTab
    }
}

export default connect(mapStateToProps, { getUsers, changeActiveTab })(RemoveUserFromRoll);

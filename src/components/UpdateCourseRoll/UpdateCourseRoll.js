import React, { Component } from 'react';
import './UpdateCourseRoll.css';
import { getUsers, changeActiveTab } from '../../ducks/user';
import { connect } from 'react-redux';
import TAorStudent from '../TAorStudent/TAorStudent';
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
            this.state.roll.forEach(reg => {
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
        this.props.changeActiveTab(2)
        this.props.history.push('/adminlanding/courses')
    }


    render() {
        console.log(this.props)
        return (
            <div id='UpdateCourseRoll' className='TrackHours'>
               <h1 className='thHeader'>Add Students to {this.props.match.params.course} </h1>
               
                <input className='searchBar' placeholder='Search Student' onChange={e => this.setState({search: e.target.value})} />

                {
                    this.props.users.filter(user => {
                        return !this.state.usersInCourse.includes(user.user_id) && user.type === 'student' && user.user_name.toLowerCase().includes(this.state.search.toLowerCase())
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
                
                <button className='updateButton' id='enrollStudentsButton' onClick={() => this.resetUsersInCourse()}>Update Roll</button>
    

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

export default connect(mapStateToProps, { getUsers, changeActiveTab })(UpdateCourseRoll);
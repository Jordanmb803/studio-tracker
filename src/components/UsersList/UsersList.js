import React, { Component } from 'react';
import './UsersList.css';
import { connect } from 'react-redux';
import { getUsers } from '../../ducks/user';
import EditIcon from '../Courses/edit-icon.png';
import DeleteIcon from '../Courses/delete-icon.png';
import BigPlusIcon from '../Courses/big-plus-icon.png';
import DancerIcon from './dancer-icon.png';
import TeacherIcon from './teacher-icon.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

class UsersList extends Component {
    constructor() {
        super()
        this.state = {
            search: '',
            studentView: true
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
    }

    componentDidMount() {
        this.props.getUsers()
    }

    deleteUser(user_id) {
        axios.delete(`/user/deleteuser/${user_id}`).then(res => {
            console.log('user deleted')
            this.componentDidMount()
        })
    }

    render() {
        return (
            <div className='TrackHours'>
                <h1 className='thHeader'>{this.state.studentView === true ? 'Students' : 'Teachers'} List</h1>
                <Link id='createCourseBut' to='/admin/createuser'><img src={BigPlusIcon} alt='Create User' id='ccButton' /></Link>
                <input placeholder='Search User' className='searchInput' value={this.state.search} onChange={e => this.setState({ search: e.target.value })} />

                {(this.state.studentView === true) ?
                    <div className='usersColumn'>
                        {
                            this.props.users.filter(user => {
                                return user.type === 'student' && user.user_name.includes(this.state.search)
                            }).map((student, i) => {
                                return (
                                    <div className='user' key={i + student}>
                                        <p className='username'>{student.user_name}</p>
                                        <div className='icons'>
                                            <Link to={`/edituser/${student.user_name}/${student.user_id}`}><img className='icon' src={EditIcon} alt='edit' /></Link>
                                            <img className='icon' src={DeleteIcon} alt='delete' onClick={() => this.deleteUser(student.user_id)} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    :

                    <div className='usersColumn'>
                        {
                            this.props.users.filter(user => {
                                return user.type === 'teacher' && user.user_name.includes(this.state.search)
                            }).map((teacher, i) => {
                                return (
                                    <div className='user' key={i + teacher}>
                                        <p className='username'>{teacher.user_name}</p>
                                        <div className='icons'>
                                            <Link to={`/edituser/${teacher.user_name}/${teacher.user_id}`}><img className='icon' src={EditIcon} alt='edit' /></Link>
                                            <img className='icon' src={DeleteIcon} alt='delete' onClick={() => this.deleteUser(teacher.user_id)} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                }

                <img className='changeViewIcon' src={this.state.studentView === true ? TeacherIcon : DancerIcon} alt='View Teachers' onClick={() => this.setState({ studentView: !this.state.studentView })} />
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps, { getUsers })(UsersList);
import React, { Component } from 'react';
import './UsersList.css';
import { connect } from 'react-redux';
import { getUsers } from '../../ducks/user';
import EditIcon from '../Courses/edit-icon.png';
import DeleteIcon from '../Courses/delete-icon.png';
import BigPlusIcon from '../Courses/big-plus-icon.png';
import DancerIcon from './dancer-icon.png';
import TeacherIcon from './teacher-icon.png';
import AdminIcon from './admin-icon.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

class UsersList extends Component {
    constructor() {
        super()
        this.state = {
            search: '',
            studentView: true,
            activeView: 0
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

    toggleViews() {
        if (this.state.activeView === 2) {
            this.setState({
                activeView: 0
            })
        } else if(this.state.activeView === 0) {
            this.setState({
                activeView: 1
            })
        } else if(this.state.activeView === 1) {
            this.setState({
                activeView: 2
            })
        }
    }

    render() {
        return (
            <div className='TrackHours'>
                <h1 className='thHeader'>{this.state.activeView === 0 ? 'Students' : this.state.activeView === 1 ? 'Teachers' : 'Administrators'} List</h1>
                <Link id='createCourseBut' to='/nav/adminlanding/createuser'><img src={BigPlusIcon} alt='Create User' id='ccButton' /></Link>

                {/* <input placeholder='Search User' className='searchInput' value={this.state.search} onChange={e => this.setState({ search: e.target.value })} /> */}

                <input className='searchBar' placeholder='Search Student' onChange={e => this.setState({ search: e.target.value })} />

                {(this.state.activeView === 0) ?
                    <div className='usersColumn'>
                        {
                            this.props.users.filter(user => {
                                return user.type === 'student' && user.user_name.toLowerCase().includes(this.state.search.toLowerCase())
                            }).map((student, i) => {
                                return (
                                    <div className='user' key={i + student}>
                                        <p className='username'>{student.user_name}</p>
                                        <div className='icons'>
                                            <Link to={`/nav/adminlanding/edituser/${student.user_name}/${student.user_id}`}><img className='icon' src={EditIcon} alt='edit' /></Link>
                                            <img className='icon' src={DeleteIcon} alt='delete' onClick={() => this.deleteUser(student.user_id)} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    : (this.state.activeView === 1) ?

                        <div className='usersColumn'>
                            {
                                this.props.users.filter(user => {
                                    return user.type === 'teacher' && user.user_name.toLowerCase().includes(this.state.search.toLowerCase())
                                }).map((teacher, i) => {
                                    return (
                                        <div className='user' key={i + teacher}>
                                            <p className='username'>{teacher.user_name}</p>
                                            <div className='icons'>
                                                <Link to={`/nav/edituser/${teacher.user_name}/${teacher.user_id}`}><img className='icon' src={EditIcon} alt='edit' /></Link>
                                                <img className='icon' src={DeleteIcon} alt='delete' onClick={() => this.deleteUser(teacher.user_id)} />
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
                                    return user.type === 'admin' && user.user_name.toLowerCase().includes(this.state.search.toLowerCase())
                                }).map((teacher, i) => {
                                    return (
                                        <div className='user' key={i + teacher}>
                                            <p className='username'>{teacher.user_name}</p>
                                            <div className='icons'>
                                                <Link to={`/nav/edituser/${teacher.user_name}/${teacher.user_id}`}><img className='icon' src={EditIcon} alt='edit' /></Link>
                                                <img className='icon' src={DeleteIcon} alt='delete' onClick={() => this.deleteUser(teacher.user_id)} />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>


                }


                <img className='changeViewIcon' src={this.state.activeView === 0 ? TeacherIcon : this.state.activeView === 1 ? DancerIcon : AdminIcon} alt='View Teachers' onClick={() => this.toggleViews()} />

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
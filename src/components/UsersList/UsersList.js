import React, { Component } from 'react';
import './UsersList.css';
import { connect } from 'react-redux';
import { getUsers } from '../../ducks/user';
import EditIcon from '../Courses/edit-icon.png';
import DeleteIcon from '../Courses/delete-icon.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

class UsersList extends Component {
    constructor() {
        super()
        this.state = {
            search: '',
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
    }

    componentDidMount() {
        this.props.getUsers()
    }

    deleteUser(user_id) {
        axios.delete(`/user/deleteuser/${user_id}`).then(res => {
            console.log('user deleted'),
            this.componentDidMount()
        })
    }

    render() {
        return (
            <div className='UsersList'>
                <input className='searchInput' value={this.state.search} onChange={e => this.setState({ search: e.target.value })} />
                <div className='studentTeacherDiv'>
                    <div className='studentsColumn'>
                        <h3>Students</h3>
                        {
                            this.props.users.filter(user => {
                                return user.type === 'student' && user.user_name.includes(this.state.search)
                            }).map((student, i) => {
                                return (
                                    <div className='user' key={i + student}>
                                        <p>{student.user_name}</p>
                                        <div className='icons'>
                                            <Link to={`/edituser/${student.user_name}/${student.user_id}`}><img className='icon' src={EditIcon} alt='edit' /></Link>
                                            <img className='icon' src={DeleteIcon} alt='delete' onClick={() => this.deleteUser(student.user_id)} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='teachersColumn'>
                        <h3>Teachers</h3>
                        {
                            this.props.users.filter(user => {
                                return user.type === 'teacher' && user.user_name.includes(this.state.search)
                            }).map((teacher, i) => {
                                return (
                                    <div className='user' key={i + teacher}>
                                        <p>{teacher.user_name}</p>
                                        <div className='icons'>
                                            <Link to={`/edituser/${teacher.user_name}/${teacher.user_id}`}><img className='icon' src={EditIcon} alt='edit' /></Link>
                                            <img className='icon' src={DeleteIcon} alt='delete' onClick={() => this.deleteUser(teacher.user_id)} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <Link to='/admin/createuser'><button>Create User</button></Link>
                    </div>
                </div>
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
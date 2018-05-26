import React, { Component } from 'react';
import './UsersList.css';
import { connect } from 'react-redux';
import { getUsers } from '../../ducks/user';
import EditIcon from '../Courses/edit-icon.png';
import DeleteIcon from '../Courses/delete-icon.png';

class UsersList extends Component {
    constructor() {
        super()
        this.state = {
            search: '',
        }
    }

    componentDidMount() {
        this.props.getUsers()
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
                                            <img className='icon' src={EditIcon} alt='edit' />
                                            <img className='icon' src={DeleteIcon} alt='delete' />
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
                                            <img className='icon' src={EditIcon} alt='edit' />
                                            <img className='icon' src={DeleteIcon} alt='delete' />
                                        </div>
                                    </div>
                                )
                            })
                        }
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
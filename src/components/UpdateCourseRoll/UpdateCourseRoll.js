import React, { Component } from 'react';
import './UpdateCourseRoll.css';
import { getUsers } from '../../ducks/user';
import { connect } from 'react-redux';
import TAorStudent from '../TAorStudent/TAorStudent';
import { Link } from 'react-router-dom';

class UpdateCourseRoll extends Component {
    constructor() {
        super()
        this.state = {
            search: ''
        }
    }

    componentDidMount() {
        this.props.getUsers()
    }



    render() {
        return (
            <div className='UpdateCourseRoll'>
                <input />
                {
                    this.props.users.filter(user => {
                        return user.type === 'student'
                    }).map(studentOrTA => {
                        return (
                            <TAorStudent 
                                user_name={studentOrTA.user_name}
                                type={studentOrTA.type}
                                user_id={studentOrTA.user_id}
                                class_id={this.props.match.params.class_id}
                            />
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
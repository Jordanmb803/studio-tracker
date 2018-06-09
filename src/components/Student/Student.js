import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../ducks/user';
import axios from 'axios';
import './Student.css';

class Student extends Component {
    constructor() {
        super()
        this.state = {
            present: false
        }
        this.postPresent = this.postPresent.bind(this)
        this.deletePresent = this.deletePresent.bind(this)
    }

    componentDidMount() {
        this.props.getUsers()
    }

    postPresent() {
        const { user_id, class_id, date } = this.props
        axios.post('/inputhours', { user_id, class_id, date }).then(res => {
            this.setState({
                present: true,
            })
        })
    }

    deletePresent() {
        const { user_id, class_id, date } = this.props
        axios.delete(`/deleteinput/${user_id}/${class_id}/${date}`).then(res => {
            console.log('user changed to absent')
            this.setState({
                present: false
            })
        })
    }

    render() {


        return (
            <div className='studentDiv'>
                <h3 id='sN' className='studentName'>{this.props.user_name}</h3>
                <div className='infoCheckBoxDiv'>
                    {
                        this.props.users.filter(user => this.props.user_id === user.user_id)
                            .map(student => {
                                return (
                                    <div className='parentStudentDiv' key={student.user_id}>
                                        <div className='studentInfo'>
                                            <p id='psInfo'>Age: {student.age}</p>
                                        </div>
                                        {this.props.users.filter(user => {
                                            return student.parent_id === user.user_id
                                        }).map(parent => {
                                            return (
                                                <div className='parentInfo' key={parent.user_id}>
                                                    <p className='studentName' id='psInfo'>Parent </p>
                                                    <p id='psInfo'>{parent.user_name}</p>
                                                    <p id='psInfo'>{parent.email}</p>
                                                    <p id='psInfo'>{parent.phone_number}</p>

                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })
                    }



                    <div className='presentAbsentCheckBoxes'>
                        <div className='checkboxWLabel'>
                            <input type='checkbox' id='present' name='roll' value='present' onClick={() => this.postPresent()} checked={this.state.present} onChange={(e) => {
                                e.target.checked = this.state.present
                                this.setState({
                                    present: !this.state.present
                                })
                            }
                            } />
                            <label id='psInfo' for='present'>Present</label>
                        </div>
                        <div className='checkboxWLabel'>
                            <input type='checkbox' id='absent' name='roll' value='absent' onClick={() => this.deletePresent()} checked={!this.state.present} onChange={(e) => {
                                e.target.checked = !this.state.present
                                this.setState({
                                    present: !this.state.present
                                })
                            }} />
                            <label id='psInfo' for='absent'>Absent</label>
                        </div>
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

export default connect(mapStateToProps, { getUsers })(Student);
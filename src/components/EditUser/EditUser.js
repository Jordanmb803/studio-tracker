import React, { Component } from 'react';
import './EditUser.css';
import { connect } from 'react-redux';
import { getUsers, getUser } from '../../ducks/user';
import axios from 'axios';

class EditUser extends Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            city: '',
            state: '',
            zipcode: '',
            type: '',
            userName: '',
            parent_id: 0,
            userBeingEdited: {},
            users: []
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.editUser = this.editUser.bind(this)
    }

    componentDidMount() {
        this.props.getUser()
        axios.get('/getallusers').then(res => {
            let userBeingEdited = res.data.find(user => {
                return user.user_id === Number(this.props.match.params.user_id)
            })



            this.setState({
                userBeingEdited: userBeingEdited,
                firstName: userBeingEdited.first_name,
                lastName: userBeingEdited.last_name,
                email: userBeingEdited.email,
                address: userBeingEdited.address,
                city: userBeingEdited.city,
                state: userBeingEdited.state,
                zipcode: userBeingEdited.zipcode,
                type: userBeingEdited.type,
                userName: userBeingEdited.user_name,
                parent_id: userBeingEdited.parent_id,
                users: res.data,
            })
        })

    }


    editUser() {
        const { firstName, lastName, email, address, city, state, zipcode, type, userName, parent_id } = this.state
        const { user_id } = this.props.match.params
        axios.put('/user/edituser', { firstName, lastName, email, address, city, state, zipcode, type, userName, parent_id, user_id }).then(res => {
            if (this.props.user.type === 'admin') {

                this.props.history.push('/nav/adminlanding/userslist')
            } else {
                this.props.history.push('/nav/dailyview')
            }
        })
    }

    render() {

        return (
            <div className={this.props.user.type === 'admin' ? 'TrackHours' : 'dailyView'}>
                <h3 className='thHeader'>EDIT USER</h3>
                
                <div className='newStudentInfoDiv'>
                    <div className='row'>
                        <div id='firstName'>
                            <p>First Name</p>
                            <input value={this.state.firstName} placeholder='First Name'  className='studentInfoInput' onChange={e => this.setState({ firstName: e.target.value })} />
                        </div>
                        <div id='lastName'>
                            <p>Last Name</p>
                            <input value={this.state.lastName} placeholder='Last Name' className='studentInfoInput' onChange={e => this.setState({ lastName: e.target.value })} />
                        </div>
                    </div>
                    <div className='row'>
                        <div id='singleRowItem'>
                            <p>Email</p>
                            <input value={this.state.email}  placeholder='Email' className='studentInfoInput' onChange={e => this.setState({ email: e.target.value })} />
                        </div>
                    </div>
                    <div className='row'>
                        <div id='singleRowItem'>
                            <p>Address</p>
                            <input value={this.state.address} placeholder='Address' className='studentInfoInput' onChange={e => this.setState({ address: e.target.value })} />
                        </div>
                    </div>
                    <div className='row'>
                        <div id='city' >
                            <p>City</p>
                            <input value={this.state.city} placeholder='City' className='studentInfoInput' onChange={e => this.setState({ city: e.target.value })} />
                        </div>
                        <div>
                            <p id='state'>State</p>
                            <select value={this.state.state} className='studentInfoInput' onChange={e => this.setState({ state: e.target.value })} >
                                {['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',].map(state => {
                                    return (
                                        <option key={state}>{state}</option>
                                    )
                                }

                                )}
                            </select>
                        </div>
                        <div id='zipcode'>
                            <p>Zipcode</p>
                            <input value={this.state.zipcode} placeholder='Zipcode' className='studentInfoInput' onChange={e => this.setState({ zipcode: e.target.value })} />
                        </div>
                    </div>
                    <div className='row'>
                        <div>
                            <p className={this.props.user.type === 'admin' ? '' : 'invisable'}>User Type</p>
                            <select value={this.state.type} id='userType' className={this.props.user.type === 'admin' ? 'studentInfoInput' : 'invisable'} onChange={e => this.setState({ type: e.target.value })} >
                                <option value=''>User Type</option>
                                <option value='student'>Student</option>
                                <option value='teacher'>Teacher</option>
                                <option value='parent'>Parent</option>
                                <option value='admin'>Administrator</option>
                            </select>
                        </div>
                        <div>
                            <p>User Name</p>
                            <input value={this.state.userName} placeholder='User Name' className='studentInfoInput' onChange={e => this.setState({ userName: e.target.value })} />
                        </div>
                        <div>
                            <p>Parent</p>
                            <select className='studentInfoInput' value={this.state.parent_id} onChange={e => this.setState({ parent_id: e.target.value })}>
                                <option value=''>Parent</option>
                                <option value='n/a'>N/A</option>
                                {
                                    this.props.users.filter(user => {
                                        return user.type === 'parent'
                                    }).map(parent => {
                                        return (
                                            <option value={parent.user_id} key={parent.user_id}>{parent.user_name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>

                    <button id='editUserButton' className='updateButton' onClick={() => this.editUser()}>Edit User</button>
                </div>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.users,
        user: state.user
    }
}

export default connect(mapStateToProps, { getUsers, getUser })(EditUser);
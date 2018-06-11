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
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.editUser = this.editUser.bind(this)
    }

    componentDidMount() {
        this.props.getUsers()
        this.props.getUser()
        let userBeingEdited = this.props.users.find(user => {
            console.log(user.user_id, this.props.match.params.user_id)
            return user.user_id === Number(this.props.match.params.user_id)
        })

        console.log(userBeingEdited)

        this.setState({
            firstName: userBeingEdited.first_name,
            lastName: userBeingEdited.last_name,
            email: userBeingEdited.email,
            address: userBeingEdited.address,
            city: userBeingEdited.city,
            state: userBeingEdited.state,
            zipcode: userBeingEdited.zipcode,
            type: userBeingEdited.type,
            userName: userBeingEdited.user_name,
            parent_id: userBeingEdited.parent_id
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

        let student = this.props.users.find(user => {
            return user.user_id === Number(this.props.match.params.user_id)
        })

        let parent = this.props.users.find(parent => {
            return student.parent_id === parent.user_id
        })

        return (
            <div className={this.props.user.type === 'admin' ? 'TrackHours' : 'dailyView'}>
                <div className='nameAndStudentInfo'>
                    <h3 className='student'>{this.props.match.params.user_name}</h3>
                    {
                        this.props.users.filter(user => {
                            return user.user_id === Number(this.props.match.params.user_id)
                        }).map((user, i) => {
                            return (
                                <div key={user + i}>
                                    <div className='studentsInfo'>
                                        <div id='infos'>
                                            <p id='label'>First Name </p>
                                            <p className='result'>{user.first_name}</p>
                                        </div>
                                        <div id='infos'>
                                            <p id='label' >Last Name: </p>
                                            <p className='result'>{user.last_name}</p>
                                        </div>
                                        <div id='infos'>
                                            <p id='label'>Email: </p>
                                            <p className='result'>{user.email}</p>
                                        </div>
                                        <div id='infos'>
                                            <p id='label'>Address: </p>
                                            <p className='result'>{user.address}</p>
                                        </div>
                                        <div id='infos'>
                                            <p id='label'>City: </p>
                                            <p className='result'>{user.city}</p>
                                        </div>
                                        <div id='infos'>
                                            <p id='label'>State: </p>
                                            <p className='result'>{user.state}</p>
                                        </div>
                                        <div id='infos'>
                                            <p id='label'>Zipcode: </p>
                                            <p className='result'>{user.zipcode}</p>
                                        </div>
                                        <div id='infos'>
                                            <p id='label'>User Type: </p>
                                            <p className={this.props.user.type === 'admin' ? 'result' : 'invisable'}>{user.type}</p>
                                        </div>
                                        <div id='infos'>
                                            <p id='label'>User Name: </p>
                                            <p className='result'>{user.user_name}</p>
                                        </div>
                                        <div id='infos'>
                                            <p id='label'>Parent Name: </p>
                                            <p className='result'>{parent.user_name}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='newStudentInfoDiv'>
                    <div className='row'>
                        <input value={this.state.firstName} placeholder='First Name' id='firstName' className='studentInfoInput' onChange={e => this.setState({ firstName: e.target.value })} />
                        <input value={this.state.lastName} placeholder='Last Name' id='lastName' className='studentInfoInput' onChange={e => this.setState({ lastName: e.target.value })} />
                    </div>
                    <div className='row'>
                        <input value={this.state.email} id='singleRowItem' placeholder='Email' className='studentInfoInput' onChange={e => this.setState({ email: e.target.value })} />
                    </div>
                    <div className='row'>
                        <input value={this.state.address} id='singleRowItem' placeholder='Address' className='studentInfoInput' onChange={e => this.setState({ address: e.target.value })} />
                    </div>
                    <div className='row'>
                        <input value={this.state.city} placeholder='City' id='city' className='studentInfoInput' onChange={e => this.setState({ city: e.target.value })} />
                        <select value={this.state.state} id='state' className='studentInfoInput' onChange={e => this.setState({ state: e.target.value })} >
                            <option value='AL'>AL</option>
                            <option value='AK'>AK</option>
                            <option value='AZ'>AZ</option>
                            <option value='AR'>AR</option>
                            <option value='CA'>CA</option>
                            <option value='CO'>CO</option>
                            <option value='CT'>CT</option>
                            <option value='DE'>DE</option>
                            <option value='FL'>FL</option>
                            <option value='GA'>GA</option>
                            <option value='HI'>HI</option>
                            <option value='ID'>ID</option>
                            <option value='IL'>IL</option>
                            <option value='IN'>IN</option>
                            <option value='IA'>IA</option>
                            <option value='KS'>KS</option>
                            <option value='KY'>KY</option>
                            <option value='LA'>LA</option>
                            <option value='ME'>ME</option>
                            <option value='MD'>MD</option>
                            <option value='MA'>MA</option>
                            <option value='MI'>MI</option>
                            <option value='MN'>MN</option>
                            <option value='MS'>MS</option>
                            <option value='MO'>MO</option>
                            <option value='MT'>MT</option>
                            <option value='NE'>NE</option>
                            <option value='NV'>NV</option>
                            <option value='NH'>NH</option>
                            <option value='NJ'>NJ</option>
                            <option value='NM'>NM</option>
                            <option value='NY'>NY</option>
                            <option value='NC'>NC</option>
                            <option value='ND'>ND</option>
                            <option value='OH'>OH</option>
                            <option value='OK'>OK</option>
                            <option value='OR'>OR</option>
                            <option value='PA'>PA</option>
                            <option value='RI'>RI</option>
                            <option value='SC'>SC</option>
                            <option value='SD'>SD</option>
                            <option value='TN'>TN</option>
                            <option value='TX'>TX</option>
                            <option value='UT'>UT</option>
                            <option value='VT'>VT</option>
                            <option value='VA'>VA</option>
                            <option value='WA'>WA</option>
                            <option value='WV'>WV</option>
                            <option value='WI'>WI</option>
                            <option value='WY'>WY</option>
                        </select>
                        <input value={this.state.zipcode} placeholder='Zipcode' id='zipcode' className='studentInfoInput' onChange={e => this.setState({ zipcode: e.target.value })} />
                    </div>
                    <div className='row'>
                        <select value={this.state.type} id='userType' className={this.props.user.type === 'admin' ? 'studentInfoInput' : 'invisable'} onChange={e => this.setState({ type: e.target.value })} >
                            <option value=''>User Type</option>
                            <option value='student'>Student</option>
                            <option value='teacher'>Teacher</option>
                            <option value='parent'>Parent</option>
                            <option value='admin'>Administrator</option>
                        </select>

                        <input value={this.state.userName} placeholder='User Name' className='studentInfoInput' onChange={e => this.setState({ userName: e.target.value })} />
                        <select className='studentInfoInput' value={this.state.parent_id} onChange={e => this.setState({ parent_id: e.target.value })}>
                            <option value=''>Parent</option>
                            <option value='N/A'>N/A</option>
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
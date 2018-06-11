import React, { Component } from 'react';
import './CreateUser.css';
import axios from 'axios';

class CreateUser extends Component {
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
            profilePicture: ''
        }
        this.createUser = this.createUser.bind(this)
    }

    createUser() {
        const { firstName, lastName, email, address, city, state, zipcode, type, userName, profilePicture } = this.state
        axios.post('/user/admincreateuser', { firstName, lastName, email, address, city, state, zipcode, type, userName, profilePicture })
            .then(res => {
                console.log('user created')
                this.props.history.push('/nav/adminlanding/userslist')
            })
        
    }


    render() {
        return (
            <div className='TrackHours'>
            <h1 className='thHeader'>Create User</h1>
                <div id='createUser' className='newStudentInfoDiv'>
                    <div className='row'>
                        <input id='firstName' placeholder='First Name' className='studentInfoInput' onChange={e => this.setState({ firstName: e.target.value })} />
                        <input id='lastName' placeholder='Last Name' className='studentInfoInput' onChange={e => this.setState({ lastName: e.target.value })} />
                    </div>
                    <div className='row'>
                        <input id='singleRowItem' placeholder='Email' className='studentInfoInput' onChange={e => this.setState({ email: e.target.value })} />
                    </div>
                    <div className='row'>
                        <input id='singleRowItem' placeholder='Address' className='studentInfoInput' onChange={e => this.setState({ address: e.target.value })} />
                    </div>
                    <div className='row'>
                        <input placeholder='City' id='city' className='studentInfoInput' onChange={e => this.setState({ city: e.target.value })} />
                        <select id='state' className='studentInfoInput' onChange={e => this.setState({ state: e.target.value })} >
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
                        <input placeholder='Zipcode' id='zipcode' className='studentInfoInput' onChange={e => this.setState({ zipcode: e.target.value })} />
                    </div>
                    <div className='row'>
                        <select id='userType' className='studentInfoInput' onChange={e => this.setState({ type: e.target.value })} >
                            <option value=''>User Type</option>
                            <option value='student'>Student</option>
                            <option value='teacher'>Teacher</option>
                            <option value='admin'>Administrator</option>
                        </select>

                        <input id='userName' placeholder='User Name' className='studentInfoInput' onChange={e => this.setState({ userName: e.target.value })} />
                    </div>
                    {/* <div className='row'>
                        <input id='singleRowItem' placeholder='Profile Picture Url' className='studentInfoInput' onChange={e => this.setState({ profilePicture: e.target.value })} />
                    </div> */}
                    <button id='editUserButton' className='updateButton' onClick={() => this.createUser()}>Create User</button>
                </div>
            </div>
        )
    }
}

export default CreateUser;
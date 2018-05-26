import React, { Component } from 'react';
import './EditUser.css';
import { connect } from 'react-redux';
import { getUsers } from '../../ducks/user';

class EditUser extends Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            city: '',
            state: '',
            zipcode: '',
            type: '',
            userName: '',
            profilePicture: ''
        }
    }

    componentDidMount() {
        this.props.getUsers()
    }

    render() {
        return (
            <div className='EditUser'>
                <h3>{this.props.match.params.user_name}</h3>
                {
                    this.props.users.filter(user => {
                       return user.user_id == this.props.match.params.user_id
                    }).map((user, i) => {
                        return (
                            <div key={user + i}>
                                <p>First Name: {user.first_name}</p>
                                <p>Last Name: {user.last_name}</p>
                                <p>Email: {user.email}</p>
                                <p>Address: {user.address}</p>
                                <p>City: {user.city}</p>
                                <p>State: {user.state}</p>
                                <p>Zipcode: {user.zipcode}</p>
                                <p>User Type: {user.type}</p>
                                <p>User Name: {user.user_name}</p>
                                <p>Profile Picture: {user.profile_picture}</p>
                            </div>
                        )
                    })
                }
            <input placeholder='First Name' className='studentInfoInput' onChange={e => this.setState({firstName: e.target.value})}/>
            <input placeholder='Last Name' className='studentInfoInput' onChange={e => this.setState({lastName: e.target.value})}/>
            <input placeholder='Email' className='studentInfoInput' onChange={e => this.setState({email: e.target.value})}/>
            <input placeholder='Address' className='studentInfoInput' onChange={e => this.setState({address: e.target.value})}/>
            <input placeholder='City' className='studentInfoInput' onChange={e => this.setState({city: e.target.value})}/>   
            <select className='studentInfoInput' onChange={e => this.setState({state: e.target.value})} >
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
            <input placeholder='Zipcode' className='studentInfoInput' onChange={e => this.setState({zipcode: e.target.value})}/>
            <select className='studentInfoInput' onChange={e => this.setState({type: e.target.value})} >
                <option value=''>User Type</option>
                <option value='student'>Student</option>
                <option value='teacher'>Teacher</option>
                <option value='admin'>Administrator</option>
            </select>
            
            <input placeholder='User Name' className='studentInfoInput' onChange={e => this.setState({userName: e.target.value})}/>
            <input placeholder='Profile Picture Url' className='studentInfoInput' onChange={e => this.setState({profilePicture: e.target.value})}/>
            <button>Edit User</button>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps, { getUsers })(EditUser);
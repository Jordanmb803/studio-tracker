import React, { Component } from 'react';
import axios from 'axios';

class TAorStudent extends Component {
    constructor() {
        super()
        this.state = {
            checked: false
        }
        this.registerUser = this.registerUser.bind(this)
    }

    componentDidMount() {
    }

    registerUser(checked) {
        const { user_id, class_id } = this.props
        if (checked) {
            axios.post(`/register/userinclass/${user_id}/${class_id}`).then(res => {
                console.log('user registered')
            })
        } else {
            axios.delete(`/register/removeuserfromclass/${user_id}/${class_id}`).then(res => {
                console.log('removed user')
            })
        }
    }

    render() {

        return (
            <div>
                <label for='inCourseCheckBox'>Student: {this.props.user_name}</label>
                <input id='inCourseCheckBox' name='roll' value='inCourseCheckBox' type='checkbox' checked={this.state.checked}
                    onClick={e => this.registerUser(e.target.checked)} onChange={() => this.setState({ checked: !this.state.checked })}
                />
            </div>
        )
    }

}

export default TAorStudent;
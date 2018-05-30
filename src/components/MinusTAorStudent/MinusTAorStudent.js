import React, { Component } from 'react';
import axios from 'axios';

class MinusTAorStudent extends Component {
    constructor() {
        super()
        this.state = {
            checked: false
        }
        this.removeUser = this.removeUser.bind(this)
    }

    componentDidMount() {
    }

    removeUser(checked) {
        const { user_id, class_id } = this.props
        if (checked) {
            axios.delete(`/register/removeuserfromclass/${user_id}/${class_id}`).then(res => {
                console.log('removed user')
            })
        } else {
            axios.post(`/register/userinclass/${user_id}/${class_id}`).then(res => {
                console.log('user registered')
            })
        }
    }

    render() {

        return (
            <div>
                <label for='inCourseCheckBox'>Student: {this.props.user_name}</label>
                <input id='inCourseCheckBox' name='roll' value='inCourseCheckBox' type='checkbox' checked={this.state.checked}
                    onClick={e => this.removeUser(e.target.checked)} onChange={() => this.setState({ checked: !this.state.checked })}
                />
            </div>
        )
    }

}

export default MinusTAorStudent;
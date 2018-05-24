import React, { Component } from 'react';
import axios from 'axios';

class Student extends Component {
    constructor() {
        super()
        this.state = {
            present: false,
            absent: true,
        }
        this.postPresent = this.postPresent.bind(this)
        this.deletePresent = this.deletePresent.bind(this)
    }

    postPresent() {
        const {user_id, class_id, date} = this.props
        axios.post('/inputhours', {user_id, class_id, date}).then(res => {

        })
    }

    deletePresent() {

    }

    render() {

        console.log(this.props)

        return (
            <div>
                <p>{this.props.user_name}</p>
                <input type='checkbox' id='present' name='roll' value='present' onClick={() => this.postPresent()} />
                <input type='checkbox' id='absent' name='roll' value='absent' onClick={() => this.deletePresent()} />
            </div>
        )
    }
}

export default Student;
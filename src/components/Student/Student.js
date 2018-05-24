import React, { Component } from 'react';
import axios from 'axios';

class Student extends Component {
    constructor() {
        super()
        this.state = {
            present: false
        }
        this.postPresent = this.postPresent.bind(this)
        this.deletePresent = this.deletePresent.bind(this)
    }

    postPresent() {
        const {user_id, class_id, date} = this.props
        axios.post('/inputhours', {user_id, class_id, date}).then(res => {
            this.setState({
                present: true,
            })
        })
    }

    deletePresent() {

    }

    render() {

        console.log(this.props)

        return (
            <div>
                <p>{this.props.user_name}</p>
                <input type='checkbox' id='present' name='roll' value='present' onClick={() => this.postPresent()} checked={this.state.present} onChange={(e)=> {

                    e.target.checked = this.state.present
                    this.setState({
                        present: !this.state.present
                    })
                }
                }/>
                <input type='checkbox' id='absent' name='roll' value='absent' onClick={() => this.deletePresent()} checked={!this.state.present} onChange={(e)=> {
                    e.target.checked = !this.state.present
                    this.setState({
                        present: !this.state.present
                    })
                }}/>
            </div>
        )
    }
}

export default Student;
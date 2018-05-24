import React, { Component } from 'react';

class Student extends Component {
    constructor(){
        super()
        this.state = {
            present: false,
            absent: true
        }
        this.postPresent = this.postPresent.bind(this)
        this.deletePresent= this.deletePresent.bind(this)
    }

    postPresent(){

    }

    deletePresent(){

    }

    render(){
        console.log(this.props.today)
        return(
            <div>
                <p>{this.props.user_name}</p>
                <input type='checkbox' id='present' name='roll' value='present' onClick={()=> this.postPresent()}/>
                <input type='checkbox' id='absent' name='roll' value='absent' onClick={() => this.deletePresent()}/>
            </div>
        )
    }
}

export default Student;
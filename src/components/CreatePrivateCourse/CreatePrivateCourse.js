import React, { Component } from 'react';
import './CreatePrivateCourse.css';

class CreatePrivateCourse extends Component {
    constructor() {
        super()
        this.state = {
            studentName: '',
            length: 0,
            day: '',
            time: '',
            teacher_id: 0
        }
    }

    componentDidMount() {
        const { teacher_id } = this.props.match.params
        this.setState({
            teacher_id: teacher_id
        })
    }

    render() {

        return (
            <div className='dailyView'>
                <h1 className='thHeader'>Create Private Class</h1>
                <div className='privatesInfoDiv'>
                    <input className='privateInfo' onChange={e => this.setState({ studentName: e.target.value })} />
                    <select onChange={e => this.setState({ length: e.target.value })}>
                        <option value=''>Length</option>
                        <option value='60'>1 Hour</option>
                        <option value='90'>1 1/2 Hours</option>
                    </select>

                    <select className='privateInfo' onChange={e => this.setState({ day: e.target.value })}>
                        <option value=''>Day</option>
                        <option value='S'>Sunday</option>
                        <option value='M'>Monday</option>
                        <option value='T'>Tuesday</option>
                        <option value='W'>Wednesday</option>
                        <option value='TH'>Thursday</option>
                        <option value='F'>Friday</option>
                        <option value='SAT'>Saturday</option>
                    </select >

                    <select className='privateInfo' onChange={e => this.setState({ time: e.target.value })}>
                        <option value=''>Time</option>
                        <option value='9am'>9am</option>
                        <option value='10am'>10am</option>
                        <option value='10am'>11am</option>
                        <option value='10am'>12pm</option>
                        <option value='10am'>1pm</option>
                        <option value='10am'>2pm</option>
                        <option value='10am'>3pm</option>
                        <option value='10am'>4pm</option>
                        <option value='10am'>5pm</option>
                        <option value='10am'>6pm</option>
                        <option value='10am'>7pm</option>
                        <option value='10am'>8pm</option>
                        <option value='10am'>9pm</option>
                    </select>

                </div>

            </div>
        )
    }
}


export default (CreatePrivateCourse);
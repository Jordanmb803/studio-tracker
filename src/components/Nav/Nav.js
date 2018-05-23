import React, { Component } from 'react';
import { connect } from 'react-redux';
import menu from './arq-menu-512.png';
import './Nav.css'

class Nav extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (
            <div className='nav'>
                <div className='picTitle'>
                    <img id='profileImg' src={this.props.user.profile_picture} alt='prof_pic' />
                    <h1>Studio Tracker</h1>
                </div>
                    <img className='dropDown' src={menu}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Nav);
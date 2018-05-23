import React, { Component } from 'react';
import { connect } from 'react-redux';
import menu from './arq-menu-512.png';
import './Nav.css'


class Nav extends Component {
    constructor() {
        super()
        this.state = {
            menuVis: false
        }
        this.toggleMenu = this.toggleMenu.bind(this)
    }

    toggleMenu() {
        this.setState({
            menuVis: !this.state.menuVis
        })
    }

    render() {
        console.log(this.state.menuVis)
        return (
            <div className='navWithMenu'>
                <div className='nav'>
                    <div className='picTitle'>
                        <a className='profileATag' href='/#/dailyview'><img id='profileImg' src={this.props.user.profile_picture} alt='prof_pic' /></a>
                        <h1>Studio Tracker</h1>
                    </div>
                    <img className='dropDown' src={menu} onClick={() => this.toggleMenu()} />
                </div>
                <div className={(this.state.menuVis === true) ? 'menuVis' : ' menuInvis'}>
                    <p className='menuOption'>SCHEDULE</p>
                    <p className='menuOption'>LOGOUT</p>
                    <p className='menuOption'>SETTINGS</p>
                </div>
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
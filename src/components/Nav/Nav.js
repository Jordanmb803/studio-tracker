import React, { Component } from 'react';
import { connect } from 'react-redux';
import menu from './arq-menu-512.png';
import './Nav.css';
import { Link } from 'react-router-dom';


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
       
        return (
            <div className='navWithMenu'>
                <div className='nav'>
                    <div className='picTitle'>
                        <a className='profileATag' href='/#/dailyview'><img id='profileImg' src={this.props.user.profile_picture} alt='prof_pic' /></a>
                        <h1>Center Stage</h1>
                    </div>
                    <img className='dropDown' src={menu} onClick={() => this.toggleMenu()} alt='menu'/>
                </div>
                <div className={(this.state.menuVis === true) ? 'menuVis' : ' menuInvis'}>
                    <a href={`/#/edituser/${this.props.user.user_name}/${this.props.user.user_id}`}><p className='menuOption'>PROFILE</p></a>
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
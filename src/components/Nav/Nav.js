import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, changeActiveTab } from '../../ducks/user';
import menu from './menu-icon.png';
import './Nav.css';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

class Nav extends Component {
    constructor() {
        super()
        this.state = {
            menuVis: false,
        }
        this.toggleMenu = this.toggleMenu.bind(this)
    }

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
      }

    componentDidMount() {
        this.props.getUser()
    }


    toggleMenu() {
        this.setState({
            menuVis: !this.state.menuVis
        })
    }

    render() {
        const { match, location, history } = this.props

        console.log(`You are now at ${location.pathname}`)
        return (

            <div className='navWithMenu'>
                <div className='nav'>
                    <div className='picTitle'>
                        <a className='dailyviewATag' href={this.props.user.type === 'admin' ? '/#/nav/adminlanding/trackhours' : '/#/nav/dailyview'} onClick={()=> this.props.changeActiveTab(0)}><div className='headerTitles'>
                            <h1 className='studioNavHeader'>CENTER STAGE</h1>
                            <h3 className='navH3'>PERFORMING ARTS STUDIO</h3>
                        </div></a>
                    </div>
                    <img className='dropDown' src={menu} onClick={() => this.toggleMenu()} alt='menu' />


                    <div className='navOptionsDiv'>
                        <a id='profileATag' href={this.props.user.type === 'admin' ? `/#/nav/adminlanding/edituser/${this.props.user.user_name}/${this.props.user.user_id}` : `/#/nav/dv/edituser/${this.props.user.user_name}/${this.props.user.user_id}`}><p className='navOption'
                        onClick={()=> this.props.changeActiveTab(5)}
                        >PROFILE</p></a>
                        <a id='profileATag' href={'/#/nav/dailyview'}><p className='navOption'>SCHEDULE</p></a>
                        <p className='navOption'>LOGOUT</p>
                    </div>


                </div>

                <div className={(this.state.menuVis === true) ? 'menuVis' : ' menuInvis'}>
                    <a id='profileATag' className='menuOption' href={this.props.user.type === 'admin' ? `/#/nav/adminlanding/edituser/${this.props.user.user_name}/${this.props.user.user_id}` : `/#/nav/dv/edituser/${this.props.user.user_name}/${this.props.user.user_id}`}><p className='menuOption'
                    onClick={()=> this.props.changeActiveTab(5)}
                    >PROFILE</p></a>
                    <a id='profileATag' className='menuOption' href={'/#/nav/dailyview'}><p className='menuOption'>SCHEDULE</p></a>
                    <a id='profileATag' className='menuOption' href={'/#/nav/dailyview'}><p className='menuOption'>LOGOUT</p></a>
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

export default connect(mapStateToProps, { getUser, changeActiveTab })(Nav);
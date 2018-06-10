import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, changeActiveTab } from '../../ducks/user';
import menu from './menu-icon.png';
import './Nav.css';

class Nav extends Component {
    constructor() {
        super()
        this.state = {
            menuVis: false,
        }
        this.toggleMenu = this.toggleMenu.bind(this)
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

        return (
            <div className='navWithMenu'>
                <div className='nav'>
                    <div className='picTitle'>
                        <a className='dailyviewATag' href={this.props.user.type === 'admin' ? '/#/adminlanding/trackhours' : '/#/dailyview'} onClick={()=> this.props.changeActiveTab(0)}><div className='headerTitles'>
                            <h1 className='studioNavHeader'>CENTER STAGE</h1>
                            <h3 className='navH3'>PERFORMING ARTS STUDIO</h3>
                        </div></a>
                    </div>
                    <img className='dropDown' src={menu} onClick={() => this.toggleMenu()} alt='menu' />


                    <div className='navOptionsDiv'>
                        <a id='profileATag' href={this.props.user.type === 'admin' ? `/#/adminlanding/edituser/${this.props.user.user_name}/${this.props.user.user_id}` : `/#/edituser/${this.props.user.user_name}/${this.props.user.user_id}`}><p className='navOption'
                        onClick={()=> this.props.changeActiveTab(5)}
                        >PROFILE</p></a>
                        <a id='profileATag' href={'/#/dailyview'}><p className='navOption'>SCHEDULE</p></a>
                        <p className='navOption'>LOGOUT</p>
                    </div>


                </div>

                <div className={(this.state.menuVis === true) ? 'menuVis' : ' menuInvis'}>
                    <a id='profileATag' className='menuOption' href={this.props.user.type === 'admin' ? `/#/adminlanding/edituser/${this.props.user.user_name}/${this.props.user.user_id}` : `/#/edituser/${this.props.user.user_name}/${this.props.user.user_id}`}><p className='menuOption'
                    onClick={()=> this.props.changeActiveTab(5)}
                    >PROFILE</p></a>
                    <a id='profileATag' className='menuOption' href={'/#/dailyview'}><p className='menuOption'>SCHEDULE</p></a>
                    <a id='profileATag' className='menuOption' href={'/#/dailyview'}><p className='menuOption'>LOGOUT</p></a>
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
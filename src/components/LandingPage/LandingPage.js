import React from 'react';
import './LandingPage.css';
import { connect } from 'react-redux';
import { changeLandingPageStatus } from '../../ducks/user';

function LandingPage(props) {
    console.log(props.changeLandingPageStatus)
    return (
        <div className='landingPage'>
            <h1>Studio Tracker</h1>
            <a onClick={() => props.changeLandingPageStatus(false)} href={process.env.REACT_APP_LOGIN}><button>Login</button></a>
        </div>
    )
}

export default connect(null, { changeLandingPageStatus })(LandingPage);
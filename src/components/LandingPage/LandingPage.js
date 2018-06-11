import React from 'react';
import './LandingPage.css';
import { connect } from 'react-redux';
import { changeLandingPageStatus } from '../../ducks/user';

function LandingPage(props) {
    console.log(props.changeLandingPageStatus)
    return (
        <div className='landingPage'>
            <h1 className='landingPageHeader'>CENTER STAGE</h1>
            <h3 className='landingPageSubHeader'>PERFORMING STUDIO ARTS</h3>
            <a onClick={() => props.changeLandingPageStatus(false)} href={process.env.REACT_APP_LOGIN}><p className='logonButton'>LOGIN</p></a>
        </div>
    )
}

export default connect(null, { changeLandingPageStatus })(LandingPage);
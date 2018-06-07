import React from 'react';
import './LandingPage.css';

function LandingPage(props) {
    return (
        <div className='landingPage'>
            <h1>Studio Tracker</h1>
            <a href={process.env.REACT_APP_LOGIN}><button>Login</button></a>
        </div>
    )
}

export default LandingPage;
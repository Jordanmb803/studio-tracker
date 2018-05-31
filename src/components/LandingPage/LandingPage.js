import React from 'react';
import './LandingPage.css';

function LandingPage(props) {
    return (
        <div className='landingPage'>
            <h1>Studio Tracker</h1>
            <a href='http://localhost:3005/login'><button>Login</button></a>
        </div>
    )
}

export default LandingPage;
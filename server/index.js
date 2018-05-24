require('dotenv').config()
const express = require('express')
    , session = require('express-session')
    , bodyParser = require('body-parser')
    , massive = require('massive')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , classController = require('./classes_controller')

const {
    SERVER_PORT,
    CONNECTION_STRING,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL
} = process.env

const app = express()
app.use(bodyParser.json())

massive(CONNECTION_STRING).then(db => {
    console.log('db connected')
    app.set('db', db)
})

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, (accessToken, refreshToken, extraParams, profile, done) => {
   let {displayName, picture, id } = profile
    app.get('db').find_user([id]).then(foundUser => {
        if (foundUser[0]) {
            console.log(foundUser[0].user_id)
            done(null, foundUser[0].user_id)
        } else {
            app.get('db').create_user([displayName, picture, id]).then(user => {
                console.log(user[0].user_id)
                done(null, user[0].user_id)
            })
        }
    })
}))

passport.serializeUser((user_id, done) => {
    console.log(user_id)
    done(null, user_id) 
})

passport.deserializeUser((user_id, done) => {
    app.get('db').find_session_user([user_id])
        .then(user => {
            done(null, user[0])
        })
})


app.get('/login', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/dailyview',
    failureRedirect: '/login'
}))

app.get('/auth/me', function(req, res ) {
    if(req.user) {
        console.log(req.user)
        res.status(200).send(req.user)
    } else {
        res.status(401).send('not authorized')
    }
})

// Dance Class Endpoints
app.get('/todayclasses/:day/:user_id', classController.todaysClasses)
app.get('/danceclasses', classController.allDanceClasses)

// Registration Endpoints
app.get('/courseroll', classController.courseRoll)

// Hours Endpoints
app.post('/inputhours', classController.inputHours)


app.listen(SERVER_PORT, () => console.log(`Port ${SERVER_PORT} is now listening`))

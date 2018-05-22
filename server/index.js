require('dotenv').config()
const express = require('express')
    , session = require('express-session')
    , bodyParser = require('body-parser')
    , massive = require('massive')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')

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
    app.get('db').find_User([id]).then(foundUser => {
        if (foundUser[0]) {
            done(null, foundUser[0].id)
        } else {
            app.get('db').create_user([displayName, picture, id]).then(user => {
                done(null, user[0].id)
            })
        }
    })
}))

passport.serializeUser((id, done) => {
    done(null, id) 
})

passport.deserializeUser((id, done) => {
    done(null, id)
})

app.get('/login', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000',
    failureRedirect: '/login'
}))
app.get('/auth/me', function(req, res ) {
    if(req.user) {
        res.status(200).send(req.user)
    } else {
        res.status(401).send('not authorized')
    }
})


app.listen(SERVER_PORT, () => console.log(`Port ${SERVER_PORT} is now listening`))

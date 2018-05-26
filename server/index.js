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
    let { displayName, picture, id } = profile
    let { givenName } = profile.name
    let { familyName } = profile.name
    app.get('db').find_user([id]).then(foundUser => {
        if (foundUser[0]) {
            done(null, foundUser[0].user_id)
        } else {
            app.get('db').create_user([displayName, picture, id, givenName, familyName]).then(user => {
                done(null, user[0].user_id)
            })
        }
    })
}))

passport.serializeUser((user_id, done) => {
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
    successRedirect: '/checkadmin',
    failureRedirect: '/login'
}))

app.get('/checkadmin', function (req, res) {
    if (req.user.type === 'teacher') {
        res.redirect('http://localhost:3000/#/dailyview')
    } else {
        res.redirect('http://localhost:3000/#/adminlanding')
    }
})

app.get('/auth/me', function (req, res) {
    if (req.user) {
        res.status(200).send(req.user)
    } else {
        res.status(401).send('not authorized')
    }
})

// Dance Class Endpoints
app.get('/todayclasses/:day/:user_id', classController.todaysClasses)
app.get('/danceclasses', classController.allDanceClasses)
app.post('/createcourse', classController.createCourse)
app.put('/editcourse', classController.editCourse)
app.delete('/deletecourse/:class_id', classController.deleteCourse)

// Registration Endpoints
app.get('/courseroll', classController.courseRoll)

// Hours Endpoints
app.post('/inputhours', classController.inputHours)
app.delete('/deleteinput/:userid/:class_id/:date', classController.deleteHours)

// User Endpoints
app.get('/getallusers', classController.getAllUsers)
app.put('/user/edituser', classController.editUser)

app.listen(SERVER_PORT, () => console.log(`Port ${SERVER_PORT} is now listening`))

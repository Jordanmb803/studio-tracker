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

app.use( express.static( `${__dirname}/../build` ) );

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
    scope: 'openid profile email'
}, (accessToken, refreshToken, extraParams, profile, done) => {
    let { displayName, picture, id } = profile
    let { givenName } = profile.name
    let { familyName } = profile.name
    let {email} = profile._json;

    app.get('db').find_user([email]).then(foundUser => {
        if (foundUser[0]) {
            done(null, foundUser[0].user_id)
            console.log(email)
        } else {
            console.log(email)
            done(null, null)
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
    if (req.user.type === 'admin') {
        res.redirect(process.env.ADMIN_REDIRECT)
    } else {
        res.redirect(process.env.TEACHER_REDIRECT)
    }
})

app.get('/auth/me', function (req, res) {
    if (req.user) {
        res.status(200).send(req.user)
    } else {
        res.status(401).send('not authorized')
    }
})

app.post('/api/console', (req, res ) => {
    console.log(req.body)
    res.sendStatus(200)
})

// Dance Class Endpoints
app.get('/todayclasses/:day/:user_id', classController.todaysClasses)
app.get('/danceclasses', classController.allDanceClasses)
app.post('/createcourse', classController.createCourse)
app.put('/editcourse', classController.editCourse)
app.delete('/deletecourse/:class_id', classController.deleteCourse)

// Registration Endpoints
app.get('/courseroll', classController.courseRoll)
app.post('/register/userinclass/:user_id/:class_id', classController.registerUserInClass)
app.delete('/register/removeuserfromclass/:user_id/:class_id', classController.removeUserFromCourse)
app.delete('/register/deleteclassregistrations/:class_id', classController.deleteClassRegistration)

// Hours Endpoints
app.post('/inputhours', classController.inputHours)
app.delete('/deleteinput/:user_id/:class_id/:date', classController.deleteHours)
app.delete('/delete/allclassinput/:class_id/:date', classController.deleteAllClassInputs)
app.post('/hours/attendance', classController.getAttendance)
app.post('/hours/teachers', classController.getTeachersHours)
app.post('/hours/teachers/total', classController.getTeachersTotalHours)
app.get('/hours/checkrollsubmission/:date/:class_id', classController.rollSubmittedPreviouslyCheck)

// User Endpoints
app.get('/getallusers', classController.getAllUsers)
app.put('/user/edituser', classController.editUser)
app.post('/user/admincreateuser', classController.adminCreateUser)
app.delete('/user/deleteuser/:user_id', classController.deleteUser)

// Privates Endpoints
app.get('/privates/getallprivates', classController.getAllPrivates)
app.post('/privates/createprivate', classController.createPrivate)



// Has to be the last endpoint
const path = require('path')
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(SERVER_PORT, () => console.log(`Port ${SERVER_PORT} is now listening`))

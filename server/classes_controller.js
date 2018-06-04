module.exports = {
    todaysClasses: (req, res, next) => {
        const { day, user_id } = req.params
        req.app.get('db').get_classes([day, user_id])
            .then(classes => {
                res.status(200).send(classes)
            })
    },
    allDanceClasses: (req, res) => {
        req.app.get('db').get_all_classes()
            .then(classes => {
                res.status(200).send(classes)
            })
    },
    courseRoll: (req, res) => {
        req.app.get('db').get_courseRoll()
            .then(courseRoll => {
                res.status(200).send(courseRoll)
            })
    },
    inputHours: (req, res) => {
        const { user_id, class_id, date } = req.body
        req.app.get('db').input_hours([user_id, class_id, date])
            .then(ok => res.sendStatus(200))
    },
    deleteHours: (req, res) => {
        const { userid, class_id, date } = req.params
        req.app.get('db').delete_hours_input([userid, class_id, date])
            .then(ok => res.sendStatus(200))
    },
    getAllUsers: (req, res) => {
        req.app.get('db').get_all_users()
            .then(users => {
                res.status(200).send(users)
            })
    },
    createCourse: (req, res) => {
        const { classNumber, classTitle, length, dayOfWeek, time, teacher_id } = req.body
        req.app.get('db').create_course([classNumber, classTitle, length, dayOfWeek, time, teacher_id])
            .then(ok => {
                res.sendStatus(200)
            })
    },
    editCourse: (req, res) => {
        const { classid, classNumber, classTitle, length, dayOfWeek, time, teacherName, teacher_id } = req.body
        req.app.get('db').edit_course([classid, classNumber, classTitle, length, dayOfWeek, time, teacherName, teacher_id])
            .then(ok => {
                res.sendStatus(200)
            })
    },
    deleteCourse: (req, res) => {
        const { class_id } = req.params
        req.app.get('db').delete_course([class_id])
            .then(ok => {
                res.sendStatus(200)
            })
    },
    editUser: (req, res) => {
        const { firstName, lastName, email, address, city, state, zipcode, type, userName, profilePicture, user_id } = req.body
        req.app.get('db').edit_user([firstName, lastName, email, address, city, state, zipcode, type, userName, profilePicture, user_id])
            .then(ok => {
                res.sendStatus(200)
            })
    },
    adminCreateUser: (req, res) => {
        const { firstName, lastName, email, address, city, state, zipcode, type, userName, profilePicture } = req.body
        req.app.get('db').admin_create_user([firstName, lastName, email, address, city, state, zipcode, type, userName, profilePicture])
            .then(ok => {
                res.sendStatus(200)
            })
    },
    deleteUser: (req, res) => {
        const { user_id } = req.params
        req.app.get('db').delete_user([user_id]).then(ok => res.sendStatus(200))
    },
    registerUserInClass: (req, res) => {
        const { user_id, class_id } = req.params
        req.app.get('db').register_user_in_class([user_id, class_id])
            .then(ok => {
                res.sendStatus(200)
            })
    },
    removeUserFromCourse: (req, res) => {
        const { user_id, class_id } = req.params
        req.app.get('db').remove_user_from_course([user_id, class_id])
            .then(ok => {
                res.sendStatus(200)
            })
    },
    deleteClassRegistration: (req, res) => {
        const { class_id } = req.params
        req.app.get('db').delete_class_registeration([class_id])
            .then(ok => {
                res.sendStatus(200)
            })
    },
    getAttendance: (req, res) => {
        const { firstDate, secondDate, user } = req.body
        req.app.get('db').get_hours([firstDate, secondDate, user])
            .then(hours => {
                res.status(200).send(hours)
            })
    },
    getTeachersHours: (req, res) => {
        const { firstDate, secondDate, user } = req.body
        req.app.get('db').get_teachers_hours([firstDate, secondDate, user])
            .then(hours => {
                res.status(200).send(hours)
            })
    },
    getTeachersTotalHours: (req, res) => {
        const { firstDate, secondDate, user } = req.body
        req.app.get('db').get_teachers_total_hours([firstDate, secondDate, user])
            .then(totHours => {
                res.status(200).send(totHours)
            })
    },
    rollSubmittedPreviouslyCheck: (req, res) => {
        const {date, class_id} = req.params
        req.app.get('db').roll_submitted([date, class_id])
            .then(roll => {
                res.status(200).send(roll)
            })
    }

}
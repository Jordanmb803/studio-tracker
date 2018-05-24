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
        const { userid, date } = req.params
        req.app.get('db').delete_hours_input([userid, date])
            .then(ok => res.sendStatus(200))
    }
}
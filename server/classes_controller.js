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
            .then( courseRoll => {
                res.status(200).send(courseRoll)
            })
    }
}
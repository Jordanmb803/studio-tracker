module.exports = {
    todaysClasses: (req, res, next) => {
        const { day, user_id } = req.params
        req.app.get('db').get_classes([day, user_id])
            .then(classes => {
                res.status(200).send(classes)
            })
    }
}
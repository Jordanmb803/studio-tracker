module.exports = {
    todaysClasses: (req, res, next) => {
        const { day } = req.params
        req.app.get('db').get_classes([day])
            .then(classes => {
                res.status(200).send(classes)
            })
    }
}
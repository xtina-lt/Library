const CONTROLLER = require('../controllers/gifshop.controllers')


module.exports = app => {
    app.get('/api/gifshops', CONTROLLER.find)
    app.get('/api/gifshops/user/:id', CONTROLLER.findUser)
    app.post('/api/gifshop/create', CONTROLLER.create)
    app.get('/api/gifshop/:id',CONTROLLER.findOne)
    app.put('/api/gifshop/:id', CONTROLLER.update)
    app.delete('/api/gifshop/:id', CONTROLLER.deleteOne)
}
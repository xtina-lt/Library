const CONTROLLER = require('../controllers/projects.controllers')


module.exports = app => {
    app.get('/api/projects', CONTROLLER.find)
    app.post('/api/project/create', CONTROLLER.create)
    app.get('/api/project/:id',CONTROLLER.findOne)
    app.put('/api/project/:id', CONTROLLER.update)
    app.delete('/api/project/:id', CONTROLLER.deleteOne)
}
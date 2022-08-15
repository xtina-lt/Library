const Model = require('../models/gifshop.model')


const create = (req,res) => {
    Model.create(req.body)
        .then( e => {console.log('isnerted'); res.json(e)} )
        .catch( e => {console.log('not inserted'); res.json(e)} )
}
const find = (req, res) => {
    Model.find()
        .then( e => res.json( e ) )
        .catch( e => res.json( e ) )
}

const findUser = (req, res) => {
    Model.find( {users: req.params.id} )
        .then( e => res.json( e ) )
        .catch( e => res.status(400).json({ errors: 'oops something when wrong in find' }) )
}

const findOne = (req, res) => {
    Model.findOne( {_id: req.params.id} )
        .then( e => res.json(e) )
        .catch( e => res.status(400).json({ errors: 'oops something when wrong in findone' })  )
}

const update = (req, res) => {
    Model.findOneAndUpdate( {_id: req.body._id}, req.body, { new: true } )
        .then( e => {res.json(e)} )
        .catch( e => res.json(e) )
}

const deleteOne = (req, res) => {
    Model.deleteOne({_id: req.params.id})
        .then( e => res.json(e) )
        .catch( e => res.json(e) )
}

module.exports = {create, find, findOne, update, deleteOne, findUser};
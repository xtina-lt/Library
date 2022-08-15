const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    name: {
        type: String
    }, 
    desc: {
        type : String
    },
    url : {
        type : String
    },
    price : {
        type: Number
    },
    users: {
        type : []
    }
})

module.exports = mongoose.model('Gifshop', Schema)
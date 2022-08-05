const Model = require('../models/users.model')
// decrypt and encrypt passwords
const bcrypt = require('bcrypt')
// JWT: Json Web Token
// encoded and varified by secret key
// decodent into json object
const jwt = require('jsonwebtoken')
// get secret ket from .env
require('dotenv').config()
const SECRET = process.env.SECRET


// test
const index = (req, res) => {
    res.json({message:"Hello World"})
}

const register = async(req, res) => {
    try{
        // check to make sure email is not the same
        const checkEmail  = await Model.findOne({email: req.body.email})
        if (checkEmail) {
            console.log('found')
            res.status(400).json({errors: { email : {message: 'Email in use🦄'} } })
        // check other inputs
        } else {
        const data = new Model(req.body)
        const user = await data.save()
        const token = jwt.sign({_id : user._id, email: user.email, first: user.first, stars : user.stars}, SECRET)
        res.status(201)
            // create cookie
            // name, generated token, expiration
            .cookie('userToken', token, {expires: new Date(Date.now()+900000)})
            .json({successMessage: 'user created', user: user})
        }
    } catch (err) {
        res.status(400).json(err)
    }
}

const login = async (req, res) => {
    const user  = await Model.findOne({email: req.body.email})
    console.log(user)
    try {
        // if email not in system
        if (!user) {
            res.status(400).json({errors: 'Email not found'})
        // else check the rest
        } else {
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if (!validPassword) {
                res.status(400).json({errors: 'Invalid email/password'})
            } else {
                const token = jwt.sign({_id : user._id, email: user.email, first: user.first, stars: user.stars}, SECRET)
                res.status(201)
                    .cookie('userToken', token, { expires: new Date(Date.now()+900000) })
                    .json({successMessage: 'userToken: ', user: user})
            }
        }
    } catch (err) {
        res.status(400).json({errors: 'oops something when wrong'})
    }
}

const logout = (req, res) => {
    res.clearCookie('userToken')
    res.json( {successMessage : 'user logout'} )
}

const getLoggedIn = (req, res) => {
    const user = jwt.verify(req.cookies.userToken, SECRET)
    Model.findOne({_id: user._id})
        .then( e => res.json(e) )
        .catch( e => console.log(e) )
}

// export
module.exports={index, register, login, logout}



/* JOIN
const createMovie = (req, res) =>
const token = jwt.verify(req.cookies.userToken, SECRET)
Movie.create({...req.body, createdBy: user._id})
*/
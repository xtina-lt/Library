const Model = require('../models/users.model')
// decrypt and encrypt passwords
const bcrypt = require('bcrypt')
// JWT: Json Web Token
// encoded and varified by secret key
// decodent into json object
const jwt = require('jsonwebtoken')
// // get secret ket from .env
// require('dotenv').config()
const SECRET = "SECRETpassw0rd"

// test
const index = (req, res) => {
    res.json({ message: "Hello World" })
}

const register = async (req, res) => {
    try {
        // check to make sure email is not the same
        const checkEmail = await Model.findOne({ email: req.body.email })
        if (checkEmail) {
            res.status(400).json({ errors: { email: { message: 'Email in use🦄' } } })
            // check other inputs
        } else {
            const data = new Model(req.body)
            const user = await data.save()
            const token = jwt.sign({ _id: user._id, email: user.email, first: user.first}, SECRET)
            res.cookie('userToken', token, { httpOnly: true }, { sameSite: 'none', secure: true })
            res.cookie('stars', user.stars, { sameSite: 'none', secure: true })
            res.cookie('userId', user._id.toString(), { sameSite: 'none', secure: true })
            .json({ successMessage: 'userToken: ', user: user })
        }
    } catch (err) {
        res.status(400).json(err)
    }
}

const login = async (req, res) => {
    const user = await Model.findOne({ email: req.body.email })
    console.log('logging in:' + user)
    try {
        // if email not in system
        if (!user) {
            res.status(400).json({ errors: 'Email not found' })
            // else check the rest
        } else {
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if (!validPassword) {
                res.status(400).json({ errors: 'Invalid email/password' })
            } else {
                const payload = { _id: user._id, email: user.email, first: user.first }
                const token = jwt.sign(payload, SECRET)
                res.cookie('userToken', token, { httpOnly: true })
                //, { sameSite: 'none', secure: true })
                res.cookie('stars', user.stars)
                // , { sameSite: 'none', secure: true }
                res.cookie('userId', user._id.toString())
                // { sameSite: 'none', secure: true }
                .json({ successMessage: 'userToken: ', user: user })
            }
        }
    } catch (err) {
        res.status(400).json({ errors: 'oops something when wrong' })
    }
}

const logout = (req, res) => {
    res.clearCookie('userToken')
    res.clearCookie('stars')
    res.clearCookie('userId')
    res.json({ successMessage: 'user logout' })
}

const getLogged = async (req, res) => {
    try {
        const user = jwt.verify(req.cookies.userToken, SECRET);
        const currentUser = await Model.findOne({ _id: user._id });
        res.json(currentUser);
    } catch (error) {
        res.status(401).json({ errors: 'get logged user error' });
    }
};

const updateOne = async (req, res) => {
    console.log('updateOne:', req.body.stars)
    const token = jwt.verify(req.cookies.userToken, SECRET);
    const m = await Model.findOne({ _id: token._id });
    Model.findOneAndUpdate( {_id: m._id}, {first: m.first, last: m.last, email: m.email, password: m.password, stars: req.body.stars}, { new: true } )
        .then( e => res.json(e) )
        .catch( e => res.json(e) )
}



// export
module.exports = { index, register, login, logout, getLogged, updateOne }



/* JOIN
const createMovie = (req, res) =>
const token = jwt.verify(req.cookies.userToken, SECRET)
Movie.create({...req.body, createdBy: user._id})
*/
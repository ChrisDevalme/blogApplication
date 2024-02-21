require('dotenv').config
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')


exports.auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '')
        const data = jwt.verify(token, process.env.SECRET)
        const user = await User.findOne({ _id: data._id })
        if(!user) throw new Error ('Bad Credentials')
        req.user = user
        next()
    } catch (error) {
        res.status(400).message({ message: error.message })
    }
}

const createUser = async (req, res , next) => {
    try {
        const user = await User.create(req.body)
        const token = createJWT(user)
        res.locals.data.user = user
        res.locals.data.token = token
        next()
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const loginUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
    if(!user) throw new Error ('User not found, email invalid')
    const password = crypto.createHmac('sha256', process.env.SECRET).update(req.body.password).digest('hex').split('').reverse().join('')
    const match = await bcrypt.compare(password, user.password)
    if(!match) throw new Error('Password Invalid')
    res.locals.data.user = user
    res.locals.data.token = createJWT(user)
    next()
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const updateUser = async (req, res, next) => {
    try {
        const updates = Object.keys(req.body)
        const user = await User.findOne({ _id: req.params.id})
        updates.forEach(update => user[update] = req.body[update])
        await user.save()
        //problem maybe w/ update
        res.locals.data.user = user 
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const deleteUser = async (req, res, next) => {
    try {
        await req.user.deleteOne()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const respondWithToken = (req, res) => {
    res.json(res.locals.data.token)
}

const respondWithUser = (req, res) => {
    res.json(res.locals.data.user)
}

module.exports = {
    auth, 
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    respondWithToken,
    respondWithUser
}

function createJwt(user) {
    return jwt.sign({ user }, process.env.SECRET, { expires: '48h'})
}
const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const User = require('../models/User.model')
const {authSchema} = require('../helpers/validation_schema')
const {signAccessToken} = require('../helpers/jwt_helper')

router.post('/register', async(req, res, next)=>{
    console.log(req.body)
    try {
        // const {email, password} = req.body
        // if(!email || !password) throw createError.BadRequest()

        const result = await authSchema.validateAsync(req.body)

        const doesExist = await User.findOne({email : result.email})
        if(doesExist) throw createError.Conflict(`${result.email} is already registered`)

        const userData = new User(result)
        const savedUser = await userData.save()
        const accessToken = await signAccessToken(savedUser.id)

        res.send({accessToken})


    } catch (error) {
        if(error.isJoi === true) error.status = 422
        next(error)
    }
})

router.post('/login', async(req, res, next)=>{
    res.send("Login Route")
})

router.post('/refresh-token', async(req, res, next)=>{
    res.send("Refresh Token Route")
})
router.delete('/logout', async(req, res, next)=>{
    res.send("Logout Route")
})







module.exports = router
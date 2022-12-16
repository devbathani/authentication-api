const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
    email : {
        type: String,
        required : true,
        lowercase : true,
        unique : true,
    },
    password : {
        type: String,
        required : true,
    }
})

const user = mongoose.model('user', userSchema)
module.exports = user 
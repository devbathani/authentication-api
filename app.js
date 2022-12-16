const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
require('dotenv').config()

const AuthRoute = require('./routes/Auth.route.js')

const app = express()
const port = process.env.PORT || 3000

app.get('/', async(req, res, next) => 
  {
    res.send('Hello World!')
  }  
)

app.use('/auth',AuthRoute)

app.use(async(req, res, next)=> {
    ///Old Way 

    // const error = new Error("Not Found!!!")
    // error.status = 404
    // next(error)

    /// Package way
    next(createError.NotFound())
})

app.use((err, req, res, next) =>{
    res.status(err.status || 500) 
    res.send({
        error: {
            status : err.status || 500,
            message : err.message,
        }
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
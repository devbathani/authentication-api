const mongoose = require('mongoose')

mongoose.set('strictQuery', true)

mongoose.connect(process.env.MONGO_DB_URI, { 
    dbName: process.env.DB_NAME,
    useNewUrlParser: true, 
    useUnifiedTopology: true})
.then(()=>{
    console.log("MongoDb Connected")
}).catch((err) => console.log(err.message))

mongoose.connection.on('connected', ()=>{
    console.log('Mongoose Conneted to db')
})
mongoose.connection.on('error', (err)=>{
    console.log(err.message)
})
mongoose.connection.on('disconnected', ()=>{
    console.log('Mongoose Disconnected to db')
})

process.on('SIGINT', async() => {
    await mongoose.connection.close()
    process.exit(0)
})
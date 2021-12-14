const mongoose = require('mongoose')
require('dotenv').config({ path: 'variables.env' })

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser:  true,
            useUnifiedTopology: true
        })
        console.log('running...')
    } catch (error) {
        console.log(error)
        process.exit(1) //Detiene la app si hay error
    }
}

module.exports = connectDB





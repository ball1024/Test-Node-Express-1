const mongoose = require('mongoose')

const connectDB = async()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/ballDB')
        console.log('DB Connected Success')
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB
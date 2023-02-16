const mongoose = require('mongoose')

module.exports = async function (uri, options = {}) {
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect(uri, options)
        console.log('connect db successfully')
    } catch (error) {
        console.log(`database error: ${error}`)
    }
}

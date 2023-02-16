const { Schema, model } = require('mongoose')

botSchema = new Schema({
    name: String,
    bot_id: String,
    api_key: String,
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Bot', botSchema)
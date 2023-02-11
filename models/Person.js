const mongoose = require('mongoose')

const person = new mongoose.Schema({
    name: String,
    email: String
})

module.exports = person
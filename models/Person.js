const mongoose = require('mongoose')

const person = new mongoose.Schema({
    name: String,
    gender: String,
    pref: String
})

module.exports = person
const mongoose = require('mongoose')
const person = require('../models/Person')

const Person = mongoose.model('Person', person)

class PersonService {
    async Add(name, gender, pref) {
        if (!name || !gender || !pref) return false

        var newPerson = new Person ({name, gender, pref})

        try {
            await newPerson.save()
            return true
        } catch (error) {
            return false
        }
    }
}

module.exports = new PersonService()
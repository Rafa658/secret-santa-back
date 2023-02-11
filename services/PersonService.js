const mongoose = require('mongoose')
const person = require('../models/Person')

const Person = mongoose.model('Person', person)

class PersonService {
    async GetAll() {
        try {
            var result = await Person.find()
            return result
        } catch (error) {
            return []
        }
    }

    async Add(name, email) {
        if (!name || !email ) return false

        var newPerson = new Person ({name, email})

        try {
            await newPerson.save()
            return true
        } catch (error) {
            return false
        }
    }
}

module.exports = new PersonService()
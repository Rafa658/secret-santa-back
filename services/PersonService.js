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

        let find_name = await (await Person.find({"name": name})).length
        let find_email = await (await Person.find({"email": email})).length

        if(find_name > 0 || find_email > 0) return false

        var newPerson = new Person ({name, email})

        try {
            await newPerson.save()
            return true
        } catch (error) {
            return false
        }
    }

    async DeleteByName(name) {
        if (!name) return false

        try {
            await Person.deleteOne({name})
            return true
        } catch (error) {
            return false
        }
    }

    async Update(name, email, name_upd, email_upd) {
        if (!name_upd || !email_upd) return false
        
        const filter = {"name": name, "email": email}
        const update = {"name": name_upd, "email": email_upd}

        await Person.findOneAndUpdate(filter, update, {new: true})
        return true
    }
}
module.exports = new PersonService()
const mongoose = require(`mongoose`)
const url = 'mongodb://127.0.0.1:27017/secret-santa'

function connectToDatabase() {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

    const db = mongoose.connection
    db.on("error", error => console.log(error))
    db.on("open", () => console.log('Conectado à DB'))
}

module.exports = connectToDatabase
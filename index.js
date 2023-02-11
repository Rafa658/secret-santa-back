const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const connectToDatabase = require('./database')
const port = 4000

// basic configs for better running
const app = express()
app.use(cors({
    origin: '*'
}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json())

connectToDatabase()

app.listen(process.env.PORT || port, () => console.log(`Started at port ${port}`))
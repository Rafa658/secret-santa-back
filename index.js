const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const connectToDatabase = require('./database')
const res = require('express/lib/response')
const port = 4000

// basic configs for better running
const app = express()
app.use(cors({
    origin: '*'
}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json())

app.listen(process.env.PORT || port, () => console.log(`Started at port ${port}`))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

connectToDatabase()

app.get('/', (req, res) => res.send("Running"))

app.get('/get_person', async (req, res) => {
    
})
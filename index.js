const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const connectToDatabase = require('./database')
const res = require('express/lib/response')
const port = 4000

const PersonService = require('./services/PersonService')

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

app.get('/get_people', async (req, res) => {

    var results = await PersonService.GetAll()
    res.send(results)
    res.status(200)
})

app.post('/add_person', async (req, res) => {
    var body = req.body

    var status = PersonService.Add(body.name, body.gender, body.pref)

    if (status) {
        res.status(200)
        res.send('Ok')
    } else {
        res.status(400)
        res.send('Error')
    }
})
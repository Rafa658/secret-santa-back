const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const connectToDatabase = require('./database')
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

// listen on env variable or port = 4000
app.listen(process.env.PORT || port, () => console.log(`Started at port ${port}`))

// cors configs
app.use(function (_, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// opening mongodb
connectToDatabase()

// backend routes
app.get('/', (_, res) => res.send("Running"))

app.get('/get_people', async (_, res) => {

    var results = await PersonService.GetAll()
    res.send(results)
    res.status(200)
})

app.post('/add_person', async (req, res) => {
    var body = req.body

    var status = PersonService.Add(body.name, body.email)

    if (status) {
        res.status(200)
        res.send('Ok')
    } else {
        res.status(400)
        res.send('Error')
    }
})

app.delete('/delete_person', async (req, res) => {
    var body = req.body

    var status = PersonService.DeleteByName(body.name)

    if (status) {
        res.status(200)
        res.send(`Deleted ${body.name}`)
    } else {
        res.status(400)
        res.send('Error')
    }
})

app.patch('/update_person', async (req, res) => {
    var body = req.body

    var status = PersonService.Update(body)

    if (status) {
        res.status(200)
        if (body.name_upd) res.send(`Changed name to ${body.name_upd}`)
        if (body.email_upd) res.send(`Changed email to ${body.email_upd}`)
    } else {
        res.status(400)
        res.send('Error')
    }
})
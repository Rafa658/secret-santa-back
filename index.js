const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const connectToDatabase = require('./database')
const generateDraw = require('./utilities/generateDraw')
const port = 4000
const sendMail = require('./utilities/sendMail')

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

app.get('/draw', async (_, res) => {
    try {
        var people = await PersonService.GetAll()
        var draw = await generateDraw(people)

        sendMail(draw)
    
        res.send(draw)
        res.status(200) 
    } catch (error) {
        res.send(error)
        res.status(400)
    }
})

app.post('/add_person', async (req, res) => {
    var body = req.body

    var stat = await PersonService.Add(body.name, body.email)

    if (stat) {
        res.status(200)
        res.send(`Added ${body.name} ${body.email}`)
    } else {
        res.status(400)
        res.send('Error')
    }
})

app.delete('/delete_person', async (req, res) => {
    var body = req.body

    var stat = await PersonService.DeleteByName(body.name)

    if (stat) {
        res.status(200)
        res.send(`Deleted ${body.name}`)
    } else {
        res.status(400)
        res.send('Error')
    }
})

app.patch('/update_person', async (req, res) => {
    var body = req.body

    var stat = await PersonService.Update(body.name, body.email, body.name_upd, body.email_upd)

    if (stat) {
        res.status(200)
        res.send(`Updated ${body.name_upd} ${body.email_upd}`)
    } else {
        res.status(400)
        res.send('Error')
    }
})
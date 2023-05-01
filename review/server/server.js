const express = require('express')
const cors =  require('cors')

const app = express()

app.use(cors())
app.use(express.json())

// the response HTTP methods:
app.get('http://localhost:4004/get', (req, res) => {
    console.log('recieved response from client')
    res.status(200).send('request recieved and sending response')
})


//request with body info
app.post('http://localhost:4004/body', (req, res) => {
    let { name, job } = req.body // same as let name = req.body.name & let job = req.body.job
    res.status(200).send(`Recieved body data for ${name}`)

})

// request with params
app.get('/:name', (req, res) => {
    console.log(req.params)
    let name = req.params.name
    res.status(200).send(`Recieved parameter data for ${name}`)
})

app.get('/', (req, res) => {
    let username = req.query.username
    res.status(200).send(`Recieved query data for ${username}`)
})
//session 
//temporary data needed to track info from the front end - broswer tracks it/stores it
//app.use(express.session)


app.listen(4004, () => console.log('4004 is running'))
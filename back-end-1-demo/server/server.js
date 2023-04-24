//imports & packages
const express = require('express') 
const cors = require('cors')

//initialize express
const app = express()

//middleware
app.use(express.json())
app.use(cors())

//database
const inventory = ['greeting card', 'table', 'chair', 'milk', 'boat', 'cookies', 'cheese', 'shampoo', 'conditioner', 'face wash']

//endpoints 
// all inventory
app.get('/api/inventory', (req, res) => {res.status(200).send(inventory)})
// enpoint with parameter
app.get('/api/inventory/:id', (req, res) => {
    //console.log(req.params.id)
    const {id} = req.params
    res.status(200).send(inventory[id])
})

app.get('/api/inventory/:id', (req, res) => {
    console.log(req.query);
    if (req.query.item) {
        const filteredItems = inventory.filter((invItem) => invItem.toLowerCase().includes(req.query.item.toLowerCase()))
        res.status(200).send(filteredItems) 
    } else {
        res.status(200).send(inventory) 
    }
})

//runs the server
app.listen(5050, () => console.log(`jammin on 5050`))

//
app.get("/api/:name") (req, res) =>  {
    
}
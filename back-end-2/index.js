const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

// create controller file then route to it
const userController = require('./controller')
const { getAllHouses, createHouse, updateHouse, deleteHouse } = userController


app.get('/api/houses', getAllHouses)
app.post('/api/houses', createHouse)
app.put('/api/houses/:id', updateHouse)
app.delete('/api/houses/:id', deleteHouse)

app.listen(4004, () => console.log('running 4004'))
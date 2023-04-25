const express = require('express')
const cors = require('cors')
const app = express()

//middleware
//allows this to communicate with front end with runs on a different port
app.use(cors())
//converts files to json for back end to use
app.use(express.json())

const userController = require('./controller/userController.')
const {getAllMovies, createMovie, deleteMovie, updateMovie} = userController;

//routes
app.get('/api/movies', getAllMovies)
app.post('/api/movies', createMovie)
app.delete('/api/movies/:movie_id', deleteMovie)
app.put('/api/movie/:id', updateMovie)

// logic -> moved to controller
//import database
// const db = require('./db.json')
// const getAllMovies = (req, res) => {
//     let allMovies = db
//     res.status(200).send(allMovies)
// }







app.listen(4004, () => console.log('Listening on port 4004 ...'))
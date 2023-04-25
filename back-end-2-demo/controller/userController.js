const db = require('../db.json')
let id = db.length

module.exports = {
    getAllMovies : (req, res) => {
        let allMovies = db
        res.status(200).send(allMovies)
    },
    createMovie : (req, res) => {
        id++
       let newMovie = {...req.body, id: id}
       db.push(newMovie)
       res.status(200).send(db)
    }, 
    deleteMovie : (req, res) => {
       //const id = req.params.id  // that why you add :id to the route - this must match
       const {movie_id} = req.params  
       for (let i = 0; i < db.length; i++) {
        if (db[i].id === +movie_id) {
            db.splice(i, 1)
        }
       }
       res.status(200).send(db)
    },
    updateMovie : (req, res) => {
        const {movie_id} = req.params
        const {type} = req.body

        for(let i = 0; i < db.length; i++) {
            if(db[i].id === +movie_id) {
                if (type === 'minus') {
                db[i].rating++
            }
            if (type === 'minus') {
                db[i].rating--
            }
        }
    }
}
}
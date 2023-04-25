const houses = require('./server/db.json')
let globalId = 4

module.exports = {
  getAllHouses: (req, res) =>  res.status(200).send(houses) ,

  deleteHouse: (req, res) => {
    let index = houses.findIndex(el => el.id === +req.params.id)
    houses.splice(index, 1)
    res.status(200).send(houses)
  },

  createHouse: (req, res) => {
    let { address, price, imageURL } = req.body
    let newHouse = { ...req.body, id: globalId}
    houses.push(newHouse)
    res.status(200).send(houses)
    globalId++
  },

  updateHouse: (req, res) => {
    const { id } = req.params
    const { type } = req.body
    let index = houses.findIndex(el => +el.id === +id)
        if (houses[index].price <=10000 && type === 'minus') {
            houses[index].price = 0
            res.status(200).send(houses)
        } else if (type === 'plus') {
            houses[index].price += 10000
            res.status(200).send(houses)
        } else if (type === 'minus') {
            houses[index].price -= 10000
            res.status(200).send(houses)
        } else {
            res.sendStatus(400)
        }
    }
    
}

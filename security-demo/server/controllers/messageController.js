const bcrypt = require('bcryptjs')
const chats = []

//we want to create new objects when new keys are used and append/put objects when an existing pin is used
[
{
  message: 'hello',
  pin: 1234
}

]


module.exports = {
    createMessage: (req, res) => {
      //console.log(req.body) //
        const { pin, message } = req.body //
        for (let i = 0; i < chats.length; i++) {
          //check for exsisting pin
          // if (chats[i].pin === +pin) {
          //   chats[i].messages.push(message)
          //   return
          // }
          //compareSync does the above logic
          const existing = bcrypt.compareSync(pin, chats[i].pinHash)
            if (existing) {
              chats[i].messages.push(message)
              // this removes the pinHash to prep for front end
              let messagesToReturn = {...chats[i]}
              delete messagesToReturn.pinHash
              res.status(200).send(chats[i])
              return
            }
          }

          // encript pin before sending it to storage
          const salt = bcrypt.genSaltSync[10]
          //applys encripytion to pin
          const pinHash = bcrypt.hashSync(pin, salt)
          // create new object for new pins
          const newObj = {
              pinHash,
              messages:[message],
          }
          chats.push(newObj)
          //
          let messagesToReturn = {...newObj}
          delete messagesToReturn.pinHash

          console.log(chats)
          res.status(200).send(newObj)
        }
    }

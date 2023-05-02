
let query = document.querySelector('input')
let button = document.querySelector('button')

const submitHandler = function (event) {
    event.preventDefault()
    console.log(query.value)
    let pokemon = query.value
    
    axios.get('https://pokeapi.co/api/v2/pokemon/${pokemon}').then((a) => {
        console.log(a.data)
    let img = document.querySelector('img')
    img.src = a.data.sprites.front_default
    }).catch(err => {console.log(err)})
}

button.addEventListener('click', submitHandler)








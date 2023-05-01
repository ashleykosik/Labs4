
// select html element
// for the first button
//let button = document.querySelector('button')
let button = document.querySelector('#reqBtn')
let bodyBtn = document.querySelector('#bodyBtn')
// param button
//query button


//build function
// the request - handler Functions: may be placed in a controller file
const sendRequest = (event) => {
    event.preventDefault()

    console.log('sending request ...')
    axios.get('http://localhost:4004/get') //
    .then(() => {
        console.log(res.data)
    })
    .cacth()
}

const bodyRequest = (event) => {
    event.preventDefault()
    let bodyObj = {
        'name': 'Michael',
        'job': "Manager"
    }
    axios.post('http://localhost:4004/body', bodyObj) //
    .then((res) => {
        console.log(res.data)
    })
    .catch(err => console.log(err))

    axios.get('http://localhost:4004/Jimmy')
        .then(res => {
            console.log(res.data)
        })
        .catch(err => console.log(err))
}

const queryRequest = (event) => {
    axios.get('http://localhost:4004?username=Ryan')
    .then(res => { console.log(res.data)})
    .catch(err => console.log(err))
}

//add event listener
button.addEventListener('click', sendRequest)
bodyBtn.addEventListener('click', bodyRequest)
//add params button & event listener
console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
//const messageOne = document.querySelector('#message-1')
//const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    //messageOne.textContent = 'Loading...'
    //messageTwo.textContent = ''

    document.getElementById("message-1").innerHTML = 'Loading Please wait';
    document.getElementById("message-2").innerHTML = '....';

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                //messageOne.textContent = data.error
            } else {
                //messageOne.textContent = data.location
                //messageTwo.textContent = data.forecast
                var a = data.location
                var b = data.forecast
                document.getElementById("message-1").innerHTML = a;
                document.getElementById("message-2").innerHTML = b;
            }
        })
    })
})
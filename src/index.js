//fetch GET request to get all of the pup ovbjects
const URL = 'http://localhost:3000/pups'
const dogBar = () => document.getElementById('dog-bar')

document.addEventListener('DOMContentLoaded', () => {
    fetch(URL).then(response => response.json()).then(dogArray => dogArray.forEach(dog => renderDogBar(dog)))    
    
})

//add a span w/ the pup's name in to the dog bar
function renderDogBar(dog){
    let span = document.createElement('span')
    span.innerText = dog.name
    span.id = dog.id
    dogBar().appendChild(span)
    span.addEventListener('click', (event) => dogInfo(dog))
}

//user can click on pup's span in the dog par


function dogInfo(dog){
    let div = document.getElementById('dog-info')
    let id = dog.id

    let img = document.createElement('img')
    img.src = dog.image

    let h2 = document.createElement('h2')
    h2.innerText = dog.name

    let button = document.createElement('button')
    
    if (dog.isGoodDog){
        button.innerText = 'Good Dog!'
    } else {
        button.innerText = 'Bad Dog!'
    }

    button.addEventListener('click', () => {
        dog.isGoodDog = !dog.isGoodDog
        
        let goodness = {isGoodDog: dog.isGoodDog}

            fetch(`${URL}/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(goodness)
        })
        .then(response => response.json())
        .then(dog => button.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!")

            
        })
        div.innerHTML = ""
        div.append(img, h2, button)
}
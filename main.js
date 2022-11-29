let randomJoke = document.getElementById('joke-container');
let savedJoke = document.getElementById('saved-container');

let myJokes = JSON.parse(localStorage.getItem("myJokes"));
if (myJokes === null) {
    myJokes = [];
}

renderSavedJokes();

async function fetchRandomJoke() {
    let response = await fetch("https://icanhazdadjoke.com", {
        headers: {
            Accept: "application/json",
        },
    });
    let joke = await response.json();
    let myRandomJoke = joke.joke;
    randomJoke.textContent = myRandomJoke;
    let saveButton = document.createElement('button');
    randomJoke.appendChild(saveButton);
    saveButton.textContent = 'Save';

    saveButton.onclick = function () {
        myJokes.push(myRandomJoke);
        localStorage.setItem("myJokes", JSON.stringify(myJokes));
        renderSavedJokes();
    }
}

function renderSavedJokes() {
    savedJoke.innerHTML = '';
    for (let i = 0; i<myJokes.length; i++) {
        let savedDiv = document.createElement('div');
        savedJoke.appendChild(savedDiv);
        savedDiv.textContent = myJokes[i];
        let deleteButton = document.createElement('button');
        savedDiv.appendChild(deleteButton);
        deleteButton.textContent = 'delete';

        deleteButton.onclick = function() {
            myJokes.splice(i,1);
            localStorage.setItem('myJokes', JSON.stringify(myJokes));
            renderSavedJokes();
        }
    }

}






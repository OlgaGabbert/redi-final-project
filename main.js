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

async function fetchDictionary(link) {
    let response = await fetch(link);
    let result = await response.json();
    let myMeaning = document.getElementById("myMeaning");
    myMeaning.innerHTML = '';
    for (let i = 0; i < result.length; i++) {
        let resultDiv = document.createElement("div");
        for (let j = 0; j < result[i].meanings.length; j++) {
            let meaningDiv = document.createElement('div');
            resultDiv.appendChild(meaningDiv);
            meaningDiv.textContent = result[i].meanings[j].partOfSpeech;
            for (let k = 0; k < result[i].meanings[j].definitions.length; k++) {
                let definitionDiv = document.createElement('div');
                meaningDiv.appendChild(definitionDiv);
                definitionDiv.textContent = result[i].meanings[j].definitions[k].definition;
            }
        }
        myMeaning.appendChild(resultDiv);
    }
}


function searchWord() {
    let word = document.getElementById('word').value;
    let link = "https://api.dictionaryapi.dev/api/v2/entries/en/" + encodeURIComponent(word);
    fetchDictionary(link);
}


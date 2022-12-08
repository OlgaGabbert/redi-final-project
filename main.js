let randomJoke = document.getElementById('joke-container');
let savedJoke = document.getElementById('saved-container');
let myMeaning = document.getElementById("myMeaning");
let savedMeaning = document.getElementById('saved-meaning');

let myDefinitions = JSON.parse(localStorage.getItem('myDefinitions'));
if (myDefinitions === null) {
    myDefinitions = [];
}

let myJokes = JSON.parse(localStorage.getItem("myJokes"));
if (myJokes === null) {
    myJokes = [];
}

renderSavedJokes();
renderSavedWordsAndMeanings();

async function fetchRandomJoke() {
    let response = await fetch("https://icanhazdadjoke.com", {
        headers: {
            Accept: "application/json",
        },
    });
    let joke = await response.json();
    let myRandomJoke = joke.joke;
    randomJoke.textContent = myRandomJoke;
    randomJoke.classList.add('randomJokeCard');
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
    randomJoke.innerHTML = '';
    randomJoke.classList.remove('randomJokeCard');
    savedJoke.innerHTML = '';
    if(myJokes.length > 0) {
        let savedJokeHeader = document.createElement('h3');
        savedJoke.appendChild(savedJokeHeader);
        savedJokeHeader.textContent = 'Saved Jokes';
        savedJokeHeader.classList.add('cardHeader');
    }
    for (let i = 0; i < myJokes.length; i++) {
        let savedDiv = document.createElement('div');
        savedJoke.appendChild(savedDiv);
        savedJoke.classList.add('savedJokeCard');
        savedDiv.textContent = myJokes[i];

        let deleteButton = document.createElement('button');
        savedDiv.appendChild(deleteButton);
        deleteButton.textContent = 'Delete';

        deleteButton.onclick = function () {
            myJokes.splice(i, 1);
            localStorage.setItem('myJokes', JSON.stringify(myJokes));
            renderSavedJokes();
        }
    }
}

async function fetchDictionary(link) {
    let myWord = document.getElementById('word').value;
    let response = await fetch(link);
    let result = await response.json();
    if (result.title === 'No Definitions Found') {
        let myMessage = result.message;
        let error = document.createElement('div');
        myMeaning.appendChild(error);
        error.textContent = myMessage;
    } else {
        myMeaning.innerHTML = '';
        for (let i = 0; i < result.length; i++) {
            let resultDiv = document.createElement("div");
            for (let j = 0; j < result[i].meanings.length; j++) {
                let meaningDiv = document.createElement('div');
                let partOfSpeech = document.createElement('p');
                resultDiv.appendChild(meaningDiv);
                meaningDiv.appendChild(partOfSpeech);  
                partOfSpeech.textContent = result[i].meanings[j].partOfSpeech;
                partOfSpeech.style.fontWeight = 'bold';
                for (let k = 0; k < result[i].meanings[j].definitions.length; k++) {
                    let definitionDiv = document.createElement('div');
                    meaningDiv.appendChild(definitionDiv);
                    let definition = result[i].meanings[j].definitions[k].definition;
                    definitionDiv.textContent = definition;

                    let saveWordAndMeaning = document.createElement('button');
                    definitionDiv.appendChild(saveWordAndMeaning);
                    saveWordAndMeaning.textContent = 'Save';

                    saveWordAndMeaning.onclick = function () {
                        let storedDefinition = findDefinition(myWord);
                        if (storedDefinition === undefined) {
                            storedDefinition = {
                                word: myWord,
                                definitions: [definition]
                            }
                            myDefinitions.push(storedDefinition);
                        } else {
                            storedDefinition.definitions.push(definition);
                        }
                        localStorage.setItem('myDefinitions', JSON.stringify(myDefinitions));
                        renderSavedWordsAndMeanings();
                    }
                }
            }
            myMeaning.appendChild(resultDiv);
        }
    }
}

function findDefinition(word) {
    for (let i = 0; i < myDefinitions.length; i++) {
        if (myDefinitions[i].word === word) {
            return myDefinitions[i];
        }
    }
}

function searchWord() {
    let word = document.getElementById('word').value;
    let link = "https://api.dictionaryapi.dev/api/v2/entries/en/" + encodeURIComponent(word);
    fetchDictionary(link);
}


function renderSavedWordsAndMeanings() {
    myMeaning.innerHTML = '';
    savedMeaning.innerHTML = '';
    for (let i = 0; i < myDefinitions.length; i++) {
        let savedDefinitionDiv = document.createElement('div');
        savedMeaning.appendChild(savedDefinitionDiv);
        savedDefinitionDiv.textContent = myDefinitions[i].word;
        for (let j = 0; j < myDefinitions[i].definitions.length; j++) {
            let savedDiv = document.createElement('div');
            savedMeaning.appendChild(savedDiv);
            savedDiv.textContent = myDefinitions[i].definitions[j];
        }

        let deleteButton = document.createElement('button');
        savedDefinitionDiv.appendChild(deleteButton);
        deleteButton.textContent = 'Delete';

        deleteButton.onclick = function () {
            myDefinitions.splice(i, 1);
            localStorage.setItem('myDefinitions', JSON.stringify(myDefinitions));
            renderSavedWordsAndMeanings();
        }
    }

}

let navJokes = document.getElementById("nav-jokes");
let navbar = document.getElementById("navbar");
let navPos = navbar.getBoundingClientRect().top;

window.addEventListener("scroll", e => {
  
  let scrollPos = window.scrollY;
  if (scrollPos > navPos) {
    navbar.classList.add('sticky');
    header.classList.add('navbarOffsetMargin');
  } else {
    navbar.classList.remove('sticky');
    header.classList.remove('navbarOffsetMargin');
  }
});



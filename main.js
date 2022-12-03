let randomJoke = document.getElementById('joke-container');
let savedJoke = document.getElementById('saved-container');
let myMeaning = document.getElementById("myMeaning");

let savedMeaning = document.getElementById('saved-meaning');


let myWords = JSON.parse(localStorage.getItem('myWords'));
if (myWords === null) {
    myWords = [];
}

// let myMeanings = JSON.parse(localStorage.getItem('myMeanings'));
// if(myMeanings === null) {
//     myMeanings = [];
// }

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
    savedJoke.innerHTML = '';
    for (let i = 0; i < myJokes.length; i++) {
        let savedDiv = document.createElement('div');
        savedJoke.appendChild(savedDiv);
        savedDiv.textContent = myJokes[i];

        let deleteButton = document.createElement('button');
        savedDiv.appendChild(deleteButton);
        deleteButton.textContent = 'delete';

        deleteButton.onclick = function () {
            myJokes.splice(i, 1);
            localStorage.setItem('myJokes', JSON.stringify(myJokes));
            renderSavedJokes();
        }
    }

}

async function fetchDictionary(link) {
    let response = await fetch(link);
    let result = await response.json();
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
    let saveWordAndMeaning = document.createElement('button');
        myMeaning.appendChild(saveWordAndMeaning);
        saveWordAndMeaning.textContent = 'Save';

    saveWordAndMeaning.onclick = function () {
        let myWord = document.getElementById('word').value;
        myWords.push(myWord);
        // console.log(myMeaning.textContent);
        // myMeanings.push(myMeaning.textContent);
        localStorage.setItem("myWords", JSON.stringify(myWords));
        // localStorage.setItem('myMeanings', JSON.stringify(myMeanings));
        renderSavedWordsAndMeanings();
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
    for (let i = 0; i < myWords.length; i++) {
        let savedWordDiv = document.createElement('div');
        savedMeaning.appendChild(savedWordDiv);
        savedWordDiv.textContent = myWords[i];

        let deleteButtonWord = document.createElement('button');
        savedWordDiv.appendChild(deleteButtonWord);
        deleteButtonWord.textContent = 'delete';

        // for (let j =0; j < myMeanings.length; j++) {
        //     let savedMeaningDiv = document.createElement('div');
        //     savedMeaning.appendChild(savedMeaningDiv);
        //     savedMeaningDiv.textContent = myMeanings[j];
        // }
    }
}
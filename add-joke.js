let submitButton = document.getElementById('submit-joke');
let newJokeContainer = document.getElementById('new-joke');

function submitJoke() {
  let joke = document.getElementById('joke').value;
  let person = document.getElementById('person').value;

  fetch(`/api/quotes?quote=${joke}&person=${person}`, {
    method: 'POST',
  })
  .then(response => response.json())
  .then(({joke}) => {
    let newJoke = document.createElement('div');
    newJoke.innerHTML = `
    <h3>Your joke was added!</h3>
    <div class="joke-text">${joke.joke}</div>
    <div class="attribution">- ${joke.person}</div>
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `
    newJokeContainer.appendChild(newJoke);
  });
};
async function fetchRandomJoke() {
    const response = await fetch("https://icanhazdadjoke.com", {
        headers: {
            Accept: "application/json",
        },
    });
    let joke = await response.json();
    let randomJoke = document.getElementById('joke-container');
    randomJoke.textContent = joke.joke;
  }


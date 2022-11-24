async function fetchRandomJoke() {
    const response = await fetch("https://icanhazdadjoke.com", {
        headers: {
            Accept: "application/json",
        },
    });
    let joke = await response.json();
    console.log(joke.joke);
  }

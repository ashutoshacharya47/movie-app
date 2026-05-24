let params = new URLSearchParams(window.location.search);

let id = params.get("id");

let title = document.querySelector("title");

let url = `https://api.themoviedb.org/3/movie/${id}?api_key=46064f37c58f004f8c5fb659636e9887`;


fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        title.innerText = data.title;
    });
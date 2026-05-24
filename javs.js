let btn = document.querySelector("button");
let movie = document.querySelector("input");
let container = document.querySelector("#container");
let blocks = document.querySelector("#blocks");

let base_url_search = `https://api.themoviedb.org/3/search/movie?api_key=46064f37c58f004f8c5fb659636e9887&query=`
let tend_url = "https://api.themoviedb.org/3/trending/movie/week?api_key=46064f37c58f004f8c5fb659636e9887";


async function getTrendingMovies() {
    container.innerHTML = "";
    blocks.innerHTML="";

    let res = await fetch(tend_url);
    let data = await res.json();

    let movies = data.results;

    showmovies(movies);
}

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    blocks.innerHTML="";

    if(movie.value)
    {
        container.innerHTML="";
        let res = await fetch(`${base_url_search}${movie.value}`);
        data = await res.json();
        console.log(data);
        movies = data.results;
        showmovies(movies);
    }

});


function showmovies(movies) {
    movies.forEach(m => {
            if(m.poster_path)
            {
                
                let card = document.createElement("div");
                card.classList.add("movie-card");

                let img = document.createElement("img");
                img.src = "https://image.tmdb.org/t/p/w300" + m.poster_path;

                let title = document.createElement("p");
                title.classList.add("title");
                title.innerText=m.title;

                card.appendChild(img);
                card.appendChild(title);

                card.addEventListener("click",()=>{
                    window.location.href = `movie.html?id=${m.id}`;
                });
                
                container.appendChild(card);
            }
            
        });
};

movie.addEventListener("input", async () => {
    let query = movie.value.trim();

    if(!query)
    {
        blocks.innerHTML="";
        return;
    }

    let res = await fetch(`${base_url_search}${query}`);
    let data = await res.json();

    let movies = data.results;

    blocks.innerHTML="";
    showtiles(movies.slice(0,8));
})

function showtiles(movies) {
    movies.forEach(m => {
        if(m.poster_path)
            {
                
                let card = document.createElement("div");
                card.classList.add("block-card");

                let img = document.createElement("img");
                img.src = "https://image.tmdb.org/t/p/w300" + m.poster_path;
                img.classList.add("block-img");

                let date = document.createElement("p");
                date.classList.add("date");
                date.innerText = m.release_date;

                let title = document.createElement("p");
                title.classList.add("block-title");
                title.innerText=m.title;

                card.appendChild(img);
                card.appendChild(title);
                title.appendChild(date);

                card.addEventListener("click",()=>{
                    window.location.href = `movie.html?id=${m.id}`;
                });
                
                blocks.appendChild(card);

            }
    })
}

getTrendingMovies();
let params = new URLSearchParams(window.location.search);

let id = params.get("id");

let title = document.querySelector("title");

let url = `https://api.themoviedb.org/3/movie/${id}?api_key=46064f37c58f004f8c5fb659636e9887`;

let mTitle = document.querySelector("#mDetails h2");

let description = document.querySelector("#mDetails p");

let movieImg = document.querySelector(".movieImg img");

let watchbtn = document.querySelector("#WatchBtn");

fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        title.innerText = data.title;
        mTitle.innerText = data.title;
        description.innerText = data.overview;
        movieImg.src = "https://image.tmdb.org/t/p/w300" + data.poster_path;
    });

async function getTrailer(id) {
     let res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=46064f37c58f004f8c5fb659636e9887`);

     let data = await res.json();
     //console.log(data);

     const trailer = data.results.find( (video) =>
        video.type==="Trailer" && video.site==="YouTube"
    );

    if(trailer)
    {
        document.querySelector("#trailer").src=
            `https://www.youtube.com/embed/${trailer.key}?autoplay=1&controls=0&cc_load_policy=0&rel=0&modestbranding=1&playlist=${trailer.key}`;

            watchbtn.addEventListener("click", () =>{
                window.open(
                    `https://www.youtube.com/watch?v=${trailer.key}`,
                    "_blank"
                );

            });
    }
}





getTrailer(id);
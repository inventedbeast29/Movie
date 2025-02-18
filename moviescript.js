const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
// Base URL for images (poster images)
const IMGPATH = "https://image.tmdb.org/t/p/w500/";
// Search API (for searched movies)
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

// Select the container to display movie posters
const poster = document.querySelector(".container-fluid .row");

// Function to fetch and display movies
const getMovies = async (api) => {
    const response = await fetch(api);
    const data = await response.json();
    console.log(data); // Inspect the response
    showPoster(data.results); // Pass the results array to showPoster function
};

// Function to display movie posters
const showPoster = (data) => {
    // Clear existing content before adding new data
    poster.innerHTML = '';

    const container = document.createElement("div");
        container.classList.add("r2");

    data.forEach((item) => {  
        const box=document.createElement("div");
        box.classList.add("box")
        box.innerHTML = `
            <div class="box">
                <img src="${IMGPATH + item.poster_path}" alt="${item.title}">
                <div class="overlay">
                    <h2 id="title">${item.title}</h2>
                    <h3 id="Overview">${item.overview ? item.overview : 'No Overview'}</h3>
                    <p id="para">${item.overview || "No description available"}</p>
                    <span id="rating">${item.vote_average || "No rating available"}</span>
                </div>
            </div>
        `;
        poster.appendChild(box); // Append the movie box to the poster container
    });
};

document.querySelector("#search").addEventListener("input",
    function (event){
        if(event.target.value!=0){
            getMovies(SEARCHAPI+event.target.value)
        }
    }
)


// Fetch movies from the API
getMovies(APIURL);

const searchInput = document.getElementById("search-sec");
const movieCont = document.getElementById("movie-container");
const apiKey = "ccffd46e1cmsh08bed086b4dbc1bp18c5dcjsn5d7585849eb2";

const fetchMovie = async (query) => {
    const apiUrl = `https://imdb-top-100-movies.p.rapidapi.com/?search=${encodeURIComponent(query)}`;
    try {
        if (!query.trim()) {
            return;
        }

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        if (data && Array.isArray(data)) {
            let moviesHtml = '';

            data.forEach(movie => {
                moviesHtml += `
                <div class="movie-item">
                    <h2>${movie.title}</h2>
                    <img src="${movie.image}" alt="${movie.title}" />
                    <p><strong>Rank:</strong> ${movie.rank}</p>
                    <p><strong>Rating:</strong> ${movie.rating}</p>
                    <a href="${movie.imdb_link}" target="_blank">View on IMDb</a>
                </div>
                `;
            });
            movieCont.innerHTML = moviesHtml;
        } else {
            movieCont.innerHTML = "<p>No movies were found</p>";
        }

        searchInput.value = '';

    } catch (error) {
        console.error(error);
    }
}

searchInput.addEventListener("keypress", (event) => {
    if (event.key === 'Enter') {
        fetchMovie(searchInput.value);
    }
});

window.addEventListener("DOMContentLoaded", () => fetchMovie());
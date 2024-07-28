document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
    document.querySelector('header').classList.toggle('light-mode');
    document.querySelectorAll('nav ul li a').forEach(function(link) {
        link.classList.toggle('light-mode');
    });
    document.querySelector('footer').classList.toggle('light-mode');
});

document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-bar').value;
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=c379d57bc3ba58db1e78791f477ae699&query=${query}`)
        .then(response => response.json())
        .then(data => {
            const movieGrid = document.getElementById('movie-grid');
            movieGrid.innerHTML = '';
            data.results.forEach(movie => {
                const movieElement = document.createElement('div');
                movieElement.classList.add('movie');
                movieElement.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    <p>${movie.title}</p>
                    <a href="https://www.youtube.com/results?search_query=${movie.title} trailer" target="_blank" class="download-btn">Watch Trailer</a>
                    <a href="https://www.youtube.com/results?search_query=${movie.title} full movie" target="_blank" class="download-btn">Watch Full Movie</a>
                `;
                movieGrid.appendChild(movieElement);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

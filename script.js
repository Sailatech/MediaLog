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

function fetchFeaturedMovie() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=c379d57bc3ba58db1e78791f477ae699`)
        .then(response => response.json())
        .then(data => {
            const featuredMovie = data.results[0]; // Get the first movie from the popular movies list
            document.getElementById('featured-title').textContent = featuredMovie.title;
            document.getElementById('featured-description').textContent = featuredMovie.overview;
            document.getElementById('featured-thumbnail').src = `https://image.tmdb.org/t/p/w500${featuredMovie.poster_path}`;
            document.getElementById('play-button').addEventListener('click', function() {
                window.open(`https://www.youtube.com/results?search_query=${featuredMovie.title} trailer`, '_blank');
            });
            document.getElementById('more-info-button').addEventListener('click', function() {
                window.open(`https://www.themoviedb.org/movie/${featuredMovie.id}`, '_blank');
            });
        })
        .catch(error => console.error('Error fetching featured movie:', error));
}

function fetchPopularMovies() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=c379d57bc3ba58db1e78791f477ae699`)
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
        .catch(error => console.error('Error fetching popular movies:', error));
}

function fetchPopularTVShows() {
    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=c379d57bc3ba58db1e78791f477ae699`)
        .then(response => response.json())
        .then(data => {
            const tvShowGrid = document.getElementById('tv-show-grid');
            tvShowGrid.innerHTML = '';
            data.results.forEach(show => {
                const showElement = document.createElement('div');
                showElement.classList.add('movie');
                showElement.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500${show.poster_path}" alt="${show.name}">
                    <p>${show.name}</p>
                    <a href="https://www.youtube.com/results?search_query=${show.name} trailer" target="_blank" class="download-btn">Watch Trailer</a>
                    <a href="https://www.youtube.com/results?search_query=${show.name} full episode" target="_blank" class="download-btn">Watch Full Episode</a>
                `;
                tvShowGrid.appendChild(showElement);
            });
        })
        .catch(error => console.error('Error fetching popular TV shows:', error));
}

function fetchNewPopular() {
    fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=c379d57bc3ba58db1e78791f477ae699`)
        .then(response => response.json())
        .then(data => {
            const newPopularGrid = document.getElementById('new-popular-grid');
            newPopularGrid.innerHTML = '';
            data.results.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('movie');
                itemElement.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${item.title || item.name}">
                    <p>${item.title || item.name}</p>
                    <a href="https://www.youtube.com/results?search_query=${item.title || item.name} trailer" target="_blank" class="download-btn">Watch Trailer</a>
                    <a href="https://www.youtube.com/results?search_query=${item.title || item.name} full movie" target="_blank" class="download-btn">Watch Full Movie</a>
                `;
                newPopularGrid.appendChild(itemElement);
            });
        })
        .catch(error => console.error('Error fetching new & popular content:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    fetchFeaturedMovie();
    fetchPopularMovies();
    fetchPopularTVShows();
    fetchNewPopular();
});

function toggleMenu() {
    var navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('nav-open');
}

document.getElementById('webview').addEventListener('load', function() {
    var iframe = document.getElementById('webview').contentWindow.document;
    // Example selectors to remove ad elements
    var adSelectors = [
        'iframe[src*="ads"]',
        'iframe[src*="doubleclick.net"]',
        'iframe[src*="googlesyndication.com"]',
        'div[class*="ad"]',
        'div[id*="ad"]',
        'div[data-ad]',
        'a[href*="ads"]'
    ];
   
    adSelectors.forEach(function(selector) {
        var ads = iframe.querySelectorAll(selector);
        ads.forEach(function(ad) {
            ad.parentNode.removeChild(ad);
        });
    });
});
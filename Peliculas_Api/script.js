// Obtiene referencias a los elementos HTML relevantes
const movieInput = document.getElementById('movie-input');
const searchButton = document.getElementById('search-btn');
const movieResults = document.getElementById('movie-results');

// Registra un evento de clic en el botón de búsqueda
searchButton.addEventListener('click', () => {
    const movieTitle = movieInput.value;
    if (movieTitle) {
        searchMovie(movieTitle);
    }
});

// Función para buscar una película por título
function searchMovie(title) {
    const apiKey = '407f3027'; // Tu clave de API de OMDb

    // Realiza una solicitud a la API de OMDb
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${title}`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                displayMovie(data);
            } else {
                movieResults.innerHTML = '<p>No se encontró ninguna película con ese título.</p>';
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });
}

// Función para mostrar los detalles de la película en la página
function displayMovie(movie) {
    const movieHTML = `
    <div class="movie-result">
    <div class="row">
        <div class="col-md-3">
        <img src="${movie.Poster}" alt="Poster" class="movie-poster">
        </div>
        <div class="col-md-9">
        <h2>${movie.Title} (${movie.Year})</h2>
        <p><strong>Actores:</strong> ${movie.Actors}</p>
        <p><strong>Género:</strong> ${movie.Genre}</p>
        <p><strong>Duración:</strong> ${movie.Runtime}</p>
        <p><strong>Calificación:</strong> ${movie.imdbRating}/10</p>
        <p><strong>Descripción:</strong> ${movie.Plot}</p>
        
        </div>
    </div>
    </div>
    `;

    movieResults.innerHTML = movieHTML;
}
import { fetchMovieDetails, fetchTrendingMovies, genresName , fetchSearchMovies } from './api';
import renderGallery from './gallery';
          // Dodanie przycisku "Watched" i "Add to watched"
          // pożniej można to ewentualnie zastąpić jak powstana przyciski
const watchedButton = document.createElement('button');
        watchedButton.innerText = 'Watched';
        watchedButton.addEventListener('click', () => addToWatchedMovies(movieDetails));
        card.appendChild(watchedButton);

const addToWatchedMovies = movieDetails => {
     // Pobierz listę obejrzanych filmów z localStorage lub utwórz nową listę, jeśli nie istnieje
    const watchedMovies = JSON.parse(localStorage.getItem('watchedMowies')) || [];
    const existingMovie = watchedMovies.find(movie => movie.id === movieDetails.id);
    if (!existingMovie) {
        watchedMovies.push(movieDetails);
        localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
    }
};

const displayWatchedMovies = () => {
    // Pobierz listę obejrzanych filmów z localStorage
    const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];

    // Wyświetl listę obejrzanych filmów w dowolny sposób
    console.log('Watched Movies:', watchedMovies);
}

export { displayWatchedMovies };
displayWatchedMovies();

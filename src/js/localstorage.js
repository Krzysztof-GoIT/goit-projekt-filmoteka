import { fetchMovieDetails, fetchTrendingMovies, genresName , fetchSearchMovies } from './api';
import renderGallery from './gallery';

export const addToWatchedMovies = movieDetails => {
  // Pobierz listę obejrzanych filmów z localStorage lub utwórz nową listę, jeśli nie istnieje
  const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
  const isMovieAlreadyWatched = watchedMovies.find(movie => movie.id === movieDetails.id);
  // Jeśli film jeszcze nie został obejrzany, dodaj go do listy
  if (!isMovieAlreadyWatched) {
    watchedMovies.push(movieDetails);
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
    return(`Added "${movieDetails.title}" to Watched Movies`);
  } else {
    return (`"${movieDetails.title}" is already in Watched Movies`);
  }
};

export const addToQueue = movieDetails => {
    const queuedMovies = JSON.parse(localStorage.getItem('queuedMovies')) || [];
    const isMovieInQueue = queuedMovies.find(movie => movie.id === movieDetails.id);
    if (!isMovieInQueue) {
        queuedMovies.push(movieDetails);
        localStorage.setItem('queuedMovies', JSON.stringify(watchedMovies));
        return (`Added "${movieDetails.title}" to Queue `);
    } else {
        return (`"${movieDetails.title}" is already in Queue`);
    }
}
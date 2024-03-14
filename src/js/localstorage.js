export const addToWatchedMovies = movieDetails => {
  // Pobierz listę obejrzanych filmów z localStorage lub utwórz nową listę, jeśli nie istnieje
  let watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];

  if (!Array.isArray(watchedMovies)) {
    watchedMovies = [];
  }

  let isMovieAlreadyWatched = watchedMovies.find(movie => movie.id === movieDetails.id);

  //pobierz liste filmów z kolejki z local storage zeby ussunąć w razie wuz
  let queuedMovies = JSON.parse(localStorage.getItem('queuedMovies')) || [];
  // Jeśli film jeszcze nie został obejrzany, dodaj go do listy
  if (!isMovieAlreadyWatched) {
    watchedMovies.push(movieDetails);
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
    console.log(`Added "${movieDetails.title}" to Watched Movies`);

    //usuwa filmy jeśli znadjują sie w kolejce

    queuedMovies = queuedMovies.filter(movie => movie.id !== movieDetails.id);
    localStorage.setItem('queuedMovies', JSON.stringify(queuedMovies));
    refreshView();
  } else {
    console.log(`"${movieDetails.title}" is already in Watched Movies`);
  }
};

export const addToQueue = movieDetails => {
  let queuedMovies = JSON.parse(localStorage.getItem('queuedMovies')) || [];
  let isMovieInQueue = queuedMovies.find(movie => movie.id === movieDetails.id);

  //pobierz liste filmów z obejrzanych z local storage zeby ussunąć w razie wu
  let watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
  if (!isMovieInQueue) {
    queuedMovies.push(movieDetails);
    localStorage.setItem('queuedMovies', JSON.stringify(queuedMovies));
    console.log(`Added "${movieDetails.title}" to Queue `);

    //usuwa filmy dodane do obejrzanych
    watchedMovies = watchedMovies.filter(movie => movie.id !== movieDetails.id);
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
    refreshView();
  } else {
    console.log(`"${movieDetails.title}" is already in Queue`);
  }
};
const refreshView = () => {
  //Tutaj wstawię później funkcje która będzie odświerzać widok po zmianie
  //Z queue do watched
};

export const addToWatchedMovies = movieDetails => {
  // Pobierz listę obejrzanych filmów z localStorage lub utwórz nową listę, jeśli nie istnieje
  const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
  const isMovieAlreadyWatched = watchedMovies.find(movie => movie.id === movieDetails.id);

  //pobierz liste filmów z kolejki z local storage zeby ussunąć w razie wuz
  const queuedMovies = JSON.parse(localStorage.getItem('queuedMovies')) || [];
  // Jeśli film jeszcze nie został obejrzany, dodaj go do listy
  if (!isMovieAlreadyWatched) {
    watchedMovies.push(movieDetails);
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
    console.log(`Added "${movieDetails.title}" to Watched Movies`);

    //usuwa filmy jeśli znadjują sie w kolejce
    queuedMovies = queuedMovies.filter(movie => movie.id !== movieDetails.id);
    localStorage.setItem('queuedMovies', JSON.stringify(queuedMovies));
  } else {
    console.log(`"${movieDetails.title}" is already in Watched Movies`);
  }
};

export const addToQueue = movieDetails => {
  const queuedMovies = JSON.parse(localStorage.getItem('queuedMovies')) || [];
  const isMovieInQueue = queuedMovies.find(movie => movie.id === movieDetails.id);

  //pobierz liste filmów z obejrzanych z local storage zeby ussunąć w razie wu
  const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
  if (!isMovieInQueue) {
    queuedMovies.push(movieDetails);
    localStorage.setItem('queuedMovies', JSON.stringify(queuedMovies));
    console.log(`Added "${movieDetails.title}" to Queue `);

    //usuwa filmy dodane do obejrzanych
    watchedMovies = watchedMovies.filter(movie => movie.id !== movieDetails.id);
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
  } else {
    console.log(`"${movieDetails.title}" is already in Queue`);
  }
};

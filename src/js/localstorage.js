// dodanie podanego filmu do listy obejrzanych filmów
export const addToWatchedMovies = movieDetails => {
  // pobiera listę obejrzanych filmów z localStorage lub tworzy nową, jeśli nie istnieje
  let watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];

  // prawdopodobnie niepotrzebny fragment kodu ============== do usunięcia
  // if (!Array.isArray(watchedMovies)) {
  //   watchedMovies = [];
  // }

  // sprawdza, czy film jest już na liście obejrzanych
  let isMovieAlreadyWatched = watchedMovies.find(movie => movie.id === movieDetails.id);
  //  pobiera listę filmów do oglądnięcia z localStorage lub tworzy nową, jeśli nie istnieje
  let queuedMovies = JSON.parse(localStorage.getItem('queuedMovies')) || [];
  // jeśli filmu nie ma na liście obejrzanych
  if (!isMovieAlreadyWatched) {
    // dodaje film do listy obejrzanych i przesyła zaktualizowaną listę do localStorage
    watchedMovies.push(movieDetails);
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
    // usuwa film z listy filmów do obejrzenia, jeśli na niej jest i przesyła zaktualizowaną listę do localStorage
    queuedMovies = queuedMovies.filter(movie => movie.id !== movieDetails.id);
    localStorage.setItem('queuedMovies', JSON.stringify(queuedMovies));
    // refreshView(); 
  } else {
    //console.log(`"${movieDetails.title}" is already in Watched Movies`);
  }
};

// dodanie podanego filmu do listy filmów do oglądnięcia
export const addToQueue = movieDetails => {
  //  pobiera listę filmów do oglądnięcia z localStorage lub tworzy nową, jeśli nie istnieje
  let queuedMovies = JSON.parse(localStorage.getItem('queuedMovies')) || [];
  // sprawdza, czy film jest już na liście filmó do obejrzenia
  let isMovieInQueue = queuedMovies.find(movie => movie.id === movieDetails.id);

  // pobiera listę obejrzanych filmów z localStorage lub tworzy nową, jeśli nie istnieje
  let watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
  // jeśli filmu nie ma na liście filmów do obejrzenia
  if (!isMovieInQueue) {
    // dodaje film do listy obejrzanych i przesyła zaktualizowaną listę do localStorage
    queuedMovies.push(movieDetails);
    localStorage.setItem('queuedMovies', JSON.stringify(queuedMovies));
    // usuwa film z listy filmów do obejrzenia, jeśli na niej jest i przesyła zaktualizowaną listę do localStorage
    watchedMovies = watchedMovies.filter(movie => movie.id !== movieDetails.id);
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
    // refreshView();
  } else {
    //console.log(`"${movieDetails.title}" is already in Queue`);
  }
};

// const refreshView = () => {
  //Tutaj wstawię później funkcje która będzie odświerzać widok po zmianie
  //Z queue do watched
// };

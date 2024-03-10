import { fetchMovieDetails, fetchSearchMovies, fetchTrendingMovies, genresName } from './api';
import { addToQueue, addToWatchedMovies } from './localstorage';

// Funkcja renderująca galerię filmów
const renderGallery = async (searchQuery = '', pageNo = 1) => {
  try {
    let response;
    if (searchQuery === '') {
      response = await fetchTrendingMovies(pageNo);
    } else {
      response = await fetchSearchMovies(searchQuery, pageNo);
    }

    const movies = response.results;

    const galleryContainer = document.getElementById('gallery-container');

    if (movies.length > 0) {
      galleryContainer.innerHTML = movies
        .map(movie => {
          let posterPath;
          if (movie.poster_path) {
            posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
          } else {
            posterPath =
              'https://github.com/Krzysztof-GoIT/goit-projekt-filmoteka/blob/main/src/img/kolaz-w-tle-filmu.png?raw=true';
          }

          const movieCard = `
            <div class="movie-card" data-movie-id="${movie.id}">
              <img src="${posterPath}" alt="${movie.title}" class="movie-poster">
              <div class="movie-details">
                <p class="movie-title">${movie.title}</p>
                <p class="movie-info">${getGenres(movie.genre_ids)} | ${movie.release_date.slice(
            0,
            4,
          )}</p>
              </div>
            </div>
          `;
          return movieCard;
        })
        .join('');

      const notResult = document.getElementById('not-result');
      notResult.style.display = 'none';
    } else {
      galleryContainer.innerHTML = '';
      const notResult = document.getElementById('not-result');
      notResult.style.display = 'block';
    }

    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(card => {
      card.addEventListener('click', async () => {
        const movieId = card.dataset.movieId;
        const movieDetails = await fetchMovieDetails(movieId);
        displayMovieDetails(movieDetails);

        const watchedButton = document.createElement('button');
        watchedButton.innerText = 'Add to Watched';
        watchedButton.addEventListener('click', () => addToWatchedMovies(movieDetails));
        card.appendChild(watchedButton);

        const queuedButton = document.createElement('button');
        queuedButton.innerHTML = 'Add to Queue';
        queuedButton.addEventListener('click', () => addToQueue(movieDetails));
        card.appendChild(queuedButton);
      });
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};

// Funkcja pomocnicza do pobrania nazw gatunków na podstawie ich identyfikatorów
const getGenres = genreIds => {
  const genres = genreIds.map(genreId => {
    const foundGenre = genresName.find(genre => genre.id === genreId);
    return foundGenre ? foundGenre.name : '';
  });
  return genres.join(', ');
};

// Funkcja do wyświetlania szczegółowych informacji o filmie w modalu
const displayMovieDetails = movieDetails => {
  console.log(movieDetails);
};

// Obsługa przycisku "Obejrzane"
const displayWatchedMovies = () => {
  // Implementacja funkcji wyświetlającej obejrzane filmy
  console.log('Displaying watched movies...');
};

// Obsługa przycisku "Kolejka"
const displayQueuedMovies = () => {
  // Implementacja funkcji wyświetlającej filmy w kolejce
  console.log('Displaying queued movies...');
};

// Obsługa przycisków "Obejrzane" i "Kolejka"
window.addEventListener('DOMContentLoaded', () => {
  renderGallery(); // Wyświetlenie domyślnej galerii filmów
  displayWatchedMovies(); // Wyświetlenie obejrzanych filmów
  displayQueuedMovies(); // Wyświetlenie filmów w kolejce

  const libraryWatchedButton = document.getElementById('library-watched');
  libraryWatchedButton.addEventListener('click', () => {
    displayWatchedMovies(); // Wyświetlenie obejrzanych filmów po kliknięciu na przycisk "Obejrzane"
  });

  const libraryQueuedButton = document.getElementById('library-queue');
  libraryQueuedButton.addEventListener('click', () => {
    displayQueuedMovies(); // Wyświetlenie filmów w kolejce po kliknięciu na przycisk "Kolejka"
  });
});

// Obsługa wyszukiwania filmów
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  const searchInput = document.querySelector('.search-form input');
  const searchQuery = searchInput.value.trim();
  renderGallery(searchQuery); // Wyświetlenie wyników wyszukiwania
  searchInput.value = ''; // Wyczyszczenie pola wyszukiwania
});

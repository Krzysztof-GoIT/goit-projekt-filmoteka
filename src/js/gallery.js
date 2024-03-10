import { fetchMovieDetails, fetchSearchMovies, fetchTrendingMovies, genresName } from './api';
import { addToQueue, addToWatchedMovies } from './localstorage';

document.addEventListener('DOMContentLoaded', () => {
  renderGallery('', 1); // Wyświetlenie popularnych filmów na stronie przy starcie
});

const renderGallery = async (searchQuery, pageNo) => {
  try {
    let response;
    if (searchQuery === '') {
      // Pobranie danych o najbardziej popularnych filmach
      response = await fetchTrendingMovies(pageNo);
    } else {
      // Pobranie wyników wyszukiwania
      response = await fetchSearchMovies(searchQuery, pageNo);
    }

    const movies = response.results;

    // Znalezienie kontenera dla galerii filmów
    const galleryContainer = document.getElementById('gallery-container');

    // Sprawdzenie czy lista filmów nie jest pusta
    if (movies.length > 0) {
      // Wyświetlenie filmów
      galleryContainer.innerHTML = movies
        .map(movie => {
          // Sprawdź czy plakat istnieje
          let posterPath;
          if (movie.poster_path) {
            posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
          } else {
            posterPath =
              'https://github.com/Krzysztof-GoIT/goit-projekt-filmoteka/blob/main/src/img/kolaz-w-tle-filmu.png?raw=true';
          }

          // Utworzenie elementu karty filmu
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
      // Ukrycie komunikatu o braku wyników, jeśli lista filmów nie jest pusta
      const notResult = document.getElementById('not-result');
      notResult.style.display = 'none';
    } else {
      // Jeśli lista filmów jest pusta, wyświetl komunikat
      galleryContainer.innerHTML = '';
      const notResult = document.getElementById('not-result');
      notResult.style.display = 'block';
    }

    // Obsługa zdarzenia kliknięcia dla każdej karty filmu
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(card => {
      card.addEventListener('click', async () => {
        const movieId = card.dataset.movieId;
        const movieDetails = await fetchMovieDetails(movieId);
        displayMovieDetails(movieDetails);

        // Dodanie przycisku "Watched" i "Add to watched"
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
  // Pobranie nazw gatunków z listy genresName zdefiniowanej w api.js
  const genres = genreIds.map(genreId => {
    const foundGenre = genresName.find(genre => genre.id === genreId);
    return foundGenre ? foundGenre.name : '';
  });

  // Zwrócenie połączonej listy gatunków
  return genres.join(', ');
};

// Funkcja do wyświetlania szczegółowych informacji o filmie w modalu
const displayMovieDetails = movieDetails => {
  // Tutaj możemy zaimplementować logikę wyświetlania informacji o filmie w modalu
  console.log(movieDetails);
};

const clearGallery = () => {
  const galleryContainer = document.getElementById('gallery-container');
  galleryContainer.innerHTML = ''; // Wyczyszczenie zawartości galerii
};

// Obsługa wyszukiwania filmów
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  const searchInput = document.querySelector('.search-form input');
  const searchQuery = searchInput.value.trim();
  renderGallery(searchQuery, 1); // Wyświetlenie wyników wyszukiwania
  searchInput.value = ''; // Wyczyszczenie pola wyszukiwania
});

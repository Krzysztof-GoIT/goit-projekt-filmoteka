// gallery.js

import { fetchMovieDetails, fetchTrendingMovies, fetchSearchMovies, genresName } from './api';
import { addToQueue, addToWatchedMovies } from './localstorage';

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

const displayWatchedMovies = () => {
  // Pobierz listę obejrzanych filmów z localStorage
  const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
  renderGallery(watchedMovies);
};

const displayQueuedMovies = () => {
  // Pobierz listę dodanych do kolejki filmów z localStorage
  const queuedMovies = JSON.parse(localStorage.getItem('queuedMovies')) || [];
  renderGallery(queuedMovies);
};

const displayMovieDetails = movieDetails => {
  // Tutaj możemy zaimplementować logikę wyświetlania informacji o filmie w modalu
  console.log(movieDetails);
};

////Obsługa HomePage i Buttonów
window.addEventListener('DOMContentLoaded', () => {
  getHomepage(1); // Wywołujemy funkcję wyświetlającą HomePage

  const libraryWatched = document.getElementById('watchedHeader');
  libraryWatched.addEventListener('click', () => {
    displayWatchedMovies();
  });

  const libraryQueued = document.getElementById('queueHeader');
  libraryQueued.addEventListener('click', () => {
    displayQueuedMovies();
  });

  const libraryWatchedButton = document.getElementById('watchedModal');
  libraryWatchedButton.addEventListener('click', () => {
    displayWatchedMovies();
  });

  const libraryQueuedButton = document.getElementById('queueModal');
  libraryQueuedButton.addEventListener('click', () => {
    displayQueuedMovies();
  });
});

//Generujemy trendings movie
const getHomepage = async pageNo => {
  try {
    const response = await fetchTrendingMovies(pageNo);
    renderGallery(response.results);
  } catch (error) {
    console.error('Error fetching trending movies:', error);
  }
};

//Obsługa szukajki
document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  const searchInput = document.querySelector('.search-form input');
  const notResult = document.getElementById('not-result');

  searchForm.addEventListener('submit', async event => {
    event.preventDefault();
    const searchQuery = searchInput.value.trim().toLowerCase().split(' ').join('+');
    if (searchQuery) {
      try {
        const response = await fetchSearchMovies(searchQuery, 1);
        renderGallery(response.results);
        searchInput.value = ''; // Wyczyszczenie pola wyszukiwania
        if (response.results.length > 0) {
          notResult.style.display = 'none'; // Ukrycie komunikatu o braku wyników
        } else {
          notResult.style.display = 'block'; // Wyświetlenie komunikatu o braku wyników
          clearGallery(); // Wyczyszczenie galerii
        }
      } catch (error) {
        console.error('Error fetching search movies:', error);
      }
    }
  });
});

// Renderowanie Galerii
const renderGallery = dataGallery => {
  try {
    // Pobranie danych o najbardziej popularnych filmach
    const movies = dataGallery;

    // Znalezienie kontenera dla galerii filmów
    const galleryContainer = document.getElementById('gallery-container');

    // Sprawdzenie czy lista filmów nie jest pusta
    if (movies.length > 0) {
      // Wyświetlenie filmów
      galleryContainer.innerHTML = movies
        .map(movie => {
          let posterPath;
          if (movie.poster_path) {
            posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
          } else {
            posterPath =
              'https://github.com/Krzysztof-GoIT/goit-projekt-filmoteka/blob/main/src/img/kolaz-w-tle-filmu.png?raw=true';
          }
          let categories = 'Witch out category';
          if (movie.genre_ids) {
            getGenres(movie.genre_ids);
          } else {
            categories = movie.genres[0].name;
          }
          const movieCard = `
            <div class="movie-card" data-movie-id="${movie.id}">
            <img class="movie-poster" src="${posterPath}" alt="${movie.title}">
            <div class="movie-details">
            <p class="movie-title">${movie.title}</p>
            <p class="movie-info">${categories} | ${movie.release_date.slice(0, 4)}</p>
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
    console.error('Error fetching trending movies:', error);
  }
};

// Czyszczenie galerii
const clearGallery = () => {
  const galleryContainer = document.getElementById('gallery-container');
  galleryContainer.innerHTML = ''; // Wyczyszczenie zawartości galerii
};

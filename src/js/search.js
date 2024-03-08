import { fetchSearchMovies, fetchMovieDetails, genresName } from './api';

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  const searchInput = document.querySelector('.search-form input');
  const notResult = document.getElementById('not-result');

  searchForm.addEventListener('submit', async event => {
    event.preventDefault();
    const searchQuery = searchInput.value.trim();
    if (searchQuery) {
      try {
        // Pobranie wyników wyszukiwania
        const response = await fetchSearchMovies(searchQuery, 1);
        const searchResults = response.results;

        // Sprawdzenie czy są wyniki wyszukiwania
        if (searchResults.length > 0) {
          notResult.style.display = 'none'; // Ukrycie komunikatu o braku wyników

          // Znalezienie kontenera dla galerii filmów
          const galleryContainer = document.getElementById('gallery-container');

          // Wyświetlenie filmów
          galleryContainer.innerHTML = searchResults
            .map(movie => {
              // Utworzenie elementu karty filmu
              const movieCard = `
          <div class="movie-card" data-movie-id="${movie.id}">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
                movie.title
              }" class="movie-poster">
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

          // Dodanie obsługi zdarzenia kliknięcia dla każdej karty filmu
          const movieCards = document.querySelectorAll('.movie-card');
          movieCards.forEach(card => {
            card.addEventListener('click', async () => {
              const movieId = card.dataset.movieId;
              const movieDetails = await fetchMovieDetails(movieId);
              displayMovieDetails(movieDetails);
            });
          });
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

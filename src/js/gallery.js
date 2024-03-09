// gallery.js

import { fetchMovieDetails, fetchTrendingMovies, genresName } from './api';

const renderGallery = async () => {
  try {
    // Pobranie danych o najbardziej popularnych filmach
    const response = await fetchTrendingMovies(1);
    const movies = response.results;

    // Znalezienie kontenera dla galerii filmów
    const galleryContainer = document.getElementById('gallery-container');

    // Sprawdzenie czy lista filmów nie jest pusta
    if (movies.length > 0) {
      // Wyświetlenie filmów
      galleryContainer.innerHTML = movies
        .map(movie => {
          // Sprawdź czy plakat istnieje
          const posterPath = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'plakat_zastepczy.jpg';

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

    // // Wyświetlenie filmów
    // galleryContainer.innerHTML = movies
    //   .map(movie => {
    //     // Sprawdź czy plakat istnieje
    //     const posterPath = movie.poster_path
    //       ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    //       : 'plakat_zastepczy.jpg';

    //     // Utworzenie elementu karty filmu
    //     const movieCard = `
    //       <div class="movie-card" data-movie-id="${movie.id}">
    //         <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
    //       movie.title
    //     }" class="movie-poster">
    //         <div class="movie-details">
    //           <p class="movie-title">${movie.title}</p>
    //           <p class="movie-info">${getGenres(movie.genre_ids)} | ${movie.release_date.slice(
    //       0,
    //       4,
    //     )}</p>
    //         </div>
    //       </div>
    //     `;
    //     return movieCard;
    //   })
    //   .join('');

    // Obsługa zdarzenia kliknięcia dla każdej karty filmu
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(card => {
      card.addEventListener('click', async () => {
        const movieId = card.dataset.movieId;
        const movieDetails = await fetchMovieDetails(movieId);
        displayMovieDetails(movieDetails);
      });
    });
  } catch (error) {
    console.error('Error fetching trending movies:', error);
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

// Eksportujemy funkcję renderGallery jako domyślną
export default renderGallery;

// Wywołujemy funkcję renderGallery po załadowaniu strony
window.addEventListener('DOMContentLoaded', renderGallery);

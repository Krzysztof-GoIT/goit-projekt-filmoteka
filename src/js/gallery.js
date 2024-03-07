import { fetchTrendingMovies } from './api'; // Poprawienie nazwy importu z api.js

const renderGallery = async () => {
  try {
    // Pobranie danych o najbardziej popularnych filmach
    const response = await fetchTrendingMovies(1);
    const movies = response.results;

    // Znalezienie kontenera dla galerii filmów
    const galleryContainer = document.getElementById('gallery-container');

    // Wyświetlenie filmów
    galleryContainer.innerHTML = movies
      .map(movie => {
        // Utworzenie elementu karty filmu
        const movieCard = `
          <div class="movie-card">
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
  } catch (error) {
    console.error('Error fetching trending movies:', error);
  }
};

// Funkcja pomocnicza do pobrania nazw gatunków na podstawie ich identyfikatorów
const getGenres = genreIds => {
  // Dane o gatunkach filmowych - możesz przenieść do oddzielnego pliku lub wywołać z funkcji fetchGenres z api.js
  const genresData = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    // i tak dalej...
  };

  // Pobranie nazw gatunków dla każdego identyfikatora gatunku
  const genres = genreIds.map(genreId => genresData[genreId]);

  // Zwrócenie połączonej listy gatunków
  return genres.join(', ');
};

// Eksportujemy funkcję renderGallery jako domyślną
export default renderGallery;

// Wywołujemy funkcję renderGallery po załadowaniu strony
window.addEventListener('DOMContentLoaded', renderGallery);

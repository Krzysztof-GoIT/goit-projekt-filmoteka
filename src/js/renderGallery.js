// renderGallery.js
import { fetchMovieDetails } from './api';
import { getGenres } from './gallery';
import { openModal } from './openModal';

export const renderGallery = (dataGallery, rating) => {
  try {
    // Pobranie danych o filmach z galerii
    const movies = dataGallery;
    // Znalezienie kontenera dla galerii filmów
    const galleryContainer = document.getElementById('gallery-container');
    // Ukrycie komunikatu o braku wyników na start
    const notResult = document.getElementById('not-result');
    notResult.style.display = 'none';

    // Sprawdzenie czy lista filmów nie jest pusta
    if (movies.length > 0) {
      // Pobranie danych o najbardziej popularnych filmach
      const newContent = movies
        .map(movie => {
          let posterPath;
          if (movie.poster_path) {
            posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
          } else {
            posterPath = '../img/kolaz-w-tle-filmu.png';
            //   'https://github.com/Krzysztof-GoIT/goit-projekt-filmoteka/blob/main/src/img/kolaz-w-tle-filmu.png?raw=true';
          }

          // Inicjalizacja zmiennej przechowującej informacje o gatunkach filmu
          let categories = 'Without category';
          // Ustalenie roku wydania filmu
          let releaseYear = movie.release_date ? movie.release_date.slice(0, 4) : 'Without date';

          // Sprawdzenie czy istnieje przynajmniej jeden gatunek filmu, jeśli tak, pobierz nazwy wszystkich gatunków
          if (movie.genres && movie.genres.length > 0) {
            categories = movie.genres.map(genre => genre.name).join(', ');
          } else if (movie.genre_ids && movie.genre_ids.length > 0) {
            categories = getGenres(movie.genre_ids);
            if (!categories) {
              categories = 'Without category';
            }
          }
          console.log('rating: ', rating);
          let rate = rating
            ? ` <span class="movie-info-rating">${movie.vote_average.toFixed(1)}</span>`
            : ``;

          // Zbudowanie kodu HTML dla karty filmu
          const movieCard = `
          <div class="movie-card" data-movie-id="${movie.id}">
          <img class="movie-poster" src="${posterPath}" alt="${movie.title}">
          <div class="movie-details">
          <p class="movie-title">${movie.title}</p>
          <p class="movie-info">${categories} | ${releaseYear}${rate}</p>
          </div>
          </div>
        `;
          return movieCard;
        })
        .join('');
      //galleryContainer.innerHTML = newContent;
      galleryContainer.insertAdjacentHTML('beforeend', newContent);

      // Wstawienie wygenerowanego kodu HTML do kontenera galerii
      //galleryContainer.innerHTML = newContent;
      // Ukrycie komunikatu o braku wyników, jeśli lista filmów nie jest pusta
      notResult.style.display = 'none';
    } else {
      // Jeśli lista filmów jest pusta, wyświetl komunikat o braku wyników
      //galleryContainer.innerHTML = '';
      notResult.style.display = 'block';
      // Wyczyszczenie galerii
      clearGallery();
    }

    // Obsługa zdarzenia kliknięcia dla każdej karty filmu
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(card => {
      card.addEventListener('click', async () => {
        const movieId = card.dataset.movieId;
        // Pobranie szczegółowych informacji o wybranym filmie
        const movieDetails = await fetchMovieDetails(movieId);
        // Otwarcie modalu z informacjami o filmie
        openModal(movieDetails);
        // Wyświetlenie dodatkowych informacji o filmie
        displayMovieDetails(movieDetails);
      });
    });
  } catch (error) {
    // Obsługa błędu w przypadku problemów z renderowaniem galerii
    console.error('Error rendering gallery:', error);
    // Wyświetlenie komunikatu o braku wyników w przypadku błędu
    const notResult = document.getElementById('not-result');
    notResult.style.display = 'block';
  }
};

export const clearGallery = () => {
  const galleryContainer = document.getElementById('gallery-container');
  galleryContainer.innerHTML = '';
};

export const displayMovieDetails = movieDetails => {
  // Tutaj możemy zaimplementować logikę wyświetlania informacji o filmie w modalu
  console.log(movieDetails);
};

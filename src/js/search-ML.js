// search.js

import { fetchMovieDetails, fetchSearchMovies, genresName } from './api';
// import kolazTleFilmu from './kolaz-w-tle-filmu.png';

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  const searchInput = document.querySelector('.search-form input');
  const notResult = document.getElementById('not-result');
  const searchQuery = searchInput.value.trim().toLowerCase().split(' ').join('+');

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

          // W pliku search.js
          galleryContainer.innerHTML = searchResults
            .map(movie => {
              // Sprawdzamy, czy istnieje plakat dla danego filmu

              // const posterPath = movie.poster_path
              //   ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              //   : kolazTleFilmu;

              let posterPath;
              if (movie.poster_path) {
                posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
              } else {
                posterPath =
                  'https://github.com/Krzysztof-GoIT/goit-projekt-filmoteka/blob/main/src/img/kolaz-w-tle-filmu.png?raw=true';
              }

              // const posterPath = movie.poster_path
              //   ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              //   : './img/kolaz-w-tle-filmu.png';

              // Utworzenie elementu karty filmu
              const movieCard = `
                <div class="movie-card" data-movie-id="${movie.id}">
                  <img class="movie-poster" src="${posterPath}" alt="${movie.title}">
                  <div class="movie-details">
                    <p class="movie-title">${movie.title}</p>
                    <p class="movie-info">${getGenres(
                      movie.genre_ids,
                    )} | ${movie.release_date.slice(0, 4)}</p>
                  </div>
                </div>
              `;
              return movieCard;
            })
            .join('');

          //   // Wyświetlenie filmów
          //   galleryContainer.innerHTML = searchResults
          //     .map(movie => {
          //       // Sprawdź czy plakat istnieje
          //       const posterPath = movie.poster_path
          //         ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          //         : 'plakat_zastepczy.jpg';

          //       // Utworzenie elementu karty filmu
          //       const movieCard = `
          //   <div class="movie-card" data-movie-id="${movie.id}">
          //     <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
          //         movie.title
          //       }" class="movie-poster">
          //     <div class="movie-details">
          //       <p class="movie-title">${movie.title}</p>
          //       <p class="movie-info">${getGenres(movie.genre_ids)} | ${movie.release_date.slice(
          //         0,
          //         4,
          //       )}</p>
          //     </div>
          //   </div>
          // `;
          //       return movieCard;
          //     })
          //     .join('');

          // Obsługa zdarzenia kliknięcia dla każdej karty filmu
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

// // W pliku search.js
// galleryContainer.innerHTML = searchResults
//   .map(movie => {
//     // Sprawdzenie czy plakat istnieje
//     const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : './img/kolaz-w-tle-filmu.png';

//     // Utworzenie elementu karty filmu
//     const movieCard = `
//       <div class="movie-card" data-movie-id="${movie.id}">
//         <div class="movie-poster" style="background-image: url('${posterPath}');"></div>
//         <div class="movie-details">
//           <p class="movie-title">${movie.title}</p>
//           <p class="movie-info">${getGenres(movie.genre_ids)} | ${movie.release_date.slice(0, 4)}</p>
//         </div>
//       </div>
//     `;
//     return movieCard;
//   })
//   .join('');

// // W pliku gallery.js
// galleryContainer.innerHTML = movies
//   .map(movie => {
//     // Sprawdzenie czy plakat istnieje
//     const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : './img/kolaz-w-tle-filmu.png';

//     // Utworzenie elementu karty filmu
//     const movieCard = `
//       <div class="movie-card" data-movie-id="${movie.id}">
//         <div class="movie-poster" style="background-image: url('${posterPath}');"></div>
//         <div class="movie-details">
//           <p class="movie-title">${movie.title}</p>
//           <p class="movie-info">${getGenres(movie.genre_ids)} | ${movie.release_date.slice(0, 4)}</p>
//         </div>
//       </div>
//     `;
//     return movieCard;
//   })
//   .join('');

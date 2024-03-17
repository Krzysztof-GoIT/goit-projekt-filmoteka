// gallery.js

import { fetchSearchMovies, fetchTrendingMovies, genresName } from './api';
// import { createPagination, setCurrentPage } from './pagination';
// import { createPagination, currentPage, setCurrentPage } from './pagination';
import { createPagination, setCurrentPage } from './pagination';
import { clearGallery, renderGallery } from './renderGallery'; // Dodano import funkcji związanych z galerią

export let homePageNo = 0;
let totalPages;

// Funkcja pomocnicza do pobrania nazw gatunków na podstawie ich identyfikatorów
export const getGenres = genreIds => {
  // Pobranie nazw gatunków z listy genresName zdefiniowanej w api.js
  const genres = genreIds.map(genreId => {
    const foundGenre = genresName.find(genre => genre.id === genreId);
    return foundGenre ? foundGenre.name : '';
  });
  // Zwrócenie połączonej listy gatunków
  return genres.join(', ');
};

const displayWatchedMovies = () => {
  try {
    const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
    const moviesWithGenres = watchedMovies.map(movie => {
      let categories = 'Without category';
      if (movie.genres && movie.genres.length > 0) {
        categories = movie.genres.map(genres => genres.name).join(', ');
      }
      return { ...movie, categories };
    });
    homePageNo = 0;
    clearGallery();
    renderGallery(moviesWithGenres, 1);
  } catch (error) {
    console.error('Error displaying watched movies:', error);
  }
};

const displayQueuedMovies = () => {
  try {
    const queuedMovies = JSON.parse(localStorage.getItem('queuedMovies')) || [];
    const moviesWithGenres = queuedMovies.map(movie => {
      let categories = 'Without category';
      if (movie.genres && movie.genres.length > 0) {
        categories = movie.genres.map(genres => genres.name).join(', ');
      }
      return { ...movie, categories };
    });
    homePageNo = 0;
    clearGallery();
    renderGallery(moviesWithGenres, 1);
  } catch (error) {
    console.error('Error displaying queued movies:', error);
  }
};

//Obsługa HomePage i Buttonów
window.addEventListener('DOMContentLoaded', () => {
  getHomepage(1); // Wywołujemy funkcję wyświetlającą HomePage

  const libraryWatched = document.getElementById('watchedHeader');
  libraryWatched.addEventListener('click', displayWatchedMovies);

  const libraryQueued = document.getElementById('queueHeader');
  libraryQueued.addEventListener('click', displayQueuedMovies);

  // const libraryWatchedButton = document.getElementById('watchedModal');
  // libraryWatchedButton.addEventListener('click', displayWatchedMovies);

  // const libraryQueuedButton = document.getElementById('queueModal');
  // libraryQueuedButton.addEventListener('click', displayQueuedMovies);
});

//Generujemy trendings movie
export const getHomepage = async pageNo => {
  try {
    const response = await fetchTrendingMovies(pageNo);
    clearGallery();
    renderGallery(response.results, 0);
    homePageNo = pageNo;
    createPagination(response.total_pages);
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
    setCurrentPage(1);
    getSearchResult(event, 1);
  });
});

export const getSearchResult = async (event, pageNo) => {
  event.preventDefault();
  homePageNo = pageNo;
  const searchInput = document.querySelector('.search-form input');
  const notResult = document.getElementById('not-result');
  const searchQuery = searchInput.value.trim().toLowerCase().split(' ').join('+');
  if (searchQuery) {
    try {
      const response = await fetchSearchMovies(searchQuery, homePageNo);
      totalPages = response.total_pages;
      movies = response.results;
      createPagination(totalPages); //Wywołanie paginacji
      searchInput.value = ''; // Wyczyszczenie pola wyszukiwania
      if (response.results.length > 0) {
        notResult.style.display = 'none'; // Ukrycie komunikatu o braku wyników
        clearGallery();
        renderGallery(movies);
      } else {
        notResult.style.display = 'block'; // Wyświetlenie komunikatu o braku wyników
        clearGallery(); // Wyczyszczenie galerii
      }
    } catch (error) {
      console.error('Error fetching search movies:', error);
    }
  }
};

// Ukrycie komunikatu o braku wyników na start
document.addEventListener('DOMContentLoaded', () => {
  const notResult = document.getElementById('not-result');
  notResult.style.display = 'none';
});

// Czyszczenie galerii
export const clearGallery = () => {
  const galleryContainer = document.getElementById('gallery-container');
  galleryContainer.innerHTML = ''; // Wyczyszczenie zawartości galerii
};

// // Funkcja openModal
// export const openModal = movieData => {
//   const modal = document.getElementById('myModal');
//   modal.style.display = 'block';

//   const modalContent = document.getElementById('modalContent');
//   modalContent.innerHTML = `
//   <div class="modal-container">
//     <div class="movie-poster-modal">
//       <img class="movie-poster" src="https://image.tmdb.org/t/p/w500${
//         movieData.poster_path
//       }" alt="${movieData.title} Photo">
//     </div>
//     <div class="modal-movie-info">
//       <h2>${movieData.title}</h2>

//       <div class="info-item">
//         <div class="pernament-item">
//           <p>Vote / Votes </p>
//           <p>Popularity </p>
//           <p>Orginal Title </p>
//           <p>Genre </p>
//         </div>

//         <div class="variables-item">
//           <p><span class="average-vote">${movieData.vote_average.toFixed(
//             1,
//           )} </span>/ <span class="count-vote">${movieData.vote_count}</span></p>
//             <p>${movieData.popularity}</p>
//             <p>${movieData.original_title}</p>
//             <p>${movieData.genres.map(genre => genre.name).join(', ')}</p>
//         </div>
//       </div>
//       <div class="about-movie">
//         <p><span class="about-movie-details">About</span></br> ${movieData.overview}</p>
//       </div>

//       <div class="modal-buttons">
//         <button class="watchedButton">Add to Watched</button>
//         <button class="queuedButton">Add to Queue</button>
//         <button id="movieTrailerButton">Trailer</button>
//       </div>
//     </div>
//   </div>
//   `;

//   const watchedButton = document.getElementsByClassName('watchedButton')[0];
//   watchedButton.onclick = () => {
//     addToWatchedMovies(movieData);
//   };
//   const queuedButton = document.getElementsByClassName('queuedButton')[0];
//   queuedButton.onclick = () => {
//     addToQueue(movieData);
//   };

//   // Obsługa zdarzenia kliknięcia przycisku "Trailer"
//   const trailerButton = document.querySelector('#movieTrailerButton');
//   trailerButton.addEventListener('click', async () => {
//     try {
//       // Pobranie identyfikatora filmu
//       const movieId = movieData.id;
//       // Wysłanie żądania do API w celu pobrania zwiastunu filmu
//       const trailersResponse = await fetchMovieTrailers(movieId);
//       // Wyświetlenie danych zwiastunu w konsoli
//       console.log('Trailers:', trailersResponse);

//       // Sprawdzenie, czy istnieją zwiastuny
//       if (trailersResponse.results && trailersResponse.results.length > 0) {
//         // Iteracja przez zwiastuny i otwarcie ich w nowej karcie przeglądarki
//         trailersResponse.results.forEach(trailer => {
//           if (trailer.site === 'YouTube') {
//             window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
//           }
//         });
//       } else {
//         console.log('No trailers available');
//       }
//     } catch (error) {
//       console.error('Error fetching movie trailers:', error);
//     }
//   });

//   const closeButton = document.querySelector('.close');
//   closeButton.onclick = () => {
//     modal.style.display = 'none';
//   };

//   // Obsługa zdarzenia keydown
//   document.addEventListener('keydown', function (event) {
//     if (event.key === 'Escape') {
//       modal.style.display = 'none';
//     }
//   });

//   window.onclick = event => {
//     if (event.target == modal) {
//       modal.style.display = 'none';
//     }
//   };
// };

//scrollToTop by Marek
const scrollToTopButton = document.getElementById('scrollToTopButton');

// Pokaż przycisk, gdy użytkownik przewinie stronę w dół
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 100) {
    // Możesz dostosować wartość, aby przycisk pojawił się po przewinięciu o określoną liczbę pikseli
    scrollToTopButton.style.display = 'block';
  } else {
    scrollToTopButton.style.display = 'none';
  }
});

// Obsługa zdarzenia kliknięcia przycisku
scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // Działa w większości nowoczesnych przeglądarek, aby przewijać płynnie
  });
});

// Funkcja do sprawdzania, czy element jest blisko dolnej krawędzi okna przeglądarki
function isNearBottom(element, threshold) {
  const rect = element.getBoundingClientRect();
  return rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + threshold;
}

// Event scroll na oknie przeglądarki
const loadMoreContent = () => {
  // Element, który monitorujemy, np. kontener na treści
  const contentContainer = document.querySelector('.movie-card:last-child');
  // Threshold - odległość od dolnej krawędzi, przy której chcemy zacząć ładować więcej treści
  const threshold = 800; // w pikselach

  // Sprawdzamy, czy element jest blisko dolnej krawędzi okna przeglądarki
  if (isNearBottom(contentContainer, threshold)) {
    // Jeśli tak, ładujemy więcej treści
    if (homePageNo > 0) homePageNo++;
    getHomepage(homePageNo);
  }
};
const infinityScroll = document.getElementById('infinityScroll');

let isInfinityScrollActive = false;

// Obsługa zdarzenia kliknięcia przycisku
infinityScroll.addEventListener('click', () => {
  if (isInfinityScrollActive) {
    // Jeżeli infinity scroll jest aktywny, usuwamy nasłuchiwanie zdarzenia scroll
    window.removeEventListener('scroll', loadMoreContent);
  } else {
    // Jeżeli infinity scroll nie jest aktywny, dodajemy nasłuchiwanie zdarzenia scroll
    window.addEventListener('scroll', loadMoreContent);
  }
  // Zmiana stanu - włącz/wyłącz
  isInfinityScrollActive = !isInfinityScrollActive;

  // Początkowe ładowanie treści
  getHomepage(homePageNo);

  // Event scroll na oknie przeglądarki po kliknięciu przycisku
  window.addEventListener('scroll', loadMoreContent);

  // Usuń obsługę zdarzenia kliknięcia przycisku, aby nie powtarzać ładowania po kliknięciu
  infinityScroll.removeEventListener('click', loadMoreContent);
});

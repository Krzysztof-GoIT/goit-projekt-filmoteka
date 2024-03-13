// gallery.js

import { fetchMovieDetails, fetchSearchMovies, fetchTrendingMovies, genresName } from './api';
import { addToQueue, addToWatchedMovies } from './localstorage';
export let homePageNo = 0;

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
  try {
    // Pobierz listę obejrzanych filmów z localStorage
    const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
    const moviesWithGenres = watchedMovies.map(movie => {
      const categories =
        movie.categories !== 'Without category' ? movie.categories : getGenres(movie.genre_ids);
      return { ...movie, categories };
    });
    homePageNo = 0;
    clearGallery();
    renderGallery(moviesWithGenres);
  } catch (error) {
    console.error('Error displaying watched movies:', error);
  }
  // const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
  // renderGallery(watchedMovies);
};

const displayQueuedMovies = () => {
  try {
    // Pobierz listę dodanych do kolejki filmów z localStorage
    const queuedMovies = JSON.parse(localStorage.getItem('queuedMovies')) || [];
    const moviesWithGenres = queuedMovies.map(movie => {
      const categories =
        movie.categories !== 'Without category' ? movie.categories : getGenres(movie.genre_ids);
      return { ...movie, categories };
    });
    homePageNo = 0;
    clearGallery();
    renderGallery(moviesWithGenres);
  } catch (error) {
    console.error('Error displaying queued movies:', error);
  }
  // const queuedMovies = JSON.parse(localStorage.getItem('queuedMovies')) || [];
  // renderGallery(queuedMovies);
};

const displayMovieDetails = movieDetails => {
  // Tutaj możemy zaimplementować logikę wyświetlania informacji o filmie w modalu
  console.log(movieDetails);
};

//Obsługa HomePage i Buttonów
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
export const getHomepage = async pageNo => {
  try {
    const response = await fetchTrendingMovies(pageNo);
    renderGallery(response.results);
    homePageNo = pageNo;
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
        searchInput.value = ''; // Wyczyszczenie pola wyszukiwania
        if (response.results.length > 0) {
          notResult.style.display = 'none'; // Ukrycie komunikatu o braku wyników
          clearGallery();
          renderGallery(response.results);
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

    // Ukrycie komunikatu o braku wyników na start
    const notResult = document.getElementById('not-result');
    notResult.style.display = 'none';

    // Sprawdzenie czy lista filmów nie jest pusta
    if (movies.length > 0) {
      // Wyświetlenie filmów
      const newContent = movies
        .map(movie => {
          let posterPath;
          if (movie.poster_path) {
            posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
          } else {
            posterPath =
              'https://github.com/Krzysztof-GoIT/goit-projekt-filmoteka/blob/main/src/img/kolaz-w-tle-filmu.png?raw=true';
          }
          let categories = 'Without category';
          let releaseYear = movie.release_date ? movie.release_date.slice(0, 4) : 'Without date';
          // Sprawdzenie czy istnieje przynajmniej jeden gatunek, jeśli nie to wyświtlany jest string 'Without category'

          if (movie.genre_ids && movie.genre_ids.length > 0) {
            categories = getGenres(movie.genre_ids);
          }

          const movieCard = `
          <div class="movie-card" data-movie-id="${movie.id}">
          <img class="movie-poster" src="${posterPath}" alt="${movie.title}">
          <div class="movie-details">
          <p class="movie-title">${movie.title}</p>
          <p class="movie-info">${categories} | ${releaseYear}</p>
          </div>
          </div>
          `;

          return movieCard;
        })
        .join('');
      galleryContainer.insertAdjacentHTML('beforeend', newContent);

      // Ukrycie komunikatu o braku wyników, jeśli lista filmów nie jest pusta
      notResult.style.display = 'none';
    } else {
      // Jeśli lista filmów jest pusta, wyświetl komunikat
      galleryContainer.innerHTML = '';
      notResult.style.display = 'block'; // Wyświetlenie komunikatu o braku wyników
      clearGallery(); // Wyczyszczenie galerii
    }

    // Obsługa zdarzenia kliknięcia dla każdej karty filmu
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(card => {
      card.addEventListener('click', async () => {
        const movieId = card.dataset.movieId;
        const movieDetails = await fetchMovieDetails(movieId);
        openModal(movieDetails); //Aleksander Modal
        displayMovieDetails(movieDetails);
      });
    });
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    // Wyświetlenie komunikatu o braku wyników w przypadku błędu
    const notResult = document.getElementById('not-result');
    notResult.style.display = 'block';
  }
};

// Ukrycie komunikatu o braku wyników na start
document.addEventListener('DOMContentLoaded', () => {
  const notResult = document.getElementById('not-result');
  notResult.style.display = 'none';
});

// Czyszczenie galerii
const clearGallery = () => {
  const galleryContainer = document.getElementById('gallery-container');
  galleryContainer.innerHTML = ''; // Wyczyszczenie zawartości galerii
};

//Aleksander Modal
const openModal = movieData => {
  const modal = document.getElementById('myModal');
  modal.style.display = 'block';

  const modalContent = document.getElementById('modalContent');
  modalContent.innerHTML = `
  <img class="movie-poster" src="https://image.tmdb.org/t/p/w500${movieData.poster_path}" alt="${
    movieData.title
  } Photo">
    <h2>${movieData.title}</h2>
    <p>Vote / Votes <span>${movieData.vote_average} / ${movieData.vote_count}</span></p>
    <p>Popularity <span>${movieData.popularity}</span></p>
    <p>Orginal Title <span>${movieData.original_title}</span></p>
    <p>Genre <span>${getGenres(movieData.genres)}</span></p>
    <p><strong>ABOUT</strong> ${movieData.overview}</p>
    <button class="watchedButton">Add to Watched</button>
    <button class="queuedButton">Add to Queue</button>
  `;
  const watchedButton = document.getElementsByClassName('watchedButton')[0];
  watchedButton.onclick = () => {
    addToWatchedMovies(movieData);
  };
  const queuedButton = document.getElementsByClassName('queuedButton')[0];
  queuedButton.onclick = () => {
    addToQueue(movieData);
  };
  const span = document.getElementsByClassName('close')[0];
  span.onclick = () => {
    modal.style.display = 'none';
  };

  window.onclick = event => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
};

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
const infinityScrool = document.getElementById('infinityScrool');
let isInfinityScroolActive = false;

// Obsługa zdarzenia kliknięcia przycisku
infinityScrool.addEventListener('click', () => {
  if (isInfinityScroolActive) {
    // Jeżeli infinity scroll jest aktywny, usuwamy nasłuchiwanie zdarzenia scroll
    window.removeEventListener('scroll', loadMoreContent);
  } else {
    // Jeżeli infinity scroll nie jest aktywny, dodajemy nasłuchiwanie zdarzenia scroll
    window.addEventListener('scroll', loadMoreContent);
  }
  // Zmiana stanu - włącz/wyłącz
  isInfinityScroolActive = !isInfinityScroolActive;
  // Początkowe ładowanie treści
  getHomepage(homePageNo);
});

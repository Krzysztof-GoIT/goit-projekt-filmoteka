import {
  fetchMovieDetails,
  fetchMovieTrailers,
  fetchSearchMovies,
  fetchTrendingMovies,
  fetchGenres,
  genresName,
} from './api';
import { addToQueue, addToWatchedMovies } from './localstorage';
import { createPagination, setCurrentPage } from './pagination';

export let homePageNo = 0;
export let searPageNo = 1;
let isInfinityScrollActive = 0;
let isInfinityScrollEnable = 0;
let searchQuery;
let totalPages;

// tworzenie napisu z nazwami gatunków filmu na podstawie ich identyfikatorów
export const getGenres = genreIds => {
  // pobranie psaujących nazw gatunków z listy genresName zdefiniowanej w api.js
  const genres = genreIds.map(genreId => {
    const foundGenre = genresName.find(genre => genre.id === genreId);
    return foundGenre ? foundGenre.name : '';
  });
  // zwrócenie połączonej listy gatunków
  return genres.join(', ');
};

// wyświetlenie galerii filmów z listy obejrzanych
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
    isInfinityScrollActive = 0;
    renderGallery(moviesWithGenres, 1);
  } catch (error) {
    console.error('Error displaying watched movies:', error);
  }
};

// wyświetlenie galerii filmów z listy do obejrzenia
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
    isInfinityScrollActive = 0;
    renderGallery(moviesWithGenres, 1);
  } catch (error) {
    console.error('Error displaying queued movies:', error);
  }
};

// const displayMovieDetails = movieDetails => {
//   // Tutaj możemy zaimplementować logikę wyświetlania informacji o filmie w modalu
//   // console.log(movieDetails);
// };

// obsługa zdarzenia kliknięcia przycisków HomePage i Buttonów
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

// wyświetlanie podanej strony galerii popularnych filmów
export const getHomepage = async (pageNo, infinity) => {
  try {
    const response = await fetchTrendingMovies(pageNo);
    if (!infinity) {
      clearGallery();
    }
    homePageNo = pageNo;
    setCurrentPage(pageNo);
    isInfinityScrollActive = 1;
    renderGallery(response.results, 0);
    createPagination(response.total_pages);
  } catch (error) {
    console.error('Error fetching trending movies:', error);
  }
};

// obsługa zdarzenia kliknięcia formularza wyszukiwania
document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  const searchInput = document.querySelector('.search-form input');
  const notResult = document.getElementById('not-result');

  searchForm.addEventListener('submit', async event => {
    searchForm.preventDefault();
    setCurrentPage(1);
    getSearchResult(event, 1);
  });
});

// wyświetlanie podanej strony galerii szukanych filmów
export const getSearchResult = async (event, pageNo) => {
  event.preventDefault();
  homePageNo = pageNo;
  const searchInput = document.querySelector('.search-form input');
  const notResult = document.getElementById('not-result');
  searchQuery = searchInput.value.trim().toLowerCase().split(' ').join('+');
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
        isInfinityScrollActive = 2;
        searPageNo = 2;
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

export const getSearchResult2 = async (searchQuery, searPageNo) => {
  const searchInput = document.querySelector('.search-form input');
  const notResult = document.getElementById('not-result');
  searchQuery = searchInput.value.trim().toLowerCase().split(' ').join('+');
  if (searchQuery) {
    try {
      const response = await fetchSearchMovies(searchQuery, searPageNo);
      totalPages = response.total_pages;
      movies = response.results;
      if (response.results.length > 0) {
        notResult.style.display = 'none'; // Ukrycie komunikatu o braku wyników
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

// Renderowanie Galerii
const renderGallery = (dataGallery, rating) => {
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
            posterPath =
              'https://github.com/Krzysztof-GoIT/goit-projekt-filmoteka/blob/main/src/img/kolaz-w-tle-filmu.jpg?raw=true';
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
          // console.log('rating: ', rating);
          let rate = rating
            ? ` <span class="average-vote">${movie.vote_average.toFixed(1)}</span>`
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

// // Przeniesienie nasłuchiwania zdarzenia kliknięcia przycisku "Trailer" poza funkcję openModal
// document.addEventListener('DOMContentLoaded', () => {
//   const trailerButton = document.querySelector('#movieTrailerButton');
//   trailerButton.target = '_blank';
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
// });

// Funkcja openModal

const openModal = movieData => {
  const modal = document.getElementById('myModal');
  modal.style.display = 'block';

  const modalContent = document.getElementById('modalContent');
  let posterPath;
  if (movieData.poster_path) {
    posterPath = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;
  } else {
    posterPath =
      'https://github.com/Krzysztof-GoIT/goit-projekt-filmoteka/blob/main/src/img/kolaz-w-tle-filmu.jpg?raw=true';
  }
  modalContent.innerHTML = `
  <div class="modal-container">
    <div class="movie-poster-modal">
      <img class="movie-poster" src="${posterPath}" alt="${movieData.title} Photo">
    </div>
    <div class="modal-movie-info">
      <div class="modal-movie-title"><h2>${movieData.title}</h2></div>

      <div class="info-item">
        <div class="pernament-item">
          <p>Vote / Votes </p>
          <p>Popularity </p>
          <p>Orginal Title </p>
          <p>Genre </p>
        </div>

        <div class="variables-item">
          <p><span class="average-vote">${movieData.vote_average.toFixed(
            1,
          )} </span><span class="slash-color">/ </span><span class="count-vote">${
    movieData.vote_count
  }</span></p>
            <p>${movieData.popularity}</p>
            <p>${movieData.original_title}</p>
            <p>${movieData.genres.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>
      <div class="about-movie">
        <p><span class="about-movie-details">About</span></br> ${movieData.overview}</p>
      </div>

      <div class="modal-buttons">
        <button id="watchedButton" class="watched-button">Add to Watched</button>
        <button id="queueButton" class="queued-button">Add to Queue</button>

      </div>
      <div class="movie-trailer">
      <button id="movieTrailerButton" class="trailer-button">Trailer</button>
      </div>
    </div>
  </div>
  `;

  const watchedButton = document.getElementsById('watchedButton')[0];
  watchedButton.onclick = () => {
    addToWatchedMovies(movieData);
  };
  const queuedButton = document.getElementsById('queuedButton')[0];
  queuedButton.onclick = () => {
    addToQueue(movieData);
  };

  // const span = document.getElementsById('close-modal-movie')[0];
  // span.onclick = () => {
  //   modal.style.display = 'none';
  // };

  // // Obsługa zdarzenia kliknięcia przycisku "Trailer"
  // const trailerButton = document.querySelector('#movieTrailerButton');
  // trailerButton.addEventListener('click', async () => {
  //   try {
  //     // Pobranie identyfikatora filmu
  //     const movieId = movieData.id;
  //     // Wysłanie żądania do API w celu pobrania zwiastunu filmu
  //     const trailersResponse = await fetchMovieTrailers(movieId);
  //     // Wyświetlenie danych zwiastunu w konsoli
  //     console.log('Trailers:', trailersResponse);

  //     // Sprawdzenie, czy istnieją zwiastuny
  //     if (trailersResponse.results && trailersResponse.results.length > 0) {
  //       // Otwarcie zwiastunu w modalnym oknie za pomocą biblioteki basicLightbox
  //       const firstTrailer = trailersResponse.results[0];
  //       if (firstTrailer.site === 'YouTube') {
  //         const trailerUrl = `https://www.youtube-nocookie.com/embed/${firstTrailer.key}`;
  //         // const trailerUrl = `https://www.youtube.com/embed/${firstTrailer.key}`;
  //         // const trailerUrl = `https://www.youtube.com/watch?v=${firstTrailer.key}`;
  //         const trailerModal = basicLightbox.create(`
  //         <iframe width="560" height="315" src="${trailerUrl}" frameborder="0" allowfullscreen></iframe>
  //       `);
  //         trailerModal.show();
  //       }
  //     } else {
  //       console.log('No trailers available');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching movie trailers:', error);
  //   }
  // });

  // Obsługa zdarzenia kliknięcia przycisku "Trailer"
  const trailerButton = document.querySelector('#movieTrailerButton');
  trailerButton.addEventListener('click', async () => {
    try {
      // Pobranie identyfikatora filmu
      const movieId = movieData.id;
      // Wysłanie żądania do API w celu pobrania zwiastunu filmu
      const trailersResponse = await fetchMovieTrailers(movieId);
      // Wyświetlenie danych zwiastunu w konsoli
      // console.log('Trailers:', trailersResponse);

      // Sprawdzenie, czy istnieją zwiastuny
      if (trailersResponse.results && trailersResponse.results.length > 0) {
        // Iteracja przez zwiastuny i otwarcie ich w nowej karcie przeglądarki
        trailersResponse.results.forEach(trailer => {
          if (trailer.site === 'YouTube') {
            window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
          }
        });
      } else {
        console.log('No trailers available');
      }
    } catch (error) {
      console.error('Error fetching movie trailers:', error);
    }
  });

  const closeButton = document.querySelector('.close');
  closeButton.onclick = () => {
    modal.style.display = 'none';
  };

  // obsługa zdarzenia naciśnięcia klawisza Escape do wyłączenia okna modalnego
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      modal.style.display = 'none';
    }
  });

  // obsługa zdarzenia kliknięcia do wyłączenia okna modalnego
  window.onclick = event => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
};

// //Aleksander Modal
// const openModal = movieData => {
//   const modal = document.getElementById('myModal');
//   modal.style.display = 'block';

//   const modalContent = document.getElementById('modalContent');
//   modalContent.innerHTML = `
//   <div class="modal-container">
//     <div class="movie-poster-modal">
//       <img class="movie-poster" src="https://image.tmdb.org/t/p/w500${
//         movieData.poster_path
//       }" alt="${movieData.title} Photo">
//      </div>
//     <div>
//       <h2>${movieData.title}</h2>
//       <div class="info-item">
//       <p>Vote / Votes
//       <span>
//       <span class="average-vote">${movieData.vote_average}</span> /<span class="count-vote">${
//     movieData.vote_count
//   }</span>
//         </span>
//       </p>
//       <p>Popularity <span class="info-item-color" >${movieData.popularity}</span></p>
//       <p>Orginal Title <span class="info-item-color original-title">${
//         movieData.original_title
//       }</span></p>
//       <p>Genre <span class="info-item-color">${getGenres(movieData.genres)}</span></p>
//       </div>
//       <div class="about-movie">
//       <p><span class="about-movie-details">About</span></br> ${movieData.overview}</p>
//       </div>
//       <div class="modal-buttons">
//         <button class="watchedButton">Add to Watched</button>
//         <button class="queuedButton">Add to Queue</button>
//       </div>
//     </div>
//     </div>
//   `;
//   const watchedButton = document.getElementsById('watchedButton')[0];
//   watchedButton.onclick = () => {
//     addToWatchedMovies(movieData);
//   };
//   const queuedButton = document.getElementsById('queuedButton')[0];
//   queuedButton.onclick = () => {
//     addToQueue(movieData);
//   };

//   const trailerButton = document.querySelector('#movieTrailerButton');
//   trailerButton.target = '_blank';

//   // trailerButton.addEventListener('click', async () => {
//   //   try {
//   //     // Pobranie identyfikatora filmu
//   //     const movieId = movieData.id;
//   //     // Wysłanie żądania do API w celu pobrania zwiastunu filmu
//   //     const trailersResponse = await fetchMovieTrailers(movieId);
//   //     // Wyświetlenie danych zwiastunu w konsoli
//   //     console.log('Trailers:', trailersResponse);

//   //     // Sprawdzenie, czy istnieją zwiastuny
//   //     if (trailersResponse.results && trailersResponse.results.length > 0) {
//   //       // Otwarcie pierwszego zwiastunu w nowej karcie przeglądarki, jeśli istnieje
//   //       const firstTrailer = trailersResponse.results[0];
//   //       if (firstTrailer.site === 'YouTube') {
//   //         window.open(`https://www.youtube.com/watch?v=${firstTrailer.key}`, '_blank');
//   //       }
//   //     } else {
//   //       console.log('No trailers available');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error fetching movie trailers:', error);
//   //   }
//   // });

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

//   const span = document.getElementsById('close')[0];
//   span.onclick = () => {
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
    // Jeśli tak, ładujemy więcej treści z Home Page
    if (homePageNo >= 1 && isInfinityScrollActive == 1 && isInfinityScrollEnable == 1) {
      homePageNo++;
      getHomepage(homePageNo, true);
    }
    // Jeśli tak, ładujemy więcej treści z Search
    if (homePageNo >= 1 && isInfinityScrollActive == 2 && isInfinityScrollEnable == 1) {
      getSearchResult2(searchQuery, searPageNo++);
    }
  }
};
const infinityScroll = document.getElementById('infinityScroll');

// obsługa zdarzenia kliknięcia przycisku automatycznego pobierania kolejnych stron w miarę przewijania
infinityScroll.addEventListener('click', () => {
  if (isInfinityScrollEnable) {
    // Jeżeli infinity scroll jest aktywny, usuwamy nasłuchiwanie zdarzenia scroll
    window.removeEventListener('scroll', loadMoreContent);
    isInfinityScrollEnable = 0;
  } else {
    // Jeżeli infinity scroll nie jest aktywny, dodajemy nasłuchiwanie zdarzenia scroll
    window.addEventListener('scroll', loadMoreContent);
    isInfinityScrollEnable = 1;
  }
});

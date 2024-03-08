// search.js

// import { fetchSearchMovies, fetchMovieDetails, genresName } from './api';
import { fetchSearchMovies } from './api';
import renderGallery from './gallery';

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
          renderGallery(searchResults); // Wyświetlenie galerii z wynikami wyszukiwania
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

const clearGallery = () => {
  const galleryContainer = document.getElementById('gallery-container');
  galleryContainer.innerHTML = ''; // Wyczyszczenie zawartości galerii
};

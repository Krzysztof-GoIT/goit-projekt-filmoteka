export let currentPage = 1;
export const itemsPerPage = 20;
import { getSearchResult, getHomepage } from './gallery';

// ustawianie numeru bieżącej strony
export const setCurrentPage = value => {
  currentPage = value;
};

// ustawianie stylu dla przycisku z numerem bieżącej strony
export const updatePageView = currentPage => {
  const paginationButtons = document.querySelectorAll('.pagin-btn');

  paginationButtons.forEach(button => {
    if (parseInt(button.textContent) === currentPage) {
      button.classList.add('current-page');
    } else {
      button.classList.remove('current-page');
    }
  });
};

// generowanie paginacji dla podanej liczby stron
export const createPagination = totalPages => {
  // const paginationContainer = document.getElementById('pagination-container');
  const paginationPages = document.querySelector('.pagination-pages');
  paginationPages.innerHTML = ''; // Wyczyszczenie paginacji
  currentPage = parseInt(currentPage);

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      let displayPage = i;
      const pageButton = document.createElement('button');
      pageButton.textContent = displayPage;
      pageButton.classList.add('pagin-btn');
      paginationPages.appendChild(pageButton);
    }
  } else {
    // Dodanie trzech kropek po pierwszej stronie
    const firstShownPage = Math.max(currentPage - 2, 1);
    const lastShownPage = Math.min(currentPage + 2, totalPages);

    if (firstShownPage > 1) {
      // Dodanie pierwszej strony
      const firstPageButton = document.createElement('button');
      firstPageButton.textContent = 1;
      firstPageButton.classList.add('pagin-btn');
      paginationPages.appendChild(firstPageButton);
      const dots1 = document.createElement('span');
      dots1.textContent = '...';
      dots1.classList.add('dots');
      dots1.setAttribute('disabled', true);
      paginationPages.appendChild(dots1);
    }

    for (let i = firstShownPage; i <= lastShownPage; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i;
      pageButton.classList.add('pagin-btn');
      paginationPages.appendChild(pageButton);
    }

    // Dodanie trzech kropek przed ostatnią stroną
    if (currentPage < lastShownPage) {
      const dots2 = document.createElement('span');
      dots2.textContent = '...';
      dots2.classList.add('dots');
      dots2.setAttribute('disabled', true);
      paginationPages.appendChild(dots2);

      // Dodanie ostatniej strony
      const lastPageButton = document.createElement('button');
      lastPageButton.textContent = totalPages;
      lastPageButton.classList.add('pagin-btn');
      paginationPages.appendChild(lastPageButton);
    }
  }

  if (currentPage === 1) {
    document.querySelector('#icon-arrow-left2').classList.add('hidden');
    document.querySelector('.arrow-left').classList.add('hidden');
  } else {
    document.querySelector('#icon-arrow-left2').classList.remove('hidden');
    document.querySelector('.arrow-left').classList.remove('hidden');
  }

  if (currentPage == totalPages) {
    document.querySelector('#icon-arrow-right2').classList.add('hidden');
    document.querySelector('.arrow-right').classList.add('hidden');
  } else {
    document.querySelector('#icon-arrow-right2').classList.remove('hidden');
    document.querySelector('.arrow-right').classList.remove('hidden');
  }

  updatePageView(currentPage);
};

// ładowanie strony o podanym nummerze
const loadPage = (e, currentPage) => {
  const searchInput = document.querySelector('.search-form input');

  if (searchInput.value !== '') {
    getSearchResult(e, currentPage); // ładowanie podanej strony z szukanymi filmami
  } else {
    getHomepage(currentPage); // ładowanie podanej strony z popularnymi filmami
  }
};

// obsługa zdarzenia kliknięcia w przyciski paginacji
document.querySelector('#pagination-container').addEventListener('click', e => {
  e.preventDefault();

  if (e.target.tagName == 'BUTTON') { // kliknięty przycisk z numerem strony
    currentPage = e.target.innerHTML;
    loadPage(e, currentPage);
  } else if (e.target.tagName == 'A') { // kliknięty przycisk poprzedniej/kolejnej strony
    if (e.target.firstElementChild.id === 'icon-arrow-left2') {
      currentPage -= 1;
      loadPage(e, currentPage);
    } else if (e.target.firstElementChild.id === 'icon-arrow-right2') {
      currentPage += 1;
      loadPage(e, currentPage);
    }
  }
});

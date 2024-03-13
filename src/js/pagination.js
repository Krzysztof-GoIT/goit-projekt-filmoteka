export let currentPage = 1; 
export const itemsPerPage = 20; 

// Tworzenie paginacji
export const createPagination = totalPages => {
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = ''; // Wyczyszczenie paginacji

    // Utworzenie przycisków dla każdej strony
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
            currentPage = i; // Ustawienie bieżącej strony po kliknięciu przycisku
            searchForm.dispatchEvent(new Event('submit')); // Ponowne wysłanie formularza
        });
        paginationContainer.appendChild(pageButton);
    }
};

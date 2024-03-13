
// let totalPages = 5;

// const container = document.querySelector(".pagination");

// for (let i = 1; i <= 10; i++) {
//     let a = document.createElement("a");
//     a.innerHTML = i;
//     container.appendChild(a);
// };

//     // Funkcja do aktualizacji paginacji
//     function updatePagination() {
//         document.querySelectorAll('.pagination a').forEach(link => {
//             link.classList.remove('active');
//         });
//         document.querySelector(".pagination a:nth-child(" + (currentPage + 1) + ")").classList.add('active');

//         // Ukryj lub pokaż przyciski 'poprzednia' i 'następna' w zależności od bieżącej strony
//         document.getElementById('icon-arrow-left2').style.display = currentPage === 1 ? 'none' : 'inline-block';
//         document.getElementById('icon-arrow-right2').style.display = currentPage === totalPages ? 'none' : 'inline-block';
//     }

//     // Funkcja do obsługi kliknięć na przyciskach
//     document.getElementById('icon-arrow-left2').addEventListener('click', function(e) {
//         e.preventDefault();
//         if (currentPage > 1) {
//             currentPage--;
//             updatePagination();
//             // Tutaj możesz wywołać funkcję, która aktualizuje zawartość na stronie po zmianie strony
//         }
//     });

//     document.getElementById('icon-arrow-right2').addEventListener('click', function(e) {
//         e.preventDefault();
//         if (currentPage < totalPages) {
//             currentPage++;
//             updatePagination();
//             // Tutaj możesz wywołać funkcję, która aktualizuje zawartość na stronie po zmianie strony
//         }
//     });

//     // Inicjalizacja paginacji
// updatePagination();
    

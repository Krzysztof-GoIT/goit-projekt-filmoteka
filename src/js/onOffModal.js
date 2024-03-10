const toggleModal = (modalId) => {
  const modal = document.getElementById(modalId);

  if (modal) {
      modal.style.display = modal.style.display === 'block' ? 'none' : 'block'; 
  }
};
      //wydaje mi się że chciałeś zrobić to w ten sposób kwestia wyboru
//    if (modal) {
//     modal.style.visibility = modal.style.visibility === 'visible' ? 'hidden' : 'visible';
//   }
// };





// Funkcja obsługująca zdarzenie klawisza
const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal[style="display: block;"]');
        openModals.forEach((modal) => {
            toggleModal(modal.id);
        });
    }
};
document.addEventListener('keydown', handleKeyDown);

const openModalBtns = document.querySelectorAll('.openModalBtn');

// dla każdego przycisku otwórz modal
openModalBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const modalId = btn.getAttribute('data-modal-id');
    toggleModal(modalId);
  });
});
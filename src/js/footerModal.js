const footerModalButton = document.getElementById("footer-Modal");
const modalContainer = document.querySelector('.footerModalContainer');
const closeFooterModalButton = document.getElementById("closeFooterModal");

const openFooterModal = () => {
  modalContainer.style.display = "block";
  document.addEventListener('keydown', closeModalOnEsc);
};

const closeFooterModal = () => {
  modalContainer.style.display = "none";
  document.removeEventListener('keydown', closeModalOnEsc);
};

const closeModalOnEsc = (event) => {
  if (event.key === "Escape") {
    closeFooterModal();
  }
};

footerModalButton.addEventListener('click', openFooterModal);
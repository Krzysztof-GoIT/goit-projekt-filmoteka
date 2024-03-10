const footerModal = document.getElementById("footer-Modal");

const openFooterModal = () => {
    let modal = document.getElementById("footerModal");
    modal.style.display = 'block';
    document.addEventListener('keydown', closeModalOnEsc);
};

const closeFooterModal = () => {
    let modal = document.getElementById("footerModal");
    modal.style.display = 'none';
    document.removeEventListener('keydown', closeModalOnEsc);
};

const closeModalOnEsc = (event) => {
    if (event.key === 'Escape') {
        closeFooterModal();
    }
};
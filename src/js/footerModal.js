
function openModal1() {
    let modal = document.getElementById('myModal');
    modal.style.display = 'block';
    document.addEventListener('keydown', closeModalOnEsc);
}

function closeModal1() {
    let modal = document.getElementById('myModal');
    modal.style.display = 'none';
    document.removeEventListener('keydown', closeModalOnEsc);
}

function closeModalOnEsc(event) {
    if (event.key === 'Escape') {
        closeModal1();
    }
}
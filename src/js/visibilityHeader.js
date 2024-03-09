const headerNaviElements = document.getElementsByClassName('header-navi');

const homeLink = headerNaviElements[0].getElementsByTagName('a')[0];
const libraryLink = headerNaviElements[0].getElementsByTagName('a')[1];

const myLibrary = document.querySelector('.header-library');
const headerSearch = document.querySelector('.header-search');

const toggleVisibility = (elementToShow, elementToHide) => {
    elementToShow.style.display = 'block';
    elementToHide.style.display = 'none';
};
toggleVisibility(headerSearch, myLibrary);
    homeLink.classList.add('active');

const homeButtonClick = (event) => {
    event.preventDefault(); 
    toggleVisibility(headerSearch, myLibrary);
    homeLink.classList.add('active');
    libraryLink.classList.remove('active');
};

const myLibraryButtonClick = (event) => {
    event.preventDefault(); 
    toggleVisibility(myLibrary, headerSearch);
    homeLink.classList.remove('active');
    libraryLink.classList.add('active');

};

homeLink.addEventListener('click', homeButtonClick);
libraryLink.addEventListener('click', myLibraryButtonClick);
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

const homeButtonClick = (event) => {
    event.preventDefault(); 
    toggleVisibility(headerSearch, myLibrary);
  
};

const myLibraryButtonClick = (event) => {
    event.preventDefault(); 
    toggleVisibility(myLibrary, headerSearch);

};

homeLink.addEventListener('click', homeButtonClick);
libraryLink.addEventListener('click', myLibraryButtonClick);
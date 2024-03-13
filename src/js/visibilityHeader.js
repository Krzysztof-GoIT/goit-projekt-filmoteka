const headerNaviElements = document.getElementsByClassName('header-navi');
const headerBG = document.getElementById('headerBG');

const homeLink = headerNaviElements[0].getElementsByTagName('a')[0];
const libraryLink = headerNaviElements[0].getElementsByTagName('a')[1];

const myLibrary = document.querySelector('.header-library');
const headerSearch = document.querySelector('.header-search');

const toggleVisibility = (elementToShow, elementToHide) => {
  elementToShow.style.display = 'flex';
  elementToHide.style.display = 'none';
};

const setHeaderBackground = () => {
  const screenWidth = window.innerWidth;
  let backgroundImageUrl = '';

  if (myLibrary.style.display === 'flex') {
    if (screenWidth >= 1280) {
      backgroundImageUrl = 'url(./img/bg-lib-desktop.jpg)';
    } else if (screenWidth >= 768) {
      backgroundImageUrl = 'url(./img/bg-lib-tablet.jpg)';
    } else {
      backgroundImageUrl = 'url(./img/bg-lib-mobile.jpg)';
    }
  } else if (headerSearch.style.display === 'flex') {
    if (screenWidth >= 1280) {
      backgroundImageUrl = 'url(./img/bg-home-desktop.jpg)';
    } else if (screenWidth >= 768) {
      backgroundImageUrl = 'url(./img/bg-home-tablet.jpg)';
    } else {
      backgroundImageUrl = 'url(./img/bg-home-mobile.jpg)';
    }
  } else {
    if (screenWidth >= 1280) {
      backgroundImageUrl = 'url(./img/bg-home-desktop.jpg)';
    } else if (screenWidth >= 768) {
      backgroundImageUrl = 'url(./img/bg-home-tablet.jpg)';
    } else {
      backgroundImageUrl = 'url(./img/bg-home-mobile.jpg)';
    }
  }
  headerBG.style.backgroundImage = backgroundImageUrl;
};

setHeaderBackground();

const homeButtonClick = event => {
  event.preventDefault();
  toggleVisibility(headerSearch, myLibrary);
  homeLink.classList.add('active');
  libraryLink.classList.remove('active');
  setHeaderBackground();
};

const myLibraryButtonClick = event => {
  event.preventDefault();
  toggleVisibility(myLibrary, headerSearch);
  homeLink.classList.remove('active');
  libraryLink.classList.add('active');
  setHeaderBackground();
};

homeLink.addEventListener('click', homeButtonClick);
libraryLink.addEventListener('click', myLibraryButtonClick);

window.addEventListener('resize', setHeaderBackground);

if (myLibrary.style.display !== 'flex') {
  const headerLibraryElements = document.querySelectorAll('.header-library');
  headerLibraryElements.forEach(element => {
    element.style.display = 'none';
  });
}

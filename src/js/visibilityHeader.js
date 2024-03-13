const headerNaviElements = document.getElementsByClassName('header-navi');
const headerBG = document.getElementById('headerBG');

const homeLink = headerNaviElements[0].getElementsByTagName('a')[0];
const libraryLink = headerNaviElements[0].getElementsByTagName('a')[1];

const myLibrary = document.querySelector('.header-library');
const headerSearch = document.querySelector('.header-search');
const watchedButton = document.getElementById('watchedHeader');
const logo = document.getElementById('logo');
import { getHomepage } from './gallery';

const toggleVisibility = (elementToShow, elementToHide) => {
  elementToShow.style.visibility = 'visible';
  elementToHide.style.visibility = 'hidden';
  elementToShow.style.display = 'flex';
  elementToHide.style.display = 'none';
};

const libraryClick = () => {
  watchedHeader.click();
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
  headerBG.style.backgroundImage =
    'url("https://github.com/Krzysztof-GoIT/goit-projekt-filmoteka/blob/main/src/img/bg-image-home.png?raw=true")';
  getHomepage(1);
};

const myLibraryButtonClick = event => {
  event.preventDefault();
  toggleVisibility(myLibrary, headerSearch);
  homeLink.classList.remove('active');
  libraryLink.classList.add('active');
  setHeaderBackground();
  headerBG.style.backgroundImage =
    'url("https://github.com/Krzysztof-GoIT/goit-projekt-filmoteka/blob/main/src/img/bg-image-library.png?raw=true")';
  libraryClick(watchedButton);
};

logo.addEventListener('click', homeButtonClick);
homeLink.addEventListener('click', homeButtonClick);
libraryLink.addEventListener('click', myLibraryButtonClick);

window.addEventListener('resize', setHeaderBackground);

if (myLibrary.style.display !== 'flex') {
  const headerLibraryElements = document.querySelectorAll('.header-library');
  headerLibraryElements.forEach(element => {
    element.style.display = 'none';
  });
}

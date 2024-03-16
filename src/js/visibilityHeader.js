const headerNaviElements = document.getElementsByClassName('header-navi');
const headerBG = document.getElementById('headerBG');

const homeLink = headerNaviElements[0].getElementsByTagName('a')[0];
const libraryLink = headerNaviElements[0].getElementsByTagName('a')[1];
const logIn = headerNaviElements[0].getElementsByTagName('a')[2];
const logInContainer = document.querySelector('.sign-in-container');
const registerButton = document.getElementById('register-button');
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');

const myLibrary = document.querySelector('.header-library');
const headerSearch = document.querySelector('.header-search');
const watchedButton = document.getElementById('watchedHeader');
const paginationButtons = document.getElementById('pagination-container');
const logo = document.getElementById('logo');
import { getHomepage, clearGallery } from './gallery';

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
      backgroundImageUrl =
        'url("https://github.com/Krzysztof-GoIT/goit-projekt-filmoteka/blob/main/src/img/bg-lib-desktop.jpg?raw=true")';
    } else if (screenWidth >= 768) {
      backgroundImageUrl =
        'url("https://github.com/Krzysztof-GoIT/goit-projekt-filmoteka/blob/main/src/img/bg-lib-tablet.jpg?raw=true")';
    } else {
      backgroundImageUrl =
        'url("https://github.com/Krzysztof-GoIT/goit-projekt-filmoteka/blob/main/src/img/bg-lib-mobile.jpg?raw=true")';
    }
  } else if (headerSearch.style.display === 'flex') {
    if (screenWidth >= 1280) {
      backgroundImageUrl =
        'url("https://github.com/Krzysztof-GoIT/goit-projekt-filmoteka/blob/main/src/img/bg-home-desktop.jpg?raw=true")';
    } else if (screenWidth >= 768) {
      backgroundImageUrl =
        'url("https://github.com/Krzysztof-GoIT/goit-projekt-filmoteka/blob/main/src/img/bg-home-tablet.jpg?raw=true")';
    } else {
      backgroundImageUrl =
        'url("https://github.com/Krzysztof-GoIT/goit-projekt-filmoteka/blob/main/src/img/bg-home-mobile.jpg?raw=true")';
    }
  } else {
    if (screenWidth >= 1280) {
      backgroundImageUrl =
        'url("https://github.com/Krzysztof-GoIT/goit-projekt-filmoteka/blob/main/src/img/bg-home-desktop.jpg?raw=true")';
    } else if (screenWidth >= 768) {
      backgroundImageUrl =
        'url("https://github.com/Krzysztof-GoIT/goit-projekt-filmoteka/blob/main/src/img/bg-home-tablet.jpg?raw=true")';
    } else {
      backgroundImageUrl =
        'url("https://github.com/Krzysztof-GoIT/goit-projekt-filmoteka/blob/main/src/img/bg-home-mobile.jpg?raw=true")';
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
  paginationButtons.style.display = 'flex';
  clearGallery();
  getHomepage(1);
};

const myLibraryButtonClick = event => {
  event.preventDefault();
  toggleVisibility(myLibrary, headerSearch);
  homeLink.classList.remove('active');
  libraryLink.classList.add('active');
  setHeaderBackground();
  paginationButtons.style.display = 'none';
  libraryClick(watchedButton);
};

logo.addEventListener('click', homeButtonClick);
homeLink.addEventListener('click', homeButtonClick);
libraryLink.addEventListener('click', myLibraryButtonClick);
logIn.addEventListener('click', event => {
  event.preventDefault();
  logInContainer.style.display = 'block';
});
loginButton.addEventListener('click', event => {
  event.preventDefault();
  logInContainer.style.display = 'none';
});
registerButton.addEventListener('click', event => {
  event.preventDefault();
  logInContainer.style.display = 'none';
});
logoutButton.addEventListener('click', event => {
  event.preventDefault();
  logInContainer.style.display = 'none';
});

window.addEventListener('resize', setHeaderBackground);

if (myLibrary.style.display !== 'flex') {
  const headerLibraryElements = document.querySelectorAll('.header-library');
  headerLibraryElements.forEach(element => {
    element.style.display = 'none';
  });
}

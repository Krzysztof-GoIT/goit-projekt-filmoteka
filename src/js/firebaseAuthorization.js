import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

// Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyBJJxKiq-i4sqL8adQDTz48GXByky6Cp3Y',
  authDomain: 'filmoteka-auth-eb393.firebaseapp.com',
  projectId: 'filmoteka-auth-eb393',
  storageBucket: 'filmoteka-auth-eb393.appspot.com',
  messagingSenderId: '951424949581',
  appId: '1:951424949581:web:272460fadddef8c6452b04',
  measurementId: 'G-G1QWHQFCQD',
  databaseURL: 'https://filmoteka-auth-eb393.firebaseio.com',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase();
const logoutButton = document.getElementById("logout-button");
const registerButton = document.getElementById("register-button");
const loginButton = document.getElementById("login-button");
const headerNaviElements = document.getElementsByClassName('header-navi');
const logInHD = headerNaviElements[0].getElementsByTagName('a')[2];

function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;


  if (!validateEmail(email) || !validatePassword(password)) {
    alert('Invalid input!');
    return;
  }

  createUser(email, password);
}

function createUser(email, password, ) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        password: password,
        lastLogin: Date.now()
      };
      return saveUserData(user.uid, userData);
    })
    .then(() => {
      alert('User Created!');
      clearFormFields();
      closeSignInModal()
    })
    .catch((error) => {
      handleAuthError(error);
    });
}

export function saveUserData(uid, userData) {
  const databaseRef = ref(database, 'users/' + uid);
  return set(databaseRef, userData);
}

export function logIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!validateEmail(email) || !validatePassword(password)) {
    alert('Email or Password is incorrect!');
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const databaseRef = ref(database, 'users/' + user.uid);
      const userData = {
        lastLogin: Date.now()
      };
      return set(databaseRef, userData);
    })
    .then(() => {
      alert('User Log In!');
      clearFormFields();
      closeSignInModal()
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

function validateEmail(email) {
  const expression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return expression.test(String(email).toLowerCase());
}

function validatePassword(password) {
  const MIN_PASSWORD_LENGTH = 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[@#$%^&+=]/.test(password);

  return password.length >= MIN_PASSWORD_LENGTH && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
}

function logout() {
  signOut(auth)
    .then(() => {
      alert('Log Out Succesed');
      closeSignInModal()
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
}
function clearFormFields() {
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}


function handleKeyPress(event) {
  if (event.keyCode === 27) {
    closeSignInModal();
  }
}

function closeSignInModal() {
  const signInContainer = document.querySelector('.sign-in-container');
  signInContainer.style.display = "none";
}



onAuthStateChanged(auth, (user) => {
  const loginStatusElement = document.getElementById("login-status");
  if (user) {
    loginStatusElement.textContent = "You are log in" ;
    logoutButton.style.display = "block";
    loginButton.style.display = "none";
    registerButton.style.display = "none";
    logInHD.textContent = "Log Out"


  } else {
    loginStatusElement.textContent = "You are log out";
    logoutButton.style.display = "none";
    loginButton.style.display = "block";
    registerButton.style.display = "block";
    logInHD.textContent = "Log In"
  }
});

document.getElementById('logout-button').addEventListener('click', logout);
document.getElementById('login-button').addEventListener('click', logIn);
document.getElementById('register-button').addEventListener('click', register);
document.addEventListener('keydown', handleKeyPress);

/* dodanie zamykania modala poprzez x */

document.getElementById("logout-button").addEventListener("click", logout);
document.getElementById("login-button").addEventListener("click", logIn);
document.getElementById("register-button").addEventListener("click", register);
document.addEventListener('keydown', handleKeyPress);

document.querySelector('.close-modal-reg').addEventListener('click', closeSignInModal);

document.body.addEventListener('click', function (event) {
  if (event.target.classList.contains('close-modal-reg')) {
    closeSignInModal();
  }
});
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJJxKiq-i4sqL8adQDTz48GXByky6Cp3Y",
  authDomain: "filmoteka-auth-eb393.firebaseapp.com",
  projectId: "filmoteka-auth-eb393",
  storageBucket: "filmoteka-auth-eb393.appspot.com",
  messagingSenderId: "951424949581",
  appId: "1:951424949581:web:272460fadddef8c6452b04",
  measurementId: "G-G1QWHQFCQD",
  databaseURL: "https://filmoteka-auth-eb393.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase();
const logoutButton = document.getElementById("logout-button");



function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const fullName = document.getElementById("full-name").value;

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
    })
    .catch((error) => {
      handleAuthError(error);
    });
}

function saveUserData(uid, userData) {
  const databaseRef = ref(database, 'users/' + uid);
  return set(databaseRef, userData);
}
function handleAuthError(error) {
  const errorMessage = error.message;
  alert(errorMessage);
}

function logIn() {
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
      // Wylogowanie zakończone sukcesem
      alert('Log Out Succesed');
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
}
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Jeśli użytkownik jest zalogowany, wyświetl przycisk wylogowania
    logoutButton.style.display = "block";
  } else {
    // Jeśli użytkownik nie jest zalogowany, ukryj przycisk wylogowania
    logoutButton.style.display = "none";
  }
});

document.getElementById("logout-button").addEventListener("click", logout);
document.getElementById("login-button").addEventListener("click", logIn);
document.getElementById("register-button").addEventListener("click", register);
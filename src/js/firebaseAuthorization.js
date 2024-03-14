import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from "firebase/auth";
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
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase();

function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const fullName = document.getElementById("full-name").value;

  if (!validateEmail(email) || !validatePassword(password) || !validateField(fullName)) {
    alert('Email, Password, or Full Name is incorrect!');
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        password: password,
        fullName: fullName,
        lastLogin: Date.now()
      };
      return set(ref(database, 'users/' + user.uid), userData);
    })
    .then(() => {
      alert('User Created!');
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
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
  return password.length >= 6;
}

function validateField(field) {
  return field && field.trim().length > 0;
}

document.getElementById("login-button").addEventListener("click", logIn);
document.getElementById("register-button").addEventListener("click", register);
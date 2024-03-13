import { FirebaseError, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYFLYCMkQpAWHXUhlk7SVgn6j5F_MVJ9E",
  authDomain: "filmoteka-e68b9.firebaseapp.com",
  projectId: "filmoteka-e68b9",
  storageBucket: "filmoteka-e68b9.appspot.com",
  messagingSenderId: "528831050882",
  appId: "1:528831050882:web:5f1564dbe540060e1b709b",
  measurementId: "G-X6SNQYQKWN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const signInForm = document.getElementById("sign-in-form");
const signedInContent = document.getElementById("signed-in-content");
const errorBox = document.getElementById("error-box");
const signOutButton = document.getElementById("sign-out-button");

const showSignInform = () => {
  signInForm.style.display = "block";
  signedInContent.style.display = "none";
};

const showSignedInContent = () => {
  signInForm.style.display = "none";
  signedInContent.style.display = "block";
};

const handleAuthChanged = (user) => {
  if (user) {
    showSignedInContent();
  } else {
    showSignInform();
  }
};

const showError = (error) => {
  errorBox.textContent = error;
  errorBox.style.display = "block";
  setTimeout(() => {
    errorBox.style.display = "none";
  }, 5000);
};

const getUserAndPassword = () => ({
  email: document.querySelector('#email').value,
  password: document.querySelector('#password').value
});

const createUserAccount = () => {
  const { email, password } = getUserAndPassword();
  createUserWithEmailAndPassword(app.auth(), email, password)
    .catch(handleErrorSignIn);
};

const handleErrorSignIn = (error) => {
  switch (error.code) {
    case 'auth/user-not-found':
      createUserAccount();
      break;
    case 'auth/wrong-password':
      showError('Password or email is wrong');
      break;
    default:
      showError('Something went wrong');
  }
};

const handleSubmitSignInForm = (event) => {
  const { email, password } = getUserAndPassword();
  signInWithEmailAndPassword(app.auth(), email, password)
    .catch(handleErrorSignIn);
  
  event.preventDefault();
};

onAuthStateChanged(app.auth(), handleAuthChanged);
signInForm.addEventListener('submit', handleSubmitSignInForm);
signOutButton.addEventListener('click', signOut)
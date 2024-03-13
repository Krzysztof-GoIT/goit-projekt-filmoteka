import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, getAuth } from "firebase/auth";

// Firebase configuration
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
const auth = getAuth(app);  // getAuth instance

const signInForm = document.getElementById("sign-in-form");
const signedInContent = document.getElementById("signed-in-content");
const errorBox = document.getElementById("error-box");
const signedOutContent = document.getElementById("signed-out-content");
const signOutButton = document.getElementById("sign-out-button");
const signWithGoogleButton = document.getElementById("log-in-with-google");
const googleInProvider = new GoogleAuthProvider();

onAuthStateChanged(auth, (user) => {
  handleAuthChanged(user);
});

const showSignInform = () => {
  signedOutContent.style.display = "block";
  signedInContent.style.display = "none";
};

const showSignedInContent = () => {
  signedOutContent.style.display = "none";
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
  email: document.getElementById("email").value,
  password: document.getElementById("password").value
});

const createUserAccount = () => {
  const { email, password } = getUserAndPassword();
  createUserWithEmailAndPassword(auth, email, password)
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
  signInWithEmailAndPassword(auth, email, password)
    .catch(handleErrorSignIn);
  
  event.preventDefault();
};

const signInWithGoogle = () => {
  firebase.auth().signInWithPopup(googleInProvider);
};

signInForm.addEventListener('submit', handleSubmitSignInForm);
signOutButton.addEventListener('click', signOut);
signWithGoogleButton.addEventListener('click', signInWithGoogle);
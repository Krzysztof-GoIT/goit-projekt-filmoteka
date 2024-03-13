
 const devMainButton = document.getElementById("dev-mainButton");
const devButtonBar = document.querySelector('.dev-button-bar');
const scroolToTop = document.getElementById("scroolToTop");
const scroolToTopButton = document.getElementById("scrollToTopButton");

                            //wersja Pierwsza bez animacji

// let isButtonBarVisible = false;

// devMainButton.addEventListener('click', () => {
//     if (isButtonBarVisible) {
//         devButtonBar.style.display = "none"
//     } else {
//         devButtonBar.style.display = "flex"
//     }
// });

// devMainButton.addEventListener('mouseenter', () => {
//     devButtonBar.style.display = "flex";
//     devButtonBar.style.opacity = "1";
// });

// devButtonBar.addEventListener('mouseleave', () => {
//      devButtonBar.style.display = "none"
// })

                            //wersja druga a pojawiającą sie animacją
// gsap.set(devButtonBar, { display: "none", opacity: 0 });

// let isButtonBarVisible = false;

// devMainButton.addEventListener('click', () => {
//   isButtonBarVisible = !isButtonBarVisible;

//   if (isButtonBarVisible) {
//     gsap.to(devButtonBar, { display: "flex", opacity: 1, duration: 0.3, ease: 'power2.out' });
//   } else {
//     gsap.to(devButtonBar, { opacity: 0, duration: 0.3, ease: 'power2.out', onComplete: () => {
//       devButtonBar.style.display = "none";
//     } });
//   }
// });

// devMainButton.addEventListener('mouseenter', () => {
//   gsap.to(devButtonBar, { display: "flex", opacity: 1, duration: 0.3, ease: 'power2.out' });
// });

// devButtonBar.addEventListener('mouseleave', () => {
//   if (!isButtonBarVisible) {
//     gsap.to(devButtonBar, { opacity: 0, duration: 0.3, ease: 'power2.out', onComplete: () => {
//       devButtonBar.style.display = "none";
//     } });
//   }
// });
                                 //wersja trzecia w wysuwającą sie animacją z lewej do prawej
gsap.set(devButtonBar, { display: "none", opacity: 0, x: "-100%" });

let isButtonBarVisible = false;

devMainButton.addEventListener('click', () => {
  isButtonBarVisible = !isButtonBarVisible;

  if (isButtonBarVisible) {
    gsap.to(devButtonBar, { display: "flex", opacity: 1, x: "0%", duration: 0.3, ease: 'power2.out' });
  } else {
    gsap.to(devButtonBar, { opacity: 0, x: "-100%", duration: 0.3, ease: 'power2.out', onComplete: () => {
      devButtonBar.style.display = "none";
    } });
  }
});

devMainButton.addEventListener('mouseenter', () => {
  gsap.to(devButtonBar, { display: "flex", opacity: 1, x: "0%", duration: 0.3, ease: 'power2.out' });
});

devButtonBar.addEventListener('mouseleave', () => {
  if (!isButtonBarVisible) {
    gsap.to(devButtonBar, { opacity: 0, x: "-100%", duration: 0.3, ease: 'power2.out', onComplete: () => {
      devButtonBar.style.display = "none";
    } });
  }
});


let isButtonVisible = true;

scroolToTop.addEventListener('click', () => {
  if (!isButtonVisible) {
    scrollToTopButton.style.visibility = 'hidden';
  } else {
    scrollToTopButton.style.visibility = 'visible';
  }
  isButtonVisible = !isButtonVisible;
})

//filmoteka-e68b9

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
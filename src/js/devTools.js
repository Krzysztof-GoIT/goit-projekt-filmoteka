
 const devMainButton = document.getElementById("dev-mainButton");
const devButtonBar = document.querySelector('.dev-button-bar');
const scroolToTop = document.getElementById("scroolToTop");
const scroolToTopButton = document.getElementById("scrollToTopButton");
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
 
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
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
 const auth = firebase.auth();
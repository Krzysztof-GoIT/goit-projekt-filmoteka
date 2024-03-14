const devMainButton = document.getElementById('dev-mainButton');
const devButtonBar = document.querySelector('.dev-button-bar');
const scrollToTop = document.getElementById('scrollToTop');
const scrollToTopButton = document.getElementById('scrollToTopButton');
const wideContainer = document.getElementById('wide-container');
const galleryContainer = document.getElementById('gallery-container');

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
gsap.set(devButtonBar, { display: 'none', opacity: 0, x: '-100%' });

let isButtonBarVisible = false;

devMainButton.addEventListener('click', () => {
  isButtonBarVisible = !isButtonBarVisible;

  if (isButtonBarVisible) {
    gsap.to(devButtonBar, {
      display: 'flex',
      opacity: 1,
      x: '0%',
      duration: 0.3,
      ease: 'power2.out',
    });
  } else {
    gsap.to(devButtonBar, {
      opacity: 0,
      x: '-100%',
      duration: 0.3,
      ease: 'power2.out',
      onComplete: () => {
        devButtonBar.style.display = 'none';
      },
    });
  }
});

devMainButton.addEventListener('mouseenter', () => {
  gsap.to(devButtonBar, {
    display: 'flex',
    opacity: 1,
    x: '0%',
    duration: 0.3,
    ease: 'power2.out',
  });
});

devButtonBar.addEventListener('mouseleave', () => {
  if (!isButtonBarVisible) {
    gsap.to(devButtonBar, {
      opacity: 0,
      x: '-100%',
      duration: 0.3,
      ease: 'power2.out',
      onComplete: () => {
        devButtonBar.style.display = 'none';
      },
    });
  }
});

let isButtonVisible = true;

scrollToTop.addEventListener('click', () => {
  if (!isButtonVisible) {
    scrollToTopButton.style.visibility = 'hidden';
  } else {
    scrollToTopButton.style.visibility = 'visible';
  }
  isButtonVisible = !isButtonVisible;
});

const toggleMonitorClass = () => {
  if (galleryContainer.classList.contains('monitor-wide')) {
    galleryContainer.classList.remove('monitor-wide');
  } else {
    galleryContainer.classList.add('monitor-wide');
  }
};

wideContainer.addEventListener('click', toggleMonitorClass);

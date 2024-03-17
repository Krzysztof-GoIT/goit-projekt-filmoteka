const visualBody = document.querySelector("body");
const visualBtn = document.getElementById("changeMode");

// przełączanie wyglądu strony pomiędzy trybem jasny/ciemny
export const changeMode = () => {
  const handleDarkMode = () => {
    if (visualBody.getAttribute('data-mode') === "light") {
      visualBody.setAttribute('data-mode', "dark")
    } else {
      visualBody.setAttribute('data-mode', "light")
    }
  }
  visualBtn.addEventListener('click', handleDarkMode)
}

// obsługa przełączania wyglądu strony pomiędzy trybem jasny/ciemny
window.addEventListener('DOMContentLoaded', () => {
  changeMode();
});
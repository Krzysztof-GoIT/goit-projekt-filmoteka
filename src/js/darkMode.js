const visualBody = document.querySelector("body")
const visualBtn = document.getElementById("changeMode")
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
window.addEventListener('DOMContentLoaded', () => {
    changeMode();
});
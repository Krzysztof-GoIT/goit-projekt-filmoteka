// pobranie wskażnika okna modalnego
const modal = document.getElementById("modalGoit");
// pobranie wskażnika przycisku, który otwiera okno modalne
const btn = document.querySelector(".footer-btn");
// pobranie wskażnika elementu <span>, który zamyka okno modalne
const span = document.querySelector(".close-modal-btn-goit");

// obsługa kliknięcia na przycisk otwierający okno modalne 'goit-team'
btn.onclick = function() {
  modal.style.display = "block";
}

// obsługa kliknięcia na przycisk zamykający okno modalne
span.onclick = function() {
  modal.style.display = "none";
}

// obsługa kliknięcia poza okno modalne zamykającego to okno
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// obsługa zdarzenia naciśnięcia klawisza Esc zamkykającego okno modalne
document.onkeydown = function(event) {
  if (event.key === "Escape") {
    modal.style.display = "none";
  }
}

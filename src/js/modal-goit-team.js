// Pobranie okna modalnego
const modal = document.getElementById("modalGoit");

// Pobranie przycisku, który otwiera okno modalne
const btn = document.querySelector(".footer-btn"); // Zmiana na pobranie przycisku po klasie

// Pobranie elementu <span>, który zamyka okno modalne
const span = document.querySelector(".close-modal-btn-goit"); // Zmienione na querySelector dla spójności

// Kiedy użytkownik kliknie na przycisk, otwórz okno modalne
btn.onclick = function() {
  modal.style.display = "block";
}

// Kiedy użytkownik kliknie na <span> (x), zamknij okno modalne
span.onclick = function() {
  modal.style.display = "none";
}

// Kiedy użytkownik kliknie poza oknem modalnym, zamknij je
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Dodanie obsługi zamknięcia okna modalnego przez naciśnięcie klawisza Esc
document.onkeydown = function(event) {
  if (event.key === "Escape") { // Sprawdzenie, czy naciśnięty klawisz to Escape
    modal.style.display = "none";
  }
}

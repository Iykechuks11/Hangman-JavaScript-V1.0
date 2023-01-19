const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
console.log(wrongLettersEl);
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

// UNDERSTOOD
const words = ["application", "programming", "wizard", "app"];

// UNDERSTOOD
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctedLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `<span class="letter">
        ${correctedLetters.includes(letter) ? letter : ""}
      </span>
    `
      )
      .join("")}
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You Won! 😁";
    popup.style.display = "flex";
  }
}

// UNDERSTOOD
// Update the wrong letters
function updateWrongLetterEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  // Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost. 😪";
    popup.style.display = "flex";
  }
}

// UNDERSTOOD
// Show Notification
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// Keydown letter press
window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctedLetters.includes(letter)) {
        correctedLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLetterEl();
      } else {
        showNotification();
      }
    }
  }
});

// RESTART GAME AND PLAY AGAIN
playAgainBtn.addEventListener("click", () => {
  // EMPTY ARRAYS
  correctedLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  // CLEAN UP
  updateWrongLetterEl();

  // HIDE POP-UP
  popup.style.display = "none";
});

displayWord();

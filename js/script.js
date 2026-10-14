import { MOTS } from "./words.js";

let currentRow = 0;
let currentTile = 0;

// for debug TODO = random select a word from a list
let secret_world = pickRandomWorld();
function pickRandomWorld() {
  const randomIndex = Math.floor(Math.random() * MOTS.length);
  console.log(MOTS[randomIndex]);
  return MOTS[randomIndex].toUpperCase();
}

// get all rows
const rows = document.querySelectorAll(".row");

// return the tileS in the row currently being filled (guess)
function getActiveRow() {
  return rows[currentRow];
}
function getCurrentTiles() {
  const row = getActiveRow();
  return row.querySelectorAll(".tile");
}

function setTileState(tile, state) {
  tile.classList.remove("correct", "present", "absent");
  tile.classList.add(state);
}

// evaluate when row is full en player press enter
function evaluateGuess(guess) {
  const tiles = getCurrentTiles();
  const secretLetters = secret_world.split("");

  //   1- Correct letter && correct position
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    const letter = guess[i];

    if (letter === secret_world[i]) {
      setTileState(tile, "correct");
      secretLetters[i] = null;
    }
  }

  //  2- Correct letter && incorrect position
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    const letter = guess[i];

    if (tile.classList.contains("correct")) {
      continue;
    }

    const indexInSecret = secretLetters.indexOf(letter);

    if (indexInSecret !== -1) {
      setTileState(tile, "present");
      secretLetters[indexInSecret] = null;
    } else {
      setTileState(tile, "absent");
    }
  }
}

// listen for keyboard events
document.addEventListener("keydown", (event) => {
  const key = event.key.toUpperCase();

  //   if the user presses a valid letter with regex, write it into the current tile
  if (/^[A-Z]$/.test(key) && currentTile < 5) {
    const tiles = getCurrentTiles();

    // put the letter in the corespondant tile
    tiles[currentTile].textContent = key;
    tiles[currentTile].dataset.tile = key;
    currentTile++;
  }
  // delete with backspace
  if (event.key === "Backspace" && currentTile > 0) {
    const tiles = getCurrentTiles();

    currentTile--;
    tiles[currentTile].textContent = "";
    tiles[currentTile].dataset.tile = "";
  }

  //   now validate the active row when full and press
  if (event.key === "Enter" && currentTile === 5) {
    const tiles = getCurrentTiles();
    let guess = "";

    tiles.forEach((tile) => (guess += tile.textContent));

    if (guess === secret_world) {
      tiles.forEach((tile) => setTileState(tile, "correct"));
      //   console.log("You win");
      reset();
      return;
    }

    evaluateGuess(guess);

    // Move to the next row only if the guess is wronf
    if (currentRow < rows.length - 1) {
      currentRow++;
      currentTile = 0;
    } else {
      //   console.log("No more rows left");
      reset();
    }
  }
});

function reset() {
  rows.forEach((row) => {
    setTimeout(() => {
      const tiles = row.querySelectorAll(".tile");

      tiles.forEach((tile) => {
        tile.textContent = "";
        tile.dataset.tile = "";
        tile.classList.remove("correct", "present", "absent");
        tile.style.backgroundColor = "";
      });
      currentRow = 0;
      currentTile = 0;
    }, 1000);
  });
  secret_world = pickRandomWorld();
}

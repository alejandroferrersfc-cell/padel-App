// Padel Wordle Logic
// We will use 5 letters surnames/names for simplicity

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;
const TARGET_WORD = "TAPIA"; // In a real app, pick daily based on Date

const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
];

let currentGuess = "";
let guesses = []; // Array of strings
let isGameOver = false;

document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('wordle-board');
    const keyboard = document.getElementById('wordle-keyboard');

    if (!board || !keyboard) return;

    function initGame() {
        // Load from local storage if needed (Skipped for brevity, can be added)
        renderBoard();
        renderKeyboard();
        
        // Listen to physical keyboard
        document.addEventListener('keydown', handlePhysicalKeyboard);
    }

    function renderBoard() {
        board.innerHTML = '';
        for (let i = 0; i < MAX_GUESSES; i++) {
            const row = document.createElement('div');
            row.className = 'wordle-row';
            
            const guess = guesses[i] || "";
            const isCurrentRow = i === guesses.length;

            for (let j = 0; j < WORD_LENGTH; j++) {
                const cell = document.createElement('div');
                cell.className = 'wordle-cell';

                if (i < guesses.length) {
                    // Past guesses
                    const letter = guess[j];
                    cell.textContent = letter;
                    // Check logic
                    if (TARGET_WORD[j] === letter) {
                        cell.classList.add('correct');
                    } else if (TARGET_WORD.includes(letter)) {
                        cell.classList.add('present');
                    } else {
                        cell.classList.add('absent');
                    }
                } else if (isCurrentRow && j < currentGuess.length) {
                    // Typing currently
                    cell.textContent = currentGuess[j];
                    cell.classList.add('filled');
                }

                row.appendChild(cell);
            }
            board.appendChild(row);
        }
    }

    function renderKeyboard() {
        keyboard.innerHTML = '';
        keyboardRows.forEach(rowKeys => {
            const row = document.createElement('div');
            row.className = 'keyboard-row';
            
            rowKeys.forEach(key => {
                const btn = document.createElement('button');
                btn.className = `key ${key === 'ENTER' || key === 'DEL' ? 'large' : ''}`;
                btn.textContent = key;
                btn.onclick = () => handleInput(key);

                // Add colors to keys based on previous guesses
                guesses.forEach(guess => {
                    for(let i=0; i<WORD_LENGTH; i++) {
                        if (guess[i] === key) {
                            if (TARGET_WORD[i] === key) {
                                btn.classList.add('correct');
                                btn.classList.remove('present', 'absent');
                            } else if (TARGET_WORD.includes(key) && !btn.classList.contains('correct')) {
                                btn.classList.add('present');
                                btn.classList.remove('absent');
                            } else if (!btn.classList.contains('correct') && !btn.classList.contains('present')) {
                                btn.classList.add('absent');
                            }
                        }
                    }
                });

                row.appendChild(btn);
            });
            keyboard.appendChild(row);
        });
    }

    function handleInput(key) {
        if (isGameOver) return;

        if (key === 'DEL' || key === 'Backspace') {
            currentGuess = currentGuess.slice(0, -1);
        } else if (key === 'ENTER' || key === 'Enter') {
            if (currentGuess.length === WORD_LENGTH) {
                submitGuess();
            } else {
                alert("La palabra debe tener " + WORD_LENGTH + " letras.");
            }
        } else {
            // Letter key logic
            if (/^[a-zA-ZñÑ]$/.test(key) && currentGuess.length < WORD_LENGTH) {
                currentGuess += key.toUpperCase();
            }
        }
        renderBoard();
    }

    function handlePhysicalKeyboard(e) {
        if (e.key === 'Backspace' || e.key === 'Enter') {
            handleInput(e.key);
        } else if (/^[a-zA-ZñÑ]$/.test(e.key)) {
            handleInput(e.key.toUpperCase());
        }
    }

    function submitGuess() {
        guesses.push(currentGuess);
        
        if (currentGuess === TARGET_WORD) {
            isGameOver = true;
            setTimeout(() => alert("¡Has acertado el Wordle de hoy!"), 300);
        } else if (guesses.length === MAX_GUESSES) {
            isGameOver = true;
            setTimeout(() => alert("Has perdido. La respuesta era: " + TARGET_WORD), 300);
        }
        
        currentGuess = "";
        renderBoard();
        renderKeyboard();
    }

    initGame();
});

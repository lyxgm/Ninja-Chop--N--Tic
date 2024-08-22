const board = document.getElementById('gameboard');
const boxes = Array.from(document.getElementsByClassName('box'));
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

// Sound Effects
const playSound = (sound) => {
    const audio = new Audio(`source/${sound}.mp3`);
    audio.play();
};

let currentPlayer = 'X';
let gameActive = true;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];

const highlightWinningBoxes = (pattern) => {
    pattern.forEach(index => {
        boxes[index].classList.add('winning-box'); // Add the class to highlight the winning boxes
    });
};

const checkWinner = () => {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boxes[a].textContent && boxes[a].textContent === boxes[b].textContent && boxes[a].textContent === boxes[c].textContent) {
            gameActive = false;
            highlightWinningBoxes(pattern); // Highlight the winning boxes
            return boxes[a].textContent;
        }
    }
    return boxes.every(box => box.textContent) ? 'Draw' : null;
};

const displayMessage = (text, type) => {
    message.textContent = text;
    message.className = `display ${type}`;
};

const handleClick = (event) => {
    const box = event.target;

    if (box.textContent || !gameActive) return;

    playSound('click-sound'); // Play click sound
    box.textContent = currentPlayer;
    const winner = checkWinner();

    if (winner) {
        if (winner === 'Draw') {
            playSound('draw-sound'); // Play draw sound
            displayMessage("It's a Draw!", 'draw');
        } else {
            playSound('win-sound'); // Play win sound
            displayMessage(`${winner} Wins!`, 'winner');
        }
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
};

const resetGame = () => {
    boxes.forEach(box => {
        box.textContent = '';
        box.classList.remove('winning-box'); // Remove the winning highlight
    });
    message.textContent = '';
    currentPlayer = 'X';
    gameActive = true;
    playSound('reset-sound'); // Play reset sound
};

board.addEventListener('click', handleClick);
resetButton.addEventListener('click', resetGame);

// Cursor Design Ripple Effect
document.addEventListener('mousemove', (e) => {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);

    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
});

const helpSection = document.getElementById('help-section');
const closeHelpButton = document.getElementById('close-help-button');
const showHelpButton = document.getElementById('show-help-button');

// Function to show the help section
const showHelpSection = () => {
    helpSection.classList.remove('hidden');
};

// Function to hide the help section
const hideHelpSection = () => {
    helpSection.classList.add('hidden');
};

// Event listeners for help buttons
showHelpButton.addEventListener('click', showHelpSection);
closeHelpButton.addEventListener('click', hideHelpSection);

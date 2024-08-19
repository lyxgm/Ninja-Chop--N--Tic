const board = document.getElementById('gameboard');
const boxes = Array.from(document.getElementsByClassName('box'));
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];

const checkWinner = () => {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boxes[a].textContent && boxes[a].textContent === boxes[b].textContent && boxes[a].textContent === boxes[c].textContent) {
            gameActive = false;
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

    box.textContent = currentPlayer;
    const winner = checkWinner();

    if (winner) {
        displayMessage(winner === 'Draw' ? "It's a Draw!" : `${winner} Wins!`, winner === 'Draw' ? 'draw' : 'winner');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
};

const resetGame = () => {
    boxes.forEach(box => box.textContent = '');
    message.textContent = '';
    currentPlayer = 'X';
    gameActive = true;
};

board.addEventListener('click', handleClick);
resetButton.addEventListener('click', resetGame);

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

    box.textContent = currentPlayer;
    const winner = checkWinner();

    if (winner) {
        displayMessage(winner === 'Draw' ? "It's a Draw!" : `${winner} Wins!`, winner === 'Draw' ? 'draw' : 'winner');
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
};

board.addEventListener('click', handleClick);
resetButton.addEventListener('click', resetGame);


// CURSOR DESIGN SLASH
// document.addEventListener('mousemove', function(e) {
//     const slash = document.createElement('div');
//     slash.className = 'slash';

//     // Position the slash based on mouse coordinates
//     slash.style.left = `${e.pageX - 120}px`;  // Move the stroke to the left of the cursor
//     slash.style.top = `${e.pageY + 5}px`;     // Position just below the cursor

//     // Add the slash to the document
//     document.body.appendChild(slash);

//     // Animate the slash out
//     setTimeout(() => {
//         slash.style.transform = 'rotate(-45deg) scale(1.5)';
//         slash.style.opacity = '0';
//     }, 50);

//     // Remove the slash element after the animation
//     setTimeout(() => {
//         document.body.removeChild(slash);
//     }, 500);  // Match the transition duration
// });







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

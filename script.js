const board = document.getElementById('game-board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset-btn');

let currentPlayer = 'X'; // X starts the game
let boardState = Array(9).fill(null); // Track the state of each cell

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }

    return boardState.every(cell => cell) ? 'T' : null; // T for Tie
}

function handleClick(event) {
    const cellIndex = Array.from(board.children).indexOf(event.target);

    if (boardState[cellIndex] || checkWinner()) return;

    boardState[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add(currentPlayer.toLowerCase());

    const winner = checkWinner();
    if (winner) {
        status.textContent = winner === 'T' ? "It's a tie!" : `${winner} wins!`;
        status.classList.add('win-message');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
        status.classList.remove('win-message');
    }
}

function setupBoard() {
    board.innerHTML = '';
    boardState = Array(9).fill(null);
    currentPlayer = 'X';
    status.textContent = "Player X's turn";
    status.classList.remove('win-message');

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.addEventListener('click', handleClick);
        board.appendChild(cell);
    }
}

resetButton.addEventListener('click', setupBoard);

// Initialize the game board
setupBoard();

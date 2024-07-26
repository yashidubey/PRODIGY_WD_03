const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

resetButton.addEventListener('click', resetGame);

function handleClick(e) {
    const cell = e.target;
    if (cell.classList.contains('x') || cell.classList.contains('o') || !gameActive) return;

    cell.classList.add(currentPlayer);
    if (checkWin()) {
        status.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (Array.from(cells).every(cell => cell.classList.contains('x') || cell.classList.contains('o'))) {
        status.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => cells[index].classList.contains(currentPlayer));
    });
}

function resetGame() {
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
    });
    currentPlayer = 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
    gameActive = true;
}

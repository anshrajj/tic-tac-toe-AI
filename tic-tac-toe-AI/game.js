// Game logic and AI implementation for Tic Tac Toe

const board = document.getElementById('game-board');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart');

let boardState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initialize the board when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeBoard();
    updateStatus();
});

function handleCellClick(clickedCell, clickedCellIndex) {
    console.log(`Cell clicked: ${clickedCellIndex}`); // Debugging line
    console.log(`Current player: ${currentPlayer}`); // Debugging line
    console.log(`Game active: ${gameActive}`); // Debugging line
    console.log(`Board state before move: ${boardState}`); // Debugging line
    console.log(`Current player: ${currentPlayer}`); // Debugging line
    console.log(`Game active: ${gameActive}`); // Debugging line
    console.log(`Board state before move: ${boardState}`); // Debugging line
    console.log(`Current player: ${currentPlayer}`); // Debugging line
    console.log(`Game active: ${gameActive}`); // Debugging line
    console.log(`Board state before move: ${boardState}`); // Debugging line
    console.log(`Current player: ${currentPlayer}`); // Debugging line
    console.log(`Game active: ${gameActive}`); // Debugging line
    console.log(`Board state before move: ${boardState}`); // Debugging line
    console.log(`Current player: ${currentPlayer}`); // Debugging line
    console.log(`Game active: ${gameActive}`); // Debugging line
    console.log(`Board state before move: ${boardState}`); // Debugging line
    console.log(`Current player: ${currentPlayer}`); // Debugging line
    console.log(`Game active: ${gameActive}`); // Debugging line
    console.log(`Board state before move: ${boardState}`); // Debugging line
    console.log(`Current player: ${currentPlayer}`); // Debugging line
    console.log(`Game active: ${gameActive}`); // Debugging line
    console.log(`Board state before move: ${boardState}`); // Debugging line
    console.log(`Current player: ${currentPlayer}`); // Debugging line
    console.log(`Game active: ${gameActive}`); // Debugging line
    console.log(`Board state before move: ${boardState}`); // Debugging line
    console.log(`Current player: ${currentPlayer}`); // Debugging line
    console.log(`Game active: ${gameActive}`); // Debugging line
    console.log(`Board state before move: ${boardState}`); // Debugging line
    console.log(`Current player: ${currentPlayer}`); // Debugging line
    if (boardState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }
    boardState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    checkResult();
    if (gameActive && currentPlayer === 'O') {
        setTimeout(makeAIMove, 500); // Delay for AI move
    }
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] === '' || boardState[b] === '' || boardState[c] === '') {
            continue;
        }
        if (boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `Player ${currentPlayer} has won!`;
        gameActive = false;
        return;
    }

    if (!boardState.includes('')) {
        statusDisplay.innerHTML = 'Game ended in a draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
}

function updateStatus() {
    if (gameActive) {
        statusDisplay.innerHTML = `Current player: ${currentPlayer}`;
    }
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    boardState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.innerHTML = 'Current player: X';
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');
}

function makeAIMove() {
    const bestMove = minimax(boardState, 'O').index;
    boardState[bestMove] = 'O';
    document.querySelectorAll('.cell')[bestMove].innerHTML = 'O';
    checkResult();
}

function minimax(newBoard, player) {
    const availableSpots = newBoard.filter(spot => spot === '');

    if (checkWin(newBoard, 'X')) {
        return { score: -10 };
    } else if (checkWin(newBoard, 'O')) {
        return { score: 10 };
    } else if (availableSpots.length === 0) {
        return { score: 0 };
    }

    const moves = [];
    for (let i = 0; i < newBoard.length; i++) {
        if (newBoard[i] === '') {
            const move = {};
            move.index = i;
            newBoard[i] = player;
            const result = minimax(newBoard, player === 'O' ? 'X' : 'O');
            move.score = result.score;
            newBoard[i] = '';
            moves.push(move);
        }
    }

    let bestMove;
    if (player === 'O') {
        let bestScore = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}

function checkWin(board, player) {
    return winningConditions.some(condition => {
        return condition.every(index => board[index] === player);
    });
}

// Initialize the board
function initializeBoard() {
    console.log("Initializing board..."); // Debugging line
    board.innerHTML = ''; 
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        board.appendChild(cell);
    }
    
    console.log("Cells created and event listeners attached."); // Debugging line
    document.querySelectorAll('.cell').forEach((cell, index) => {
        console.log(`Attaching click event to cell ${index}`); // Debugging line
        cell.addEventListener('click', () => handleCellClick(cell, index));
    });
    // Attach event listeners after creating cells
}

// Attach restart button event listener
restartButton.addEventListener('click', restartGame);


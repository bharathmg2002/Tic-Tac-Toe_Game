const cells = document.querySelectorAll('.cell');
const resetButton = document.querySelector('.reset-button');
let currentPlayer = 'X';
let player1=document.querySelector(".containerL");
let player2=document.querySelector(".containerR");
let res=document.getElementById("arrow");
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Function to handle cell click
function handleCellClick(e, index) {
    if (!gameActive || gameBoard[index] !== '') {alert("Cannot overlap")
    return};

    if(currentPlayer=='X'){
        player1.style.visibility="hidden";
        player2.style.visibility="visible";
    }
    else if(currentPlayer=='O'){
        player1.style.visibility="visible";
        player2.style.visibility="hidden";
    }
    
    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer);

    if (checkWin()) {
        endGame(false);
    } else if (isBoardFull()) {
        endGame(true);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Function to check for a win
function checkWin() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
}

// Function to check if the board is full
function isBoardFull() {
    return gameBoard.every((cell) => cell !== '');
}

// Function to end the game
function endGame(draw) {
    gameActive = false;
    if (draw) {
        alert('It\'s a draw!');
    } else {
        if(currentPlayer=='X')
            alert(`Player 1 Wins😎🥳🥳😎`);
        else
            alert(`Player 2 wins😎🥳🥳😎`);
    }
    player1.style.visibility="visible";
    player2.style.visibility="hidden";
    res.style.display="block";
}

// Event listeners
cells.forEach((cell, index) => {
    cell.addEventListener('click', (e) => handleCellClick(e, index));
});

resetButton.addEventListener('click', () => {
    cells.forEach((cell) => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    player1.style.visibility="visible";
    player2.style.visibility="hidden";
    res.style.display="none";
    gameActive = true;
});

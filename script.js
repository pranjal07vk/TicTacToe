// elements
const board = document.getElementById("board");       
const statusText = document.getElementById("status"); 
const resetBtn = document.getElementById("resetBtn"); 

// variables
let currentPlayer = "X"; 
let gameActive = true;  
let gameState = ["", "", "", "", "", "", "", "", ""]; 

// winning conditions
const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8],   
  [0,3,6], [1,4,7], [2,5,8],   
  [0,4,8], [2,4,6]           
];

// create new board
function createBoard() {
  board.innerHTML = ""; 


  gameState.forEach((cell, index) => {
    const div = document.createElement("div"); 
    div.classList.add("cell");                
    div.dataset.index = index;               
    div.addEventListener("click", handleCellClick); 
    board.appendChild(div);                 
  });
}

// clicking cell
function handleCellClick(e) {
  const index = e.target.dataset.index; 

  
  if (gameState[index] !== "" || !gameActive) return;


  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;


  checkResult();
}

// check result
function checkResult() {
  let roundWon = false;

  
  for (let condition of winningConditions) {
    const [a, b, c] = condition;

    
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      roundWon = true;
      break;
    }
  }

  
  if (roundWon) {
    statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
    gameActive = false; // Stop the game
    return;
  }

  
  if (!gameState.includes("")) {
    statusText.textContent = "🤝 It's a Draw!";
    gameActive = false;
    return;
  }

  
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Reset button 
resetBtn.addEventListener("click", resetGame);

// reset game
function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = "Player X's Turn";
  createBoard(); 
}

// Initialize the board when page loads
createBoard();


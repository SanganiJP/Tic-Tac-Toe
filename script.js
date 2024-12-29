// Select all boxes, buttons, and message container elements from the DOM
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msg = document.querySelector("#msg");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");

let turnO = true; // Boolean flag to track if it's O's turn (true) or X's turn (false)

// Define all possible winning patterns (array of indices for winning combinations)
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Function to reset the game to the initial state
const resetGame = () => {
    turnO = true; // Reset turn to 'O' (first player)
    enableBtn(); // Enable all buttons (boxes) for a new game
    msgContainer.classList.add("hide"); // Hide the message container
}

// Add click event listener for each box (for player moves)
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // Place either 'O' or 'X' in the clicked box based on whose turn it is
        if(turnO){
            box.innerText = "O"; // Player O's move
            turnO = false; // Switch turn to Player X
        } else {
            box.innerText = "X"; // Player X's move
            turnO = true; // Switch turn to Player O
        }
        box.disabled = true; // Disable the clicked box to prevent further clicks

        checkWinner(); // Check if there's a winner after the move
    });
});

// Function to disable all the boxes after a winner is found
const disableBtn = () => {
    for(let box of boxes){
        box.disabled = true; // Disable all boxes to prevent further moves
    }
}

// Function to enable all the boxes for a new game
const enableBtn = () => {
    for(let box of boxes){
        box.disabled = false; // Enable all boxes
        box.innerText = ""; // Clear the text in each box
    }
}

// Function to show the winner message and disable further moves
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`; // Display the winner's message
    msgContainer.classList.remove("hide"); // Show the message container
    disableBtn(); // Disable all boxes since the game is over
}

// Function to check if there's a winner based on the winning patterns
const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        
        // If all three positions in the pattern have the same value (either 'O' or 'X')
        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val === pos2val && pos2val === pos3val){
                showWinner(pos1val); // Call function to show the winner
            }
        }
    }
}

// Add event listeners for the reset and new game buttons to reset the game
resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);

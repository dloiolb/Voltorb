const level1 = [
    { x2s: 3, x3s: 1, voltorb: 6 }, // 24 coins
    { x2s: 0, x3s: 3, voltorb: 6 }, // 27 coins
    { x2s: 5, x3s: 0, voltorb: 6 }, // 32 coins
    { x2s: 2, x3s: 2, voltorb: 6 }, // 36 coins
    { x2s: 4, x3s: 1, voltorb: 6 }, // 48 coins
];

const level2 = [
    { x2s: 1, x3s: 3, voltorb: 7 }, // 54 coins
    { x2s: 6, x3s: 0, voltorb: 7 }, // 64 coins 
    { x2s: 3, x3s: 2, voltorb: 7 }, // 72 coins
    { x2s: 0, x3s: 4, voltorb: 7 }, // 81 coins
    { x2s: 5, x3s: 1, voltorb: 7 }, // 96 coins
];

const level3 = [
    { x2s: 2, x3s: 3, voltorb: 8 }, // 108 coins
    { x2s: 7, x3s: 0, voltorb: 8 }, // 128 coins
    { x2s: 4, x3s: 2, voltorb: 8 }, // 144 coins
    { x2s: 1, x3s: 4, voltorb: 8 }, // 162 coins
    { x2s: 6, x3s: 1, voltorb: 8 }, // 192 coins
];

const level4 = [
    { x2s: 3, x3s: 3, voltorb: 8 }, // 216 coins
    { x2s: 0, x3s: 5, voltorb: 8 }, // 243 coins
    { x2s: 8, x3s: 0, voltorb: 10 }, // 256 coins
    { x2s: 5, x3s: 2, voltorb: 10 }, // 288 coins 
    { x2s: 2, x3s: 4, voltorb: 10 }, // 324 coins
];

const level5 = [
    { x2s: 7, x3s: 1, voltorb: 10 }, // 384 coins
    { x2s: 4, x3s: 3, voltorb: 10 }, // 432 coins
    { x2s: 1, x3s: 5, voltorb: 10 }, // 486 coins
    { x2s: 9, x3s: 0, voltorb: 10 }, // 512 coins
    { x2s: 6, x3s: 2, voltorb: 10 }, // 576 coins
];

const level6 = [
    { x2s: 3, x3s: 4, voltorb: 10 }, // 648 coins
    { x2s: 0, x3s: 6, voltorb: 10 }, // 729 coins
    { x2s: 8, x3s: 1, voltorb: 10 }, // 768 coins
    { x2s: 5, x3s: 3, voltorb: 10 }, // 864 coins
    { x2s: 2, x3s: 5, voltorb: 10 }, // 972 coins
];

const level7 = [
    { x2s: 7, x3s: 3, voltorb: 10 }, // 1152 coins
    { x2s: 4, x3s: 4, voltorb: 10 }, // 1296 coins
    { x2s: 1, x3s: 6, voltorb: 13 }, // 1458 coins
    { x2s: 9, x3s: 1, voltorb: 13 }, // 1536 coins 
    { x2s: 6, x3s: 3, voltorb: 10 }, // 1728 coins
];

const level8 = [
    { x2s: 0, x3s: 7, voltorb: 10 }, // 2187 coins 
    { x2s: 8, x3s: 2, voltorb: 10 }, // 2304 coins
    { x2s: 5, x3s: 4, voltorb: 10 }, // 2592 coins
    { x2s: 2, x3s: 6, voltorb: 10 }, // 2916 coins
    { x2s: 7, x3s: 3, voltorb: 10 }, // 3456 coins
];

function pickRandomDict(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// const chosenDict = pickRandomDict(level8);

let currentDict = pickRandomDict(level1);
let currentLevel = 1;

let accumulatedCoins = 0;
let currentLevelCoins = 0;

const buttonLevel = document.getElementById("displayLevel");
buttonLevel.textContent = `${currentLevel}`;

const buttonAC = document.getElementById("displayAC");
buttonAC.textContent = `${accumulatedCoins}`;
const buttonCLC = document.getElementById("displayCLC");
buttonCLC.textContent = `${currentLevelCoins}`;


// setLevel(8);
// console.log(currentDict); 

function setLevel(newlevel) {
    if (newlevel == 1){ 
        currentLevel = 1;
        currentDict = pickRandomDict(level1);
    }
    else if (newlevel == 2){
        currentLevel = 2;
        currentDict = pickRandomDict(level2);
    }
    else if (newlevel == 3){
        currentLevel = 3;
        currentDict = pickRandomDict(level3);
    }
    else if (newlevel == 4){
        currentLevel = 4;
        currentDict = pickRandomDict(level4);
    }
    else if (newlevel == 5){
        currentLevel = 5;
        currentDict = pickRandomDict(level5);
    }
    else if (newlevel == 6){
        currentLevel = 6;
        currentDict = pickRandomDict(level6);
    }
    else if (newlevel == 7){
        currentLevel = 7;
        currentDict = pickRandomDict(level7);
    }
    else if (newlevel == 8){
        currentLevel = 8;
        currentDict = pickRandomDict(level8);
    }
}

let CHOSEN_DIFF_ROWS = 6;
let CHOSEN_DIFF_COLS = 6;


let game = 1; //while game === 1, keep playing, game === 0 is game over (win or lose)
let win = 0; // game === 0 and win === 0 means lose, game === 0 and win === 1 means win
let firstpress = true;
let losing_cell;

// Cell class
class Cell {
    constructor() {
        this.behind = 0; // value at cell: 0 = bomb, OR 1,2,3
        this.hasbeenpressed = 0; // 0 = not pressed, 1 = pressed
    }
}


let board = [];
let rowLabels = [];
let colLabels = [];

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

function generateBoard(){
    tiles = [
        ...Array(currentDict.voltorb).fill(0),
        ...Array(currentDict.x2s).fill(2),
        ...Array(currentDict.x3s).fill(3),
        ...Array(25 - currentDict.voltorb - currentDict.x2s - currentDict.x3s).fill(1),
    ]
    shuffle(tiles);
    // console.log(tiles);

    for (let i = 0; i < 5; i++) {
    // boar2d.push(tiles.slice(i * 5, i * 5 + 5));
        console.log(tiles.slice(i * 5, i * 5 + 5))
        for(let j = 0; j < 5; j++){
            board[i][j] = tiles[5*i + j];
        }
    }
    // console.log(board)

    for (let i = 0; i < 5; i++) {
        let colSum = 0;
        let numVoltorb = 0;
        for (let j = 0; j < 5; j++) {
            let temp = board[j][i];
            colSum += temp;
            if (temp == 0) { numVoltorb += 1;}
        }
        colLabels[i] = {colSum: colSum, numVoltorb: numVoltorb};
    }
    // console.log(colLabels);

    for (let i = 0; i < 5; i++) {
        let rowSum = 0;
        let numVoltorb = 0;
        for (let j = 0; j < 5; j++) {
            let temp = board[i][j];
            rowSum += temp;
            if (temp == 0) { numVoltorb += 1;}
        }
        rowLabels[i] = {rowSum: rowSum, numVoltorb: numVoltorb};
    }
    // console.log(rowLabels)
}

// Create the game board and add buttons
let container;
function createBoard() {
    container = gameBoardContainerInt;
    console.log("hi")

    container.innerHTML = '';
    for (let row = 0; row < CHOSEN_DIFF_ROWS; row++) {
        for (let col = 0; col < CHOSEN_DIFF_COLS; col++) {
            const button = document.createElement('button');
            button.setAttribute('id', `button-${row}-${col}`);

            // If this is the last row or last column, treat as a label button
            const isLabel = (row === CHOSEN_DIFF_ROWS - 1) || (col === CHOSEN_DIFF_COLS - 1);
            if (isLabel) {
                button.classList.add('label-button');
                // keep label buttons non-interactive
                button.disabled = true;

                // Fill label content: row labels go in the last column, column labels go in the last row
                let primary = '';
                let secondary = '';
                if (col === CHOSEN_DIFF_COLS - 1 && row < CHOSEN_DIFF_ROWS - 1) {
                    console.log(row)
                    // row label (use rowLabels)
                    const rl = rowLabels[row];
                    if (rl) {
                        primary = rl.rowSum;
                        secondary = rl.numVoltorb;
                    }
                } else if (row === CHOSEN_DIFF_ROWS - 1 && col < CHOSEN_DIFF_COLS - 1) {
                    // column label (use colLabels)
                    const cl = colLabels[col];
                    if (cl) {
                        primary = cl.colSum;
                        secondary = cl.numVoltorb;
                    }
                }

                // Use the volpic image as the label-button background
                // button.textContent = `${board[row][col]}`;
                button.style.backgroundImage = "url('volpic.png')";
                button.style.backgroundSize = 'contain';
                button.style.backgroundRepeat = 'no-repeat';
                button.style.backgroundPosition = 'center';

                const textDiv = document.createElement('div');
                textDiv.className = 'text-container';
                const span1 = document.createElement('span');
                span1.textContent = primary;
                const span2 = document.createElement('span');
                span2.className = 'sub-text';
                span2.textContent = secondary;
                textDiv.appendChild(span1);
                textDiv.appendChild(span2);

                button.appendChild(textDiv);

                // When creating:
                button.primarySpan = span1;
                button.secondarySpan = span2;


                // button.primarySpan = span1;
                // button.secondarySpan = span2;

            } else {
                // regular game cell: set text and interactions
                // button.textContent = `${row+1}.${col+1}`;
                // button.textContent = `${board[row][col].behind}`;
                // button.textContent = `${board[row][col]}`;
                button.addEventListener('click', () => handleClick(row, col));
                button.addEventListener('contextmenu', (event) => {
                    event.preventDefault();
                    handleRightClick(row, col)
                });
            }

            // Hide the bottom-right corner (intersection of label row and label column)
            if (row === CHOSEN_DIFF_ROWS - 1 && col === CHOSEN_DIFF_COLS - 1) {
                button.style.visibility = 'hidden';
            }

            container.appendChild(button);
        }
    }
}

function resetBoard() {
    // let container;
    // // let difficulty;
    // // if(CHOSEN_DIFF_BOMBS === INTERMEDIATE_BOMBS){container = gameBoardContainerInt;}
    // container = gameBoardContainerInt;
    // console.log("hi")

    // container.innerHTML = '';
    for (let row = 0; row < CHOSEN_DIFF_ROWS; row++) {
        for (let col = 0; col < CHOSEN_DIFF_COLS; col++) {
            // const button = document.createElement('button');
            // button.setAttribute('id', `${CHOSEN_DIFF_BOMBS}-button-${row}-${col}`);
            // const button = document.getElementById(`button-${row}-${col}`);
            const button = document.getElementById(`button-${row}-${col}`);

            // If this is the last row or last column, treat as a label button
            const isLabel = (row === CHOSEN_DIFF_ROWS - 1) || (col === CHOSEN_DIFF_COLS - 1);
            if (isLabel) {
                // button.classList.add('label-button');
                // keep label buttons non-interactive
                // button.disabled = true;

                // row labels go in the last column, column labels go in the last row
                let primary = '';
                let secondary = '';
                if (col === CHOSEN_DIFF_COLS - 1 && row < CHOSEN_DIFF_ROWS - 1) {
                    console.log(row)
                    // row label (use rowLabels)
                    const rl = rowLabels[row];
                    if (rl) {
                        primary = rl.rowSum;
                        secondary = rl.numVoltorb;
                    }
                } else if (row === CHOSEN_DIFF_ROWS - 1 && col < CHOSEN_DIFF_COLS - 1) {
                    // column label (use colLabels)
                    const cl = colLabels[col];
                    if (cl) {
                        primary = cl.colSum;
                        secondary = cl.numVoltorb;
                    }
                }

                button.style.backgroundImage = "url('volpic.png')";
                button.style.backgroundSize = 'contain';
                button.style.backgroundRepeat = 'no-repeat';
                button.style.backgroundPosition = 'center';

                button.primarySpan.textContent = primary;
                button.secondarySpan.textContent = secondary;


            } else {
                button.disabled = false;

                // button.textContent = `${board[row][col]}`;
                button.style.backgroundColor = '#b7bab7';  
                button.style.color = 'white'
                button.style.borderTop = '2px solid #e6ebe6';  
                button.style.borderLeft = '2px solid #e6ebe6';  
                button.style.borderBottom = '2px solid #7f7f7f'; 
                button.style.borderRight = '2px solid #7f7f7f'; 
                button.style.boxShadow = 'inset 4px 4px 8px rgba(0, 0, 0, 0)';
                button.textContent = "";
 
            }

        }
    }
}


// Get the button element by its ID
const ButtonInt = document.getElementById("ButtonInt");
const gameBoardContainerInt = document.getElementById("game-board-intermediate");


function showBoard(level) {
    document.querySelectorAll('.game-board').forEach(board => {
        board.style.display = 'none';
    });
    document.getElementById(`game-board-${level}`).style.display = 'grid';
}

function setActiveButton(level) {
    const buttons = {
        beginner: document.getElementById('ButtonBeg'),
        intermediate: document.getElementById('ButtonInt'),
        expert: document.getElementById('ButtonExp'),
    };

    // Reset all buttons to default gray
    // Object.values(buttons).forEach(btn => {
    //     btn.classList.remove('button-active-intermediate');
    // });

    // Add the appropriate active class
    if (level === 'beginner') {
        buttons.beginner.classList.add('button-active-beginner');
    } else if (level === 'intermediate') {
        buttons.intermediate.classList.add('button-active-intermediate');
    } else if (level === 'expert') {
        buttons.expert.classList.add('button-active-expert');
    }
}

document.getElementById('ButtonInt').onclick = () => setActiveButton('intermediate');



ButtonInt.addEventListener("click", function() {
    showBoard("intermediate");
    setActiveButton("intermediate");
    currentLevelCoins = 0;
    currentLevel = 1;
    startGame2();
});

ButtonCheat.addEventListener("click", function() {
    ButtonCheat.classList.toggle('active')

    for (let row = 0; row < CHOSEN_DIFF_ROWS; row++) {
        for (let col = 0; col < CHOSEN_DIFF_COLS; col++) {
            const isLabel = (row === CHOSEN_DIFF_ROWS - 1) || (col === CHOSEN_DIFF_COLS - 1);
            if (!isLabel){
                const button = document.getElementById(`button-${row}-${col}`);
                if (button.disabled == false){
                    if (ButtonCheat.classList.contains('active')){
                        button.textContent = `${board[row][col]}`;
                        button.style.color = 'green'; 
                    }
                    else {
                        button.textContent = "";
                        button.style.color = 'black'; 
                    }
                }
            }
        }
    }

});

function handleClick(row, col) {

    const button = document.getElementById(`button-${row}-${col}`);


    button.textContent = `${board[row][col]}`;
    button.style.backgroundColor = '#a0a0a0';  
    button.style.color = 'white'
    button.style.borderTop = '2px solid #6b6b6b';  
    button.style.borderLeft = '2px solid #6b6b6b';  
    button.style.borderBottom = '2px solid #c1c1c1'; 
    button.style.borderRight = '2px solid #c1c1c1'; 
    button.style.boxShadow = 'inset 4px 4px 8px rgba(0, 0, 0, 0.3)';
    button.style.cursor = 'pointer';

    button.disabled = true;


    // board[row][col].hasbeenpressed = true;
    currVal = board[row][col];
    button.textContent = `${currVal}`;
    if (currVal == 0){
        if (currentLevel == 1){
            currentLevelCoins = 0;
            generateBoard();
            resetBoard();
        }
        else{
            if (currentLevelCoins < currentLevel){
                currentLevel -= 1;
            }
            currentLevelCoins = 0;
            generateBoard();
            resetBoard();
        }
        
    }
    else if (currentLevelCoins == 0){
        currentLevelCoins = currVal;
    }
    else {
        currentLevelCoins *= currVal;
    }

    buttonLevel.textContent = `${currentLevel}`;
    buttonAC.textContent = `${accumulatedCoins}`;
    buttonCLC.textContent = `${currentLevelCoins}`;
    

    // console.log(currentLevelCoins);
    // console.log((2 ** currentDict.x2s) * (3 ** currentDict.x3s));
    if (currentLevelCoins == ( (2 ** currentDict.x2s) * (3 ** currentDict.x3s) )){
        accumulatedCoins += currentLevelCoins;
        currentLevelCoins = 0;
        currentLevel += 1;
        generateBoard();
        resetBoard();

        buttonLevel.textContent = `${currentLevel}`;
        buttonAC.textContent = `${accumulatedCoins}`;
        buttonCLC.textContent = `${currentLevelCoins}`;

        // if (ButtonCheat.dataset.active === 'true'){
        ButtonCheat.classList.remove('active');
        // }

        // startGame2();
    }

    // changePress(row+1, col+1, 'e');
    // display();
    
}


function initialize(){
    showBoard("intermediate");
    setActiveButton("intermediate");
    board = Array(CHOSEN_DIFF_ROWS).fill().map(() => Array(CHOSEN_DIFF_COLS).fill().map(() => new Cell()));
    game = 1; 
    win = 0; 
    // firstpress = true;
}

function startGame2() {
    // const DIFFICULTY = 99;
    game = 1;
    win = 0;
    // firstpress = true;
    // startButton.textContent = CHOSEN_DIFF_BOMBS;
    // board = Array(INTERMEDIATE_ROWS).fill().map(() => Array(INTERMEDIATE_ROWS).fill().map(() => new Cell()));
    generateBoard();
    createBoard();
    // createBoar2d();
    // display();
}

initialize();
startGame2();
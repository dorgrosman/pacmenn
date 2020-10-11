'use strict'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' ';
const SUPPOR = '🍗';
const CHERRY = '🍒';


var gEatGhosts =0 ;
var gFoodCounter = 5;
var gAllTheFood = 0;
var gAddChary;

var gBoard;
var gGame = {
    score: 0,
    isOn: false
}
function init() {
    console.log('hello')
    var elRestartBtn = document.querySelector('.btn-continer')
    elRestartBtn.style.display = 'none';
    var elVictory = document.querySelector('.victory');
    elVictory.style.display = 'none';
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gAddChary = setInterval(addCheery, 3000);
    gGame.isOn = true
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }

            if (board[i][j] === FOOD) {
                gAllTheFood++
            }
        }
    }

    board[1][1] = SUPPOR;
    board[1][SIZE - 2] = SUPPOR;
    board[SIZE - 2][1] = SUPPOR;
    board[SIZE - 2][SIZE -2] = SUPPOR;
    return board;
}

function updateScore(diff) {
    gFoodCounter++;
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;

    console.log('gAllTheFood', gAllTheFood);
    console.log('gFoodCounter', gFoodCounter);
    if (gAllTheFood === gFoodCounter) gameVictory();
}


function addCheery() {
    var emptyPoses = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var pos = { i: i, j: j };
            // var cell = gBoard[i][j];
            if (gBoard[i][j] === EMPTY) {
                emptyPoses.push(pos);
            }
        }
    }

    var rndinx = (getRandomIntInclusive(0, emptyPoses.length));
    var rnPso = emptyPoses[rndinx];

    gBoard[rndinx.i, rndinx.j] = CHERRY;
    renderCell(rnPso, CHERRY);

    // return randPos;
}


function gameVictory() {
    var elVictory = document.querySelector('.victory');
    elVictory.style.display = 'block';
    gameOver();
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)

    var htmlBtn = '';
    var htmlBtn = '<button class="btn" onclick="init(this)">Play Again</button>';
    var elBtn = document.querySelector('.btn-continer');
    console.log(elBtn);
    elBtn.innerHTML = htmlBtn;
    elBtn.style.display = 'block';

}



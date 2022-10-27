//Define how many rows and columns are in the grid
const rows = 11;
const cols = 11;

//Size, in pixels, of each square of the grid [x, y]
const size = [20, 20];

//Starting position of the snake [x, y]
const startingPos = [5, 4];

//Max FPS
const maxFPS = 1;

//Define the canvas and its context
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

//Set the size of the canvas
var canvasSize = [size[0] * cols, size[1] * rows];
canvas.width = canvasSize[0];
canvas.height = canvasSize[1];





//Create the array that stores each cell and its properties
var grid = new Array(cols);

for (let i = 0; i < grid.length; i++) {
  grid[i] = new Array(rows);
}


//Make the grid all background tiles
for (let x = 0; x < cols; x++) {
    for(let y = 0; y < rows; y++) {
        grid[x][y] = new Array(1);
        grid[x][y][0] = [0];
    }
}

/*

grid[x][y] - 2d array, stores the grid of tiles.

grid[x][y][v] - each cell will have multiple possible values, each stores properties of the cell

v=0: stores the type of cell, refer to the following table for type of cell, index number, and color
    index       type            color
    0:      background cell  black
    1:      snake head       green
    2:      snake body       lime green
    3:      food             red
    
note: color is hardcoded into render function.

v=1: if a cell is a snake cell, it stores the direction of the cell (used for placing new cells)
*/


//Render the grid
function render() {
    for(let x = 0; x < cols; x++) {
        for(let y = 0; y < rows; y++) {
            tileType = grid[x][y][0];
            if(tileType == 0) {
                ctx.fillStyle = "rgb(0, 0, 0)";
            } else if(tileType == 1) {
                ctx.fillStyle = "rgb(25, 179, 2)";
            } else if(tileType == 2) {
                ctx.fillStyle = "rgb(34, 255, 0)";
            } else if(tileType == 3) {
                ctx.fillStyle = "rgb(255, 0, 0)";
            } else {
                console.log("Improper tile type for tile (" + x + "," + y + ")");
            }
            ctx.fillRect(x*size[0], y*size[1], size[0], size[1]);
        }
    }
}

var inputKey;

grid[startingPos[0]][startingPos[1]][0] = 1;

var snakeLength;
var snakeBody = new Array(snakeLength);
snakeBody[0] = [startingPos[0], startingPos[1]];
var direction;
function gameLoop() {
    let newLoc = snakeBody[0];
    //Input
    if(inputKey == "KeyW") {
        direction = "north";
    } else if(inputKey == "KeyA") {
        direction = "west";
    }
    //Calculate move
    if(direction == "north") {
        newLoc = [snakeBody[0][0], snakeBody[1][1] - 1];
    } else if (direction == "west") {
        newLoc = [snakeBody[0][0] - 1, snakeBody[1][1]];
    }


    //Check if the player is out of bounds
    if(newLoc[0] < 0) {
        newLoc[0] = cols;
    } else if(newLoc[0] > 0) {
        
    } else if(newLoc[1] < 0) {
        //newLoc[1] = rows;
    }

    //  verify move
    // if snake is on food, then increase snakeLength by 1
    // snakeBody.push

    if(snakeBody.length > snakeLength) {

    } else {
        snakeBody.unshift(newLoc);
        if(snakeBody.length > 1) {
            snakeBody.pop();
        }
        
    }
    for (let x = 0; x < cols; x++) {
        for(let y = 0; y < rows; y++) {
            grid[x][y][0] = [0];
        }
    }


    //Fills in all snake cells
    for (let i = 0; i < snakeBody.length; i++) {
        if (i == 0) {
            grid[snakeBody[0][0]][snakeBody[0][1]][0] = 1;
        } else {
            grid[snakeBody[0][0]][snakeBody[0][1]][0] = 2;
        }
    }
    //Render
    render();
}

document.addEventListener('keydown', logKey);
  
function logKey(e) {
    inputKey = e.code;
}

gameLoop();
setInterval(gameLoop, 1000/maxFPS);
let gridSize = 16;
let newGridSize;

const gridContainer = document.querySelector("#gridContainer");
const container = document.querySelector("#container");

const gridButton = document.querySelector("#gridButton");
gridButton.addEventListener("click", setGrid);

const clearButton = document.querySelector("#clearButton");
clearButton.addEventListener("click", clearGrid);

function makeRow() {
    
    const row = document.createElement("div");
    row.classList.add("row");
    row.style.height = `calc(var(--gridLength) / ${gridSize})`;

    for(i = 0; i < gridSize; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.width = `calc(var(--gridLength) / ${gridSize})`; //references CSS variable, then concatenate js variable
        square.style.borderRight = "1px solid black";

        square.addEventListener("mouseover", () => {
            square.style.backgroundColor = "black";
        });
        row.appendChild(square);
    }
    
    gridContainer.appendChild(row);
}


function makeGrid() {
    for(x=0; x < gridSize; x++) {//change i to x since makeRow already uses and increments i
        makeRow();
    }
}

function removeGrid() {
    for(i = 0; i < gridSize; i++) {
        gridContainer.removeChild(gridContainer.lastChild);
    }
}

function setGrid() {
    newGridSize = prompt("Please enter your preferred grid size!");
    if(newGridSize < 1) {
        prompt("Invalid number. Grid size must be at least 1.")
    } else if(newGridSize > 100) {
        prompt("Invalid number. Grid size must be 100 or less.")
    }
    removeGrid();
    gridSize = newGridSize;
    makeGrid();
}

function clearGrid() {
    removeGrid();
    makeGrid();
}

makeGrid(); 




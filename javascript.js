let gridSize = 16;

const gridContainer = document.querySelector("#gridContainer");
//set row equal to an empty div. then, alter makegrid/row function to append the squares to the row
const row = document.createElement("div");
row.classList.add("row");
row.style.height = `calc(var(--gridLength) / ${gridSize})`;
gridContainer.appendChild(row);

function makeGrid() {
    
    for(i = 0; i < gridSize; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.height = `calc(var(--gridLength) / ${gridSize})`;
        square.style.width = `calc(var(--gridLength) / ${gridSize})`; //references CSS variable, then concatenate js variable
        square.style.borderStyle = "solid";
        square.style.borderColor = "black";
        square.style.borderWidth = "2px";
        row.appendChild(square);
    }
    
}

makeGrid(); 
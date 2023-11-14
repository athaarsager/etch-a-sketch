let gridSize = 16;
//rewrite height/width calculations to account for border size
const gridContainer = document.querySelector("#gridContainer");

function makeRow() {

    const row = document.createElement("div");
    row.classList.add("row");
    row.style.height = `calc(var(--gridLength) / ${gridSize})`;
    
    for(i = 0; i < gridSize; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.width = `calc(var(--gridLength) / ${gridSize})`; //references CSS variable, then concatenate js variable
        square.style.borderRight = "2px solid black";
        row.appendChild(square);//all appended to same row

        square.addEventListener("mouseover", () => {
            square.style.backgroundColor = "black";
            console.log("You hovered over a square!");
        });
    }
    gridContainer.appendChild(row);
}

function makeGrid() {
    for(x=0; x < gridSize; x++) {//change i to x since makeRow already uses and increments i
        makeRow();
    }
}

makeGrid(); 

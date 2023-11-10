let gridSize = 16;

const gridContainer = document.querySelector("#gridContainer");


function makeGrid() {
    for(i = 0; i < gridSize; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.height = `calc(var(--gridLength) / ${gridSize})`;
        square.style.width = `calc(var(--gridLength) / ${gridSize})`; //references CSS variable, then concatenate js variable
        square.style.borderStyle = "solid";
        square.style.borderColor = "black";
        square.style.borderWidth = "2px";
        gridContainer.appendChild(square);
    }
}

makeGrid(); 
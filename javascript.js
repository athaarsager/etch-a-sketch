let gridSize = 16;
function makeGrid(gridSize) {
for(i = 0; i < gridSize; i++) {
    const square = document.createElement("div");
    square.style.height = "gridContainer.height/gridSize";
    square.style.width = "gridContainer.width/gridSize";
    square.style.cssText = "border-style: solid; border-width: 2px; border-colr: black;";
    gridContainer.appendChild(square);
}
}
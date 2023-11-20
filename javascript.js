let gridSize = 16;
let newGridSize;
let rainbowMode = false;
let shadingMode = false;


const gridContainer = document.querySelector("#gridContainer");
const container = document.querySelector("#container");

const gridButton = document.querySelector("#gridButton");
gridButton.addEventListener("click", setGrid);

const clearButton = document.querySelector("#clearButton");
clearButton.addEventListener("click", clearGrid);

const rainbowButton = document.querySelector("#rainbowButton");
rainbowButton.addEventListener("click", activateRainbowMode);

const shadeButton = document.querySelector("#shadeButton");
shadeButton.addEventListener("click", setShadingMode);

function makeRow() {
    
    const row = document.createElement("div");
    row.classList.add("row");
    row.style.height = `calc(var(--gridLength) / ${gridSize})`;
    

    for(i = 0; i < gridSize; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.width = `calc(var(--gridLength) / ${gridSize})`; //references CSS variable, then concatenate js variable
        square.style.borderRight = "1px solid black";
        square.style.backgroundColor = "#FFFFFF"
        

        square.addEventListener("mouseover", () => {
            if(rainbowMode && shadingMode) {
                let squareColor;
                let squareColored;
                //may need to adjust other ifs as backgroundcolor value will update each time
                //program needs to recognize when square has been colored once, then retain that value
                //and compare all shadings to that initial value
                if(square.style.backgroundColor === "rgb(255, 255, 255)") {
                    square.style.backgroundColor = `${shadeColor(makeRandomColor(), 10)}`;
                    squareColor = square.style.backgroundColor;
                    squareColored = true;
                    console.log(squareColor);
                    
                } else {
                    if(square.style.backgroundColor === `${toRGB(shadeColor(squareColor, 10))}`) {
                        squareColor = `${shadeColor(squareColor, -1)}`;
                        square.style.backgroundColor = squareColor;
                    } else if(square.style.backgroundColor === `${toRGB(shadeColor(squareColor, -1))}`) {
                        squareColor = `${shadeColor(squareColor, -12)}`;
                        square.style.backgroundColor = squareColor;
                    }
                }

                    /*square.style.backgroundColor = `${shadeColor(toHex(square.style.backgroundColor), -10)}`;
                    console.log("I've been shaded!");*/
                //something definitely wrong with color shade function too...
                
                /*if(square.style.backgroundColor === "rgb(255, 255, 255)") {
                    square.style.backgroundColor = `${shadeColor(makeRandomColor(), 100)}`;
                    squareColor = square.style.backgroundColor;
                } else if(square.style.backgroundColor === `${toRGB(shadeColor(squareColor, 100))}`) {
                    square.style.backgroundColor = `${shadeColor(squareColor, 80)}`;
                    squareColor = square.style.backgroundColor;
                } else if(square.style.backgroundColor === `${toRGB(shadeColor(squareColor, 80))}`) {
                    square.style.backgroundColor = `${shadeColor(squareColor, 60)}`;
                    squareColor = square.style.backgroundColor;
                } 
                else {
                    square.style.backgroundColor = "black";
                } */

            } else if(rainbowMode) {
                square.style.backgroundColor = `${makeRandomColor()}`;
            } else if(shadingMode) {
                if(square.style.backgroundColor === "rgb(255, 255, 255)") {
                    square.style.backgroundColor = `${shadeColor("#FFFFFF", -10)}`;

                } else if(square.style.backgroundColor === `${toRGB(shadeColor("#FFFFFF", -10))}`) {
                    square.style.backgroundColor = `${shadeColor("#FFFFFF", -20)}`;
                    
                } else if(square.style.backgroundColor === `${toRGB(shadeColor("#FFFFFF", -20))}`) {
                    square.style.backgroundColor = `${shadeColor("#FFFFFF", -30)}`;

                } else if(square.style.backgroundColor === `${toRGB(shadeColor("#FFFFFF", -30))}`) {
                    square.style.backgroundColor = `${shadeColor("#FFFFFF", -40)}`;

                } else if(square.style.backgroundColor ===`${toRGB(shadeColor("#FFFFFF", -40))}`) {
                    square.style.backgroundColor = `${shadeColor("#FFFFFF", -50)}`;

                } else if(square.style.backgroundColor === `${toRGB(shadeColor("#FFFFFF", -50))}`) {
                    square.style.backgroundColor = `${shadeColor("#FFFFFF", -60)}`;

                } else if(square.style.backgroundColor === `${toRGB(shadeColor("#FFFFFF", -60))}`) {
                    square.style.backgroundColor = `${shadeColor("#FFFFFF", -70)}`;

                } else if(square.style.backgroundColor === `${toRGB(shadeColor("#FFFFFF", -70))}`) {
                    square.style.backgroundColor = `${shadeColor("#FFFFFF", -80)}`;

                } else if(square.style.backgroundColor === `${toRGB(shadeColor("#FFFFFF", -80))}`) {
                    square.style.backgroundColor = `${shadeColor("#FFFFFF", -90)}`;

                } else if(square.style.backgroundColor === `${toRGB(shadeColor("#FFFFFF", -90))}`) {
                    square.style.backgroundColor = `${shadeColor("#FFFFFF", -100)}`
                }
                else {
                    square.style.backgroundColor = "black";
                } 
                         
            } else {
                square.style.backgroundColor = "black";
            }
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
    while (newGridSize === null || newGridSize < 1 || newGridSize > 100) {
        if (newGridSize === null) {
            return;
        }
        else if (newGridSize < 1) {
            newGridSize = prompt("Invalid number. Grid size must be at least 1.")
        } else if(newGridSize > 100) {
            newGridSize = prompt("Invalid number. Grid size must be 100 or less.")
        }
    }
    
    removeGrid();
    gridSize = newGridSize;
    makeGrid();
}

function clearGrid() {
    shadePercent = -10;
    removeGrid();
    makeGrid();
}

function activateRainbowMode() {
    if(rainbowMode === false) {
        rainbowMode = true;
        rainbowButton.style.border = "5px solid black";
        rainbowButton.style.borderRadius = "2px";
    } else {
        rainbowMode = false;
        rainbowButton.style.border = "1px solid black";
        rainbowButton.style.borderRaidus = "2px";
    }
}

function makeRandomColor() {
    let maxValue = 0xFFFFFF;
    let randomNumber = Math.random() * maxValue;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randomColor = randomNumber.padStart(6, "0");//padStart pads a string with the right argument until it reaches the length of the left argument
    while(randomColor === "000000" || randomColor === "ffffff") {//theoretically filters out white and black
        randomNumber = Math.random() * maxValue;
        randomNumber = Math.floor(randomNumber);
        randomNumber = randomNumber.toString(16);
        randomColor = randomNumber.padStart(6, "0");
        return randomColor;
    }
    return `#${randomColor.toUpperCase()}`;
}

function setShadingMode() {
    if(shadingMode === false) {
        shadingMode = true;
        shadeButton.style.border = "5px solid black";
        shadeButton.style.borderRadius = "2px";
    } else {
        shadingMode = false;
        shadeButton.style.border = "1px solid black";
        shadeButton.style.borderRadius = "2px";
    }
}

function shadeColor(color, percent) {
    let r = parseInt(color.substring(1, 3), 16);
    let g = parseInt(color.substring(3, 5), 16);
    let b = parseInt(color.substring(5, 7), 16);

    r = parseInt(r * (100 + percent) / 100);
    g = parseInt(g * (100 + percent) / 100);
    b = parseInt(b * (100 + percent) / 100);

    r = (r<255) ? r: 255;
    g = (g<255) ? g: 255;
    b = (b<255) ? b: 255; 

    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);

    let rr = r.toString(16).padStart(2, "0");
    let gg = g.toString(16).padStart(2, "0");
    let bb = b.toString(16).padStart(2, "0");
    
    return `#${rr}${gg}${bb}`;
}

function toRGB(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgb(${r}, ${g}, ${b})`
}

function toHex(rgb) {
    let r = parseInt(rgb.slice(4, 8));
    let g = parseInt(rgb.slice(9, 13));
    let b = parseInt(rgb.slice(14, 17));
    
    r = r.toString(16).padStart(2, "0");
    g = g.toString(16).padStart(2, "0");
    b = b.toString(16).padStart(2, "0");

    return`#${r}${g}${b}`;
}

makeGrid(); 




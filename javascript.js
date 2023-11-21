let gridSize = 16;
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

    for (i = 0; i < gridSize; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.width = `calc(var(--gridLength) / ${gridSize})`; //references CSS variable, then concatenate js variable
        square.style.borderRight = "1px solid black";
        square.style.backgroundColor = "#FFFFFF";

        square.addEventListener("mouseover", () => {
            if (rainbowMode && shadingMode) {
                if (square.style.backgroundColor === "rgb(255, 255, 255)") {
                    square.style.backgroundColor = makeRandomHue();
                    console.log(square.style.backgroundColor);
                } else {
                    square.style.backgroundColor = darkenHue(toHSL(splitRGB(square.style.backgroundColor)), 10);
                }
            } else if (rainbowMode) {
                square.style.backgroundColor = `${makeRandomColor()}`;
            } else if (shadingMode) {
                square.style.backgroundColor = darkenHue(toHSL(splitRGB(square.style.backgroundColor)), 10);
            } else {
                square.style.backgroundColor = "black";
            }
        });
        row.appendChild(square);
    }

    gridContainer.appendChild(row);

}

function makeGrid() {
    for (x = 0; x < gridSize; x++) {//change i to x since makeRow already uses and increments i
        makeRow();
    }
}

function removeGrid() {
    for (i = 0; i < gridSize; i++) {
        gridContainer.removeChild(gridContainer.lastChild);
    }
}

function setGrid() {
    let newGridSize = prompt("Please enter your preferred grid size!");
    while (newGridSize === null || newGridSize < 1 || newGridSize > 100) {
        if (newGridSize === null) {
            return;
        }
        else if (newGridSize < 1) {
            newGridSize = prompt("Invalid number. Grid size must be at least 1.")
        } else if (newGridSize > 100) {
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
    if (rainbowMode === false) {
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
    while (randomColor === "000000" || randomColor === "ffffff") {//theoretically filters out white and black
        randomNumber = Math.random() * maxValue;
        randomNumber = Math.floor(randomNumber);
        randomNumber = randomNumber.toString(16);
        randomColor = randomNumber.padStart(6, "0");
        return randomColor;
    }
    return `#${randomColor.toUpperCase()}`;
}

function makeRandomHue() {
    let minSat = 35;
    let hue = Math.random() * 360;
    let sat = Math.random() * 65 + 35;
    let light = 90;

    return `hsl(${hue}, ${sat}%, ${light}%)`;
}

function darkenHue(color, percent) {

    color[2] = color[2] - percent;

    return `hsl(${color[0]}, ${color[1]}%, ${color[2]}%)`;
}

function setShadingMode() {
    if (shadingMode === false) {
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

    r = (r < 255) ? r : 255;
    g = (g < 255) ? g : 255;
    b = (b < 255) ? b : 255;

    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);

    let rr = r.toString(16).padStart(2, "0");
    let gg = g.toString(16).padStart(2, "0");
    let bb = b.toString(16).padStart(2, "0");

    return `#${rr}${gg}${bb}`;
}

function splitRGB(input) {
    let rgb = input.split(", ");
    let r = parseInt(rgb[0].substring(4));
    let g = rgb[1];
    let b = parseInt(rgb[2].substring(0, rgb[2].length));
    const output = [r, g, b];

    return output;
}

function toHSL(input) {
    let r = input[0];
    let g = input[1];
    let b = input[2];

    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
        ? l === r
            ? (g - b) / s
            : l === g
                ? 2 + (b - r) / s
                : 4 + (r - g) / s
        : 0;
    return [
        60 * h < 0 ? 60 * h + 360 : 60 * h,
        100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
        (100 * (2 * l - s)) / 2,
    ];
}

makeGrid();




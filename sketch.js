var cells = [];
const width = 640;
const height = 640;
const size = 32;
var current = new Object();
var cols = 0;
var rows = 0;
var stack = [];
var isRunning = true;
var fpsLabel = new Object();

function setup() {
    createCanvas(width, height)
    textSize(15)

    button = createButton('Start/stop');
    button.mousePressed(handleButton)

    fpsLabel = createP('FPS Slider: ').addClass('fps');
    fpsSlider = createSlider(1, 60, 5, 1);

    cols = floor(width / size);
    rows = floor(height / size);

    for (let i = 0; i < cols; i++) {
        cells[i] = [];
        for (let j = 0; j < rows; j++) {
            cells[i][j] = new Cell(i, j);
        }
    }
    current = cells[0][0];
}

function draw() {
    if (isRunning) {
        frameRate(fpsSlider.value());
        background(51)
        current.visited = true;
        let next = current.checkNeighbors();

        if (next) {
            next.visited = true;
            stack.push(current);
            this.removeWalls(current, next)
            current = next;
        } else if (stack.length > 0) {
            current = stack.pop();
        }

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                cells[i][j].draw();
            }
        }

        current.drawCurrent();
    }
}

function removeWalls(a, b) {
    let x = a.x - b.x;
    let y = a.y - b.y;

    //Left
    if (x === 1) {
        a.edges[3] = false;
        b.edges[1] = false;
    }
    //Right
    else if (x === -1) {
        a.edges[1] = false;
        b.edges[3] = false;
    }

    //Bottom
    if (y === 1) {
        a.edges[0] = false;
        b.edges[2] = false;
    }
    //Top
    else if (y === -1) {
        a.edges[2] = false;
        b.edges[0] = false;
    }
}

function handleButton() {
    isRunning = !isRunning;
    select('.fps') = fpsSlider.value();
    console.log(fpsSlider.value());
}
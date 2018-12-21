class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.xDraw = x * size;
        this.yDraw = y * size;
        this.visited = false;

        //            Top right bottom left
        this.edges = [true, true, true, true]
        this.neighbors = [];
    }

    draw() {
        if (this.visited) {
            noStroke();
            fill('#EB274C')
            rect(this.xDraw, this.yDraw, size, size);
            stroke(255);
        }

        stroke(255)
        strokeWeight(2);
        if (this.edges[0]) {
            line(this.xDraw, this.yDraw, this.xDraw + size, this.yDraw)
        }
        if (this.edges[1]) {
            line(this.xDraw + size, this.yDraw, this.xDraw + size, this.yDraw + size)
        }
        if (this.edges[2]) {
            line(this.xDraw + size, this.yDraw + size, this.xDraw, this.yDraw + size)
        }
        if (this.edges[3]) {
            line(this.xDraw, this.yDraw + size, this.xDraw, this.yDraw)
        }

    }

    //Returns a random neighbor that hasnt been visited yet.
    checkNeighbors() {
        this.neighbors = [];
        let top, right, bottom, left

        top = this.getCell(this.x, this.y - 1);
        right = this.getCell(this.x + 1, this.y);
        bottom = this.getCell(this.x, this.y + 1);
        left = this.getCell(this.x - 1, this.y);

        if (top && !top.visited) {
            this.neighbors.push(top)
        }
        if (right && !right.visited) {
            this.neighbors.push(right)
        }
        if (bottom && !bottom.visited) {
            this.neighbors.push(bottom)
        }
        if (left && !left.visited) {
            this.neighbors.push(left)
        }

        return random(this.neighbors) || undefined;
    }

    getCell(x, y) {
        let cell;
        try {
            return cell = cells[x][y];
        } catch (e) {
            return cell = undefined;
        }
    }

    drawCurrent() {
        fill('green')
        rect(this.xDraw, this.yDraw, size, size);
    }
}
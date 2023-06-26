class Automata {
    constructor () {
        this.entities = [];

        this.width =  200;
        this.height = 200;

        this.makeEmptyEntityList();
        this.makeRandomLivingEntities();
    }

    makeEmptyEntityList () {
        for (let col = 0; col < this.width; col++) {
            this.entities.push([]);
            for (let row = 0; row < this.height; row++) {
                this.entities[col][row] = 0;
            }
        }
    }
    
    makeRandomLivingEntities () {
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                this.entities[col][row] = randomInt(2);
            }
        }
    }

    //TODO: Refactor bounds, check don't update self
    countNumberOfLiveNeighbors (checkCol, checkRow) {
        let neighborCount = 0;

        for (let col = checkCol - 2; col < checkCol + 2; col++) {
            for (let row = checkRow - 2; row < checkRow + 2; row++) {
                if (col > 0 && col < this.width && row > 0 && row < this.height) {
                    if (this.entities[col][row] == 1) {
                        neighborCount++;
                    }
                }
            }
        }

        return neighborCount;
    }

    //TODO: Check rules again
    update() {
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                let neighborCount = this.countNumberOfLiveNeighbors(col, row);

                if (this.entities[col][row]) {
                    if (neighborCount == 2 || neighborCount == 3) {
                        this.entities[col][row] = 1;
                    } else if (neighborCount < 2 || neighborCount > 3) {
                        this.entities[col][row] = 0;
                    }
                }
            }
        }
    }

    draw(ctx) {
        let size = 8;
        let gap = 1;
        ctx.fillStyle = "Black";
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                let cell = this.entities[col][row];
                if (cell) ctx.fillRect(col * size + gap, row * size + gap, size - 2 * gap, size - 2 * gap);
            }
        }
    }
}
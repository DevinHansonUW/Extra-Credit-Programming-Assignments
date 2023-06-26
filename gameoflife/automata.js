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

    countNumberOfNeighbors (checkCol, checkRow) {
        let neighborCount = 0;

        for (let col = checkCol; col < checkCol + 2; col++) {
            for (let row = checkRow; row < checkRow + 2; row++) {
                if (this.entities[col][row] == 1) {
                    neighborCount++;
                }
            }
        }

        return neighborCount;
    }

    update() {
        
    }

    draw(ctx) {
        let size = 8;
        let gap = 1;
        ctx.fillStyle = "Black";
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                let cell = this.automata[col][row];
                if (cell) ctx.fillRect(col * size + gap, row * size + gap, size - 2 * gap, size - 2 * gap);
            }
        }
    }
}
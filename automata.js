class Automata {
    //Constructor for Automata class
    constructor () {
        //Setup for all variables for entities and entity list
        this.entities = [];

        this.width =  200;
        this.height = 200;
        this.speed = parseInt(document.getElementById("speed").value, 10);
        this.count = 0;
        this.tickCount = 0;
        this.randomChance = parseInt(document.getElementById("randomness").value, 10);

        this.entityHue = parseInt(document.getElementById("entityHue").value, 10);
        this.entitySat = parseInt(document.getElementById("entitySat").value, 10);
        this.entityLight = parseInt(document.getElementById("entityLight").value, 10);
        this.entityColor = hsl(this.entityHue, this.entitySat, this.entityLight);

        this.makeEmptyEntityList();
        this.makeRandomLivingEntities();
    }

    //Makes the entity list the size of the canvas and full of zeroes
    makeEmptyEntityList () {
        for (let col = 0; col < this.width; col++) {
            this.entities.push([]);
            for (let row = 0; row < this.height; row++) {
                this.entities[col][row] = 0;
            }
        }
    }
    
    //Goes through each cell and randomly determines if it is alive or not
    makeRandomLivingEntities () {
        let chanceAlive = Math.floor(Math.random() * this.randomChance);

        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                if (chanceAlive >= this.randomChance/2) {
                    this.entities[col][row] = 1;
                } else {
                    this.entities[col][row] = 0;
                }

                chanceAlive = Math.floor(Math.random() * this.randomChance);
            }
        }
    }

    //Counts the number of living cell around a specific cell
    countNumberOfLiveNeighbors (checkCol, checkRow) {
        let neighborCount = 0;

        for (let col = checkCol - 1; col < checkCol + 2; col++) {
            for (let row = checkRow - 1; row < checkRow + 2; row++) {
                //Makes sure the col and row are within bounds
                if (col >= 0 && col < this.width && row >= 0 && row < this.height) {
                    //Makes sure the neighbor cell is alive and doesn't count itself
                    if (this.entities[col][row] == 1 && (col != checkCol || row != checkRow)) {
                        neighborCount++;
                    }
                }
            }
        }

        return neighborCount;
    }

    //Goes through each entity cell to determine how it is effected by the rules
    updateEntityGeneration() {
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                //Counts the number of living neighbors to entity cell at position col, row
                let neighborCount = this.countNumberOfLiveNeighbors(col, row);

                //If cell is alive
                if (this.entities[col][row] == 1) {
                    if (neighborCount == 2 || neighborCount == 3) {
                        this.entities[col][row] = 1;
                    } else if (neighborCount < 2 || neighborCount > 3) {
                        this.entities[col][row] = 0;
                    }
                } else if (this.entities[col][row] == 0) { //If cell is dead
                    if (neighborCount == 3) {
                        this.entities[col][row] = 1;
                    } else {
                        this.entities[col][row] = 0;
                    }
                }
            }
        }
    }

    //Updates values and entity list only at every tick
    update() {
        this.speed = parseInt(document.getElementById("speed").value, 10);

        if (this.count++ >= this.speed) {
            this.count = 0;
            this.tickCount++;
            document.getElementById('ticks').innerHTML = "Ticks: " + this.tickCount;

            this.entityHue = parseInt(document.getElementById("entityHue").value, 10);
            this.entitySat = parseInt(document.getElementById("entitySat").value, 10);
            this.entityLight = parseInt(document.getElementById("entityLight").value, 10);
            this.entityColor = hsl(this.entityHue, this.entitySat, this.entityLight);

            this.updateEntityGeneration();
        }
    }

    draw(ctx) {
        let size = 8;
        let gap = 1;
        ctx.fillStyle = this.entityColor;
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                let cell = this.entities[col][row];
                if (cell) ctx.fillRect(col * size + gap, row * size + gap, size - 2 * gap, size - 2 * gap);
            }
        }
    }
}
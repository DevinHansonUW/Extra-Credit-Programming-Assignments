class Automata {
    //Constructor for Automata class
    constructor (ctx) {
        //Setup for all variables for entities and entity list
        this.entities = [];

        this.width =  parseInt(document.getElementById("entityWidth").value, 10);
        this.height = parseInt(document.getElementById("entityHeight").value, 10);

        this.speed = parseInt(document.getElementById("speed").value, 10);
        this.count = 0;
        this.tickCount = 0;
        this.randomChance = parseInt(document.getElementById("randomness").value, 10);
        this.size = parseInt(document.getElementById("zoomSize").value, 10);

        this.entityHue = parseInt(document.getElementById("entityHue").value, 10);
        this.entitySat = parseInt(document.getElementById("entitySat").value, 10);
        this.entityLight = parseInt(document.getElementById("entityLight").value, 10);
        this.entityColor = hsl(this.entityHue, this.entitySat, this.entityLight);

        this.backHue = parseInt(document.getElementById("backHue").value, 10);
        this.backSat = parseInt(document.getElementById("backSat").value, 10);
        this.backLight = parseInt(document.getElementById("backLight").value, 10);
        this.backColor = hsl(this.backHue, this.backSat, this.backLight);
        document.getElementById("gameWorld").style = "background: " + this.backColor + "; border: 1px solid black";
        //ctx.style.style = "background: " + this.backColor + "; border: 1px solid black";

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
                if (chanceAlive <= this.randomChance / 4) {
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
                if (this.checkBounds(col, row)) {
                    //Makes sure the neighbor cell is alive and doesn't count itself
                    if (this.entities[col][row] == 1 && (col != checkCol || row != checkRow)) {
                        neighborCount++;
                    }
                }
            }
        }

        //Return the number of live neighbors
        return neighborCount;
    }

    //Checks to see if position is withing bounds or not
    checkBounds(checkCol, checkRow) {
        if (checkCol >= 0 && checkCol < this.entities.length && checkRow >= 0 && checkRow < this.entities[checkCol].length) {
            return true;
        } else {
            return false;
        }
    }

    //Goes through each entity cell to determine how it is effected by the rules
    updateEntityGeneration() {
        let temp = [];

        for (let col = 0; col < this.width; col++) {
            temp.push([]);
            
            for (let row = 0; row < this.height; row++) {
                //Counts the number of living neighbors to entity cell at position col, row
                let neighborCount = this.countNumberOfLiveNeighbors(col, row);

                //If cell is alive
                if (this.entities[col][row] == 1) {
                    if (neighborCount == 2 || neighborCount == 3) {
                        temp[col][row] = 1;
                    } else if (neighborCount < 2 || neighborCount > 3) {
                        temp[col][row] = 0;
                    }
                } 

                //If cell is dead
                else if (this.entities[col][row] == 0) {
                    if (neighborCount == 3) {
                        temp[col][row] = 1;
                    } else {
                        temp[col][row] = 0;
                    }
                }
            }
        }

        this.entities = temp;
    }

    //Updates values and entity list only at every tick
    update() {
        this.speed = parseInt(document.getElementById("speed").value, 10);

        if (this.count++ >= this.speed) {
            this.count = 0;
            this.tickCount++;
            document.getElementById('ticks').innerHTML = "Ticks: " + this.tickCount;
            this.size = parseInt(document.getElementById("zoomSize").value, 10);

            this.entityHue = parseInt(document.getElementById("entityHue").value, 10);
            this.entitySat = parseInt(document.getElementById("entitySat").value, 10);
            this.entityLight = parseInt(document.getElementById("entityLight").value, 10);
            this.entityColor = hsl(this.entityHue, this.entitySat, this.entityLight);

            this.backHue = parseInt(document.getElementById("backHue").value, 10);
            this.backSat = parseInt(document.getElementById("backSat").value, 10);
            this.backLight = parseInt(document.getElementById("backLight").value, 10);
            this.backColor = hsl(this.backHue, this.backSat, this.backLight);
            document.getElementById("gameWorld").style = "background: " + this.backColor + "; border: 1px solid black";

            this.updateEntityGeneration();
        }
    }

    draw(ctx) {
        let gap = this.size / 10;
        ctx.fillStyle = this.entityColor;
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                let cell = this.entities[col][row];
                if (cell) ctx.fillRect(col * this.size + gap, row * this.size + gap, this.size - 2 * gap, this.size - 2 * gap);
            }
        }
    }
}
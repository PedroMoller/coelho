class Chao {
    constructor(posX, posY, lar, alt){
        var config = {
            isStatic: true
        }
        this.corpo = Bodies.rectangle(posX, posY, lar, alt, config);
        this.lar = lar;
        this.alt = alt;
        World.add(world, this.corpo);
    }
    dChao(){
        var pos = this.corpo.position;
        push();
        rectMode(CENTER);
        noStroke();
        fill(148,127,146);
        rect(pos.x, pos.y, this.lar, this.alt);
        pop();
    }
}
class Juncao{
    constructor(corpo1,corpo2){
        var ultimopedaso = corpo1.body.bodies.length-2;
        this.ligacao = Constraint.create({
            bodyA:corpo1.body.bodies[ultimopedaso],
            pointA:{x:0,y:0},
            bodyB:corpo2,
            pointB:{x:0,y:0},
            length:-10,
            stiffness:0.01
        })
        World.add(engine.world,this.ligacao);
    }
    desfazer(){
        World.remove(engine.world,this.ligacao);
    }
        
    
}
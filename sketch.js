const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var chao;
var corda;
var fruta;
var ligacao;

function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);

  chao = new Chao(200, 690, 600, 20);
  corda = new Rope(6,{x:245,y:30});
  fruta = Bodies.circle(300,300,15);
  Matter.Composite.add(corda.body,fruta);
  ligacao = new Juncao(corda,fruta);
}

function draw() 
{
  background(51);
  Engine.update(engine);
  chao.dChao();
  corda.dCorda();
  ellipse(fruta.position.x,fruta.position.y,15,15);
}





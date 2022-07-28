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
var fundo, melancia, coelhoimg;
var coelhoS;
var botao;
var piscando;
var comendo;
var triste;
var fundoS, cortaS, tristeS, comendoS, arS;
var balao;
var mutar

function preload(){
  fundo = loadImage("background.png");
  melancia = loadImage("melon.png");
  coelhoimg = loadImage("Rabbit-01.png");
  piscando = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  comendo = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  triste = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  fundoS = loadSound("sound1.mp3");
  cortaS = loadSound("rope_cut.mp3");
  tristeS = loadSound("sad.wav");
  comendoS = loadSound("eating_sound.mp3");
  arS = loadSound("air.wav");

  piscando.playing = true;
  comendo.playing = true;
  triste.playing = true;

  piscando.looping = true;
  comendo.looping = false;
  triste.looping = false;
}

function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;

  piscando.frameDelay = 15;
  comendo.frameDelay = 15;
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50);

  chao = new Chao(200, 690, 600, 20);
  corda = new Rope(6,{x:245,y:30});
  fruta = Bodies.circle(300,300,15);
  Matter.Composite.add(corda.body,fruta);
  ligacao = new Juncao(corda,fruta);
  coelhoS = createSprite(420,630,100,100);
  coelhoS.addImage(coelhoimg);
  coelhoS.scale = 0.2;
  coelhoS.addAnimation("piscando", piscando);
  coelhoS.addAnimation("comendo", comendo);
  coelhoS.addAnimation("triste",triste);
  coelhoS.changeAnimation("piscando");
  botao = createImg("cut_btn.png");
  botao.position(220,30);
  botao.size(50,50);
  botao.mouseClicked(cortar);
  balao = createImg("balloon.png");
  balao.position(10,200);
  balao.size(150,100);
  balao.mouseClicked(sopro);
  fundoS.play();
  fundoS.setVolume(0.5);
  mutar = createImg("mute.png");
  mutar.position(450,20);
  mutar.size(50,50);
  mutar.mouseClicked(mute);
}

function draw() {
  background(51);
  image(fundo, width/2, height/2, 500, 700);

  Engine.update(engine);
  chao.dChao();
  corda.dCorda();
  if(fruta!==null){
    image(melancia,fruta.position.x,fruta.position.y,70,70);
  }
 if(dColisao(fruta,coelhoS)===true){
  coelhoS.changeAnimation("comendo");
  comendoS.play();
 }
 if(fruta!==null&&fruta.position.y>=650){
  coelhoS.changeAnimation("triste");
  fruta=null;
  fundoS.stop();
  tristeS.play();
 }
  drawSprites();
}

function cortar(){
  cortaS.play();
  corda.break();
  ligacao.desfazer();
  ligacao = null;
}

function dColisao(corpo,sprite){
  if(corpo!==null){
    var distancia = dist(corpo.position.x,corpo.position.y,sprite.position.x,sprite.position.y);
    if(distancia<=80){
      World.remove(engine.world,fruta);
      fruta=null;
      return true;
    }
    else{
      return false;
    }
  }
}

function sopro(){
  Matter.Body.applyForce(fruta,{x:0,y:0},{X:0.01,y:0});
  arS.play();
}

function mute(){
  if(fundoS.isPlaying()){
    fundoS.stop();
  }
  else{
    fundoS.play();
  }
}
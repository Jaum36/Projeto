var JOGAR = 1;
var INICIO = 2;
var ENCERRAR = 0;
var estadoJogo = JOGAR;

var enemy, flying;

var pontuacao;

var cena, p1, solo;

var fundoImg, p1Anim, p1Pulo, inimigo1Img, inimigo2Img, loseImg ;
var monsterWin, flyWin;


function preload() {
  fundoImg = loadImage("fundo.jpg");
  p1Anim = loadAnimation("run1.png","run2.png","run3.png","run4.png","run5.png","run6.png","run7.png","run8.png","run9.png","run10.png")
  inimigo1Img = loadAnimation("walk1.png","walk2.png","walk3.png","walk4.png","walk5.png","walk6.png","walk7.png","walk8.png");
  inimigo2Img = loadAnimation("fly4.png", "fly2.png", "fly1.png", "fly3.png");
  loseImg = loadAnimation("lose1.png", "lose2.png","lose3.png" );
  monsterWin = loadAnimation("walk1.png");
  flyWin = loadAnimation("fly2.png");
}

function setup() {
  createCanvas(600,400);
  
  cena = createSprite(390,200,600,200);
  cena.addImage("cenario",fundoImg);
  cena.scale = 1.3
  cena.x = cena.width/2;
  
  p1 = createSprite(43, 310, 20, 20);
  p1.addAnimation("correr", p1Anim);
  p1.addAnimation("perder", loseImg);
  p1.scale = 0.6
  p1.setCollider("circle", 0, 0, 20);
  
  solo = createSprite(300,330, 600, 10);
  solo.visible = false;

  grupoMonster = new Group();
  grupoFly = new Group();
  
  //p1.debug = true;

  pontuacao = 0;
  
}

function draw() {
  background(220);
  if(estadoJogo === JOGAR){

    p1.changeAnimation("run", p1Anim);

    pontuacao = pontuacao + Math.round(frameRate()/60);
    
     if (cena.x < 220){
      cena.x = cena.width/2;
    }

    cena.velocityX = -(4+2*pontuacao/100);

    p1.velocityY = p1.velocityY + 0.8;
    
    if(keyDown("space") && p1.y >= 250) {
       p1.velocityY = -15;
  }

    monsterGround();
    flyier();


    if(p1.isTouching(grupoMonster) || p1.isTouching(grupoFly)){
      estadoJogo  = ENCERRAR;
    }
    

 }

  if(estadoJogo === ENCERRAR) {
    solo.velocityX = 0;
    cena.velocityX = 0;
    p1.velocityY = 0;
    grupoMonster.setVelocityXEach(0);
    grupoFly.setVelocityXEach(0);
    grupoMonster.setLifetimeEach(-1);
    grupoFly.setLifetimeEach(-1);
    p1.changeAnimation("perder",loseImg);
    

     if(keyDown("r")){
       reset();
     }
  }

  p1.collide(solo);

  drawSprites();

  if(estadoJogo === ENCERRAR){
    fill(0);
    text("PERDESTE!!! "+"Você marcou: "+pontuacao+" pontos"+"\nAperte R para recomeçar.",200,200 );
  }

  fill(0);
  text("pontos:"+ pontuacao,60,30);
}

function reset(){
  estadoJogo = JOGAR;
  p1.changeAnimation("correr", p1Anim);
  p1.y = 310;
  grupoMonster.destroyEach();
  grupoFly.destroyEach();
  pontuacao = 0;
}

function monsterGround(){

  if(frameCount % 100 === 0){
  enemy = createSprite(600,305,20,20);
  enemy.scale = 0.7
  enemy.addAnimation("walking", inimigo1Img);
  enemy.lifetime = 200;
  enemy.velocityX = -(4+2*pontuacao/100);
  grupoMonster.add(enemy);

  p1.depth = enemy.depth
  p1.depth = p1.depth + 1;
}
}

function flyier(){

  if(frameCount % 250 === 0){
    flying = createSprite(600,200,20,20);
    flying.scale = 0.95;
    flying.y = Math.round(random(200,280));
    flying.addAnimation("fly", inimigo2Img);
    flying.lifetime = 200;
    flying.velocityX = -(4+2*pontuacao/100);
    grupoFly.add(flying);

    p1.depth = flying.depth
    p1.depth = p1.depth + 1
  }
}
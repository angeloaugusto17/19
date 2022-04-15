//Aula 19; 15/04/2022; Angelo Augusto
//Meu segundo jogo feito sozinho


var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "start";
var score = 0;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");

  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  tower = createSprite(300,600);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,100);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  ghost.setCollider("circle",0,0,120);
  ghost.debug = false;
  ghost.visible = true;

  invisibleBlockGroup = new Group();
  climbersGroup = new Group();
  doorsGroup = new Group();
}

function draw() {
  background(200);
  if(gameState == "start"){

    tower.x = 300;
    tower.y = 600;
    tower.velocityY = 0;

    ghost.x = 300;
    ghost.y = 100;

    ghost.velocityX = 0;
    ghost.velocityY = 0;

    if(keyDown("up_arrow")){
      gameState = "play";
    }
  }
  if(gameState == "play"){

    score = score + Math.round(getFrameRate()/60);

    tower.velocityY = 1;

    if(tower.y > 400){
      tower.y = -10;
     }

    if(keyDown("up_arrow")){
      ghost.velocityY -= 3;                                                                                                                                                   
    }

    if(keyDown("left_arrow")){
      ghost.velocityX -= 1.5;
    }

    if(keyDown("right_arrow")){
      ghost.velocityX += 1.5;
    }

    if(ghost.x < 100){
      ghost.x = 100;
      ghost.velocityX = 0;
    }

    if(ghost.x > 500){
      ghost.x = 500;
      ghost.velocityX = 0;
    }

    if(ghost.y < 30){
      ghost.y = 30;
      ghost.velocityY = 0;
    }

    ghost.velocityY = ghost.velocityY + 0.5;

    
    if(ghost.isTouching(invisibleBlockGroup)){
     gameState = "end";
    }

    if(ghost.y > 550){
      
     gameState = "end";
    }
   
    ghost.collide(climbersGroup);
    if(ghost.isTouching(climbersGroup)){
      velocityX = 0;
      velocityY = 0;
    }
    createDoor();
  }

  else if(gameState == "end"){
    reset();    
  }
  
  drawSprites();

  fill("yellow");
  textSize(20);
  text("PONTUAÇÃO: " + score, 350,30);

  if(gameState == "start"){
  fill("yellow");
  textSize(20);
  text("CLIQUE PARA CIMA, PARA COMEÇAR" ,120,300);
  }
}

function createDoor(){
  if(frameCount %200 == 0 ){
    door = createSprite(random(100,500),-70);
    door.addImage(doorImg);
    door.velocityY = 1;
    door.scale = 1;
    door.lifetime = 800;
    doorsGroup.add(door);

    climber = createSprite(10,-10);
    climber.x = door.x;
    climber.addImage(climberImg);
    climber.velocityY += 1;
    climber.lifetime = 800;
    climbersGroup.add(climber);

    invisibleBlock = createSprite(10,-5,100,5);
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY += 1;
    invisibleBlock.visible = false;
    invisibleBlock.lifetime = 800;
    invisibleBlockGroup.add(invisibleBlock);

    ghost.depth = door.depth;
    ghost.depth += 1;
  }
}

function reset(){
  gameState = "start";

  score = 0;

  climbersGroup.destroyEach();
  invisibleBlockGroup.destroyEach();
  doorsGroup.destroyEach();

  ghost.velocityY = 0;
  ghost.velocityX = 0;

  ghost.y = 100;
  ghost.x = 300;
}
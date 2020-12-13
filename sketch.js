var monkey , monkey_running , monkeyCollide;
var banana ,bananaImage, obstacle, obstacleImage

var FoodGroup, obstacleGroup
var score

var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){

  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving" , monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
 
  invisibleGround = createSprite(497,367,990,5);
  invisibleGround.visible = false;
  
  obstaclesGroup =  new Group();
  bananasGroup = new Group();
  
  score = 0;
  survivalTime = 0;
}


function draw() {
  background("skyblue");
  
 //when you press the space key monkey start jumping   
  if(keyDown("space") && monkey.y>300){
    monkey.velocityY =-20;
  }
   
  // adding gravity
   monkey.velocityY = monkey.velocityY + 0.8;
  
  //making the monkey to collide 
   monkey.collide(ground);
  
  if(ground.x <0){
     ground.x = ground.width/2;
  }
  
  if(monkey.isTouching(bananasGroup)){
    bananasGroup.destroyEach();
    score = score+2;
  }
  
  if(obstaclesGroup.isTouching(monkey)){
     gameState = END;
  }
    
  if(gameState === END){
     ground.velocityX=0;
     monkey.velocityY=0;
  
     obstaclesGroup.setVelocityXEach(0);
     bananasGroup.setVelocityXEach(0);
    
     obstaclesGroup.setLifetimeEach(-1);
     bananasGroup.setLifetimeEach(-1);
    
    
     fill("red")
     stroke("black")
     textSize(30);
     text("GAMEOVER!!!", 100, 170);
    
  }   
  
  spawnBananas();
  spawnObstacles();
  
  if(score%10===0)
    {
      background("yellow");
    }else if(score%5===0)
    {
      background("lightgreen");
    }else if(score%8===0)
    {
      background("pink");
    }
      
  
  fill("black");
  stroke("WHITE");
  textSize(20);
  survialTime = Math.ceil(frameCount/frameRate());
  text("survivalTime: " + survialTime, 100, 50);
  
      
  fill("black");
  stroke("RED");
  textSize(20);
  //score = score + Math.round(getFrameRate()/61);
  text("Score: " + score, 300, 20);
   
  drawSprites();

function spawnObstacles(){
if (frameCount % 80 === 0) {
   
  var obstacle = createSprite(597,328,10,40);
  //obstacle.y = Math.round(random(250,400));
    obstacle.addImage(obstacleImage);
  
  obstacle.scale = 0.13;
  obstacle.velocityX = -8
  fill("red")
  
  //assign lifetime to the variable
  //obstacle.lifetime = 200;
    
  obstaclesGroup.add(obstacle);  
  }
}

function spawnBananas(){
if (frameCount % 40 === 0) {
   
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.15;
    banana.velocityX = -10;
    
  //assign lifetime to the variable
    banana.lifetime = 200;
    
    bananasGroup.add(banana);  
  }

}
}
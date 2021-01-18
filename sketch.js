var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running,ground
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
createCanvas(600, 200);

  monkey = createSprite(50,155,20,50);
  monkey.addAnimation("running", monkey_running)
  

  monkey.scale = 0.12;
  
  ground = createSprite(600,180,1200,20);
  
  
 
  
  invisibleGround = createSprite(300,190,600,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();

  
monkey.setCollider("rectangle",0,0,monkey.width,monkey.height)
monkey.debug = true
  
  score = 0;

  
}


function draw() {
  
  
    background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){

    
    ground.velocityX = -(4 + score/100)
    //scoring
   
    if (monkey.isTouching(FoodGroup)){
        
        score=score+1
        }
    
    
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
          monkey.velocityY=-12
        
    }
    
    //add gravity
  monkey.velocityY=monkey.velocityY + 0.8
    
  
  
    spawnFood();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(monkey)){
       
        gameState = END;
        
      
    }
  }
   else if (gameState === END) {
    
     
     
      ground.velocityX = 0;
      monkey.velocityY = 0
  
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);    
    
   }
  
    //stop trex from falling down
monkey.collide(invisibleGround);
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 85 === 0){
   var obstacle = createSprite(600,150,10,40);
   obstacle.velocityX = -(6 + score/100)
   obstacle.scale=0.1
      
      obstacle.addImage(obstacleImage)
  
         
 }


}

function spawnFood(){
 if (frameCount % 60 === 0){
   var Food = createSprite(600,100,10,40)
   
   Food.y= Math.round(random(50,120));
  Food.velocityX = -(6+score/100)
     Food.addImage(bananaImage)
         Food.scale=0.1
   FoodGroup.add(Food)
 }

}
  
  
  
  


var monkey , monkey_running,monkeystop
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var bg , im 
var invisibleground
var score = 0
var PLAY = 1
var END = 0
var gamestate = PLAY
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkeystop = loadImage("sprite_0.png")
  im = loadImage("1.jpg")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400)
  bg = createSprite(10,250,0,0)
  bg.addImage(im)
  bg.x = bg.width/2
 bg.velocityX = -5
  bg.scale = 1.1
  monkey = createSprite(50,300,20,20)
  monkey.addAnimation("running",monkey_running)
  monkey.addAnimation("stop",monkeystop)
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height)
  monkey.scale = 0.15
  invisibleground = createSprite(50,340,400,5)  
  invisibleground.visible = false
  
  foodGroup = createGroup()
  obstacleGroup = createGroup()
  
}


function draw() {
  background(255)
  if (gamestate === PLAY){
  score = score+ Math.round(getFrameRate()/60)
  
  if (keyDown("space") && monkey.y === 291.45){
    monkey.velocityY = -12
  }
  
  monkey.velocityY = monkey.velocityY + 0.6
  
  
  
  if (bg.x < 0){
    bg.x = bg.width/2
  }
  monkey.collide(invisibleground)

  createbanana()
  createobstacle()
  }
   
  
  if (obstacleGroup.isTouching(monkey)){
    gamestate = END
  }
  
  if (gamestate === END){
    bg.velocityX = 0 
    obstacleGroup.setVelocityXEach (0)          
    foodGroup.setVelocityXEach (0)
    obstacleGroup.setLifetimeEach  (-1)
    foodGroup.setLifetimeEach(-1)
    monkey.changeAnimation("stop",monkeystop) 
    monkey.velocityY = 0 
  }
  
  drawSprites()
  textSize(20)
  fill(255)
  text ("survival time :"+score,150,30,)
}

function createbanana(){
  if (frameCount % 80 === 0){
    var banana = createSprite(400,Math.round(random(120,200),2,2))
   banana.addImage(bananaImage)
    banana.lifetime = 200
    banana.scale = 0.1
    banana.velocityX = -6
    
    foodGroup.add(banana)
  }
}


function createobstacle(){
  if (frameCount % 300 === 0){
    var obstacle = createSprite(400,300,2,2)
    obstacle.addImage(obstacleImage)
    obstacle.velocityX = random(-6,-8)
    obstacle.lifetime = 200
    obstacle.scale = 0.2
    obstacleGroup.add(obstacle)
  
  }
}






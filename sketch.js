var gameState = 3

var background1 , backgroundImage
var player , playerImage , player_dead


var score = 0
var startButton , startButtonImage , overStartButton
var wall1 , wall2
var playerWon = false;


var imposterSeen
var imposterGroup
var imposter1 , imposter2 , imposter3 , imposter4 , imposter5 , imposter6 , imposter7 , imposter8 , imposter9 , imposter10

function preload(){
  
  playerImage = loadImage("Cyan_player.png")
  player_dead = loadImage("deadPlayer.png")
  
  startButtonImage = loadImage("startbutton.png")
  
  imposter1 = loadImage("imposter1.png")
  imposter2 = loadImage("imposter2.png")
  imposter3 = loadImage("imposter3.png")
  imposter4 = loadImage("imposter4.png")
  imposter5 = loadImage("imposter5.png")
  imposter6 = loadImage("imposter6.png")
  imposter7 = loadImage("imposter7.png")
  imposter8 = loadImage("imposter8.png")
  imposter9 = loadImage("imposter9.png")
  imposter10 = loadImage("imposter10.png")
  backgroundImage = loadImage("background.png");
  imposterGroup = new Group()
}

function setup() {
  createCanvas(650, 700);
  
  background1 = createSprite(170, -3900, 10 , 10)
  background1.addImage(backgroundImage)
  background1.scale = 2
  
  player = createSprite(150,600,10,10)
  player.addImage(player_dead)
  player.addImage(playerImage)
  player.setCollider("rectangle",0,0,60,80,0)
  
  wall1 = createSprite(2,200,10,1000)
  wall1.shapeColor = "black"
  wall2 = createSprite(300,200,10,1000)
  wall2.shapeColor = "black"
  
  
  
}

function draw() {
  background("lightblue");
  
  
  
  player.collide(wall1);
  player.collide(wall2);
  
  if(gameState === 3){
    
    textSize(30)
  stroke(30)
  fill("black")
  text("Rules",440,50)
  
  textSize(15)
  text("The people comign from the front",380,100)
  text("are the imposters. Dodge them by moving ",360,120)
  text("left and right with the arrow keys.",380,140)
  text("If they touch you then they will ",380,200)
  text("finish you and the game will get",380,220)
  text("over. So try to stay as far as ",380,240)
  text("possible from the imposters",380,260)
  text("Score will be shown below: ",380,300)
  
    
    startButton = createSprite(480,440,120,50)
    startButton.addImage(startButtonImage)
    startButton.scale = 0.21
    
    if(mousePressedOver(startButton)){
      gameState = 1
      overStartButton= createSprite(440,440,250,120)
      overStartButton.shapeColor = "lightblue"
    }
  }
  
  if(gameState === 1){
    
    
    textSize(30)
    fill("black")
    text("Score: " + score,420,player.y)
    
    if(imposterGroup.isTouching(player)){
      gameState = 2
    }
    
    if( frameCount % 40 === 0){
      score = score + 1
    }
    wall1.y = player.y
    wall2.y = player.y 
    //background1.y = player.y;
    
    player.velocityY = -3
    
    camera.position.y = player.y;
    
    if(keyDown(LEFT_ARROW)){
      player.x = player.x  - 6
    }
    if(keyDown(RIGHT_ARROW)){
      player.x = player.x  + 6
    }
    if(keyDown(UP_ARROW)){
      player.y = player.y  - 6
    }
    if(keyDown(DOWN_ARROW)){
      console.log(player.y);
      console.log(playerWon);
    }
    if(score == 70){
      gameState = 2;
      playerWon = true;
    }
    spawnImposter()
  }
  
  if (gameState === 2){
    //background1.velocityY = 0
    
    player.velocityY = 0
    imposterGroup.setVelocityXEach(0)
    
    if(playerWon == false){
      player.addImage(player_dead)
      player.scale = 0.3

      fill("black")
      textSize(30)
      text("You Died",420,player.y);
    }

    if(playerWon == true){
      fill("black")
      textSize(30)
      text("You Won",420,player.y);
    }
    
  }
  drawSprites()
}

function spawnImposter(){
  if(frameCount % 60 === 0){
    var imposternum = Math.round(random(1,10))
    imposterSeen = createSprite(150,-20,20,20)
    imposterSeen.x = Math.round(random(30,290))
    imposterSeen.y = player.y - 400;
    imposterSeen.velocityY = 4
    imposterSeen.scale = 1.1
    imposterSeen.lifetime = 140
    
    switch(imposternum){
      case 1: imposterSeen.addImage(imposter1);
        break;
      case 2: imposterSeen.addImage(imposter2);
        break;
      case 3: imposterSeen.addImage(imposter3);
        break;
      case 4: imposterSeen.addImage(imposter4);
        break;
      case 5: imposterSeen.addImage(imposter5);
        break;
      case 6: imposterSeen.addImage(imposter6);
        break;
      case 7: imposterSeen.addImage(imposter7);
        break;
      case 8: imposterSeen.addImage(imposter8);
        break;
      case 9: imposterSeen.addImage(imposter9);
        break;
      case 10: imposterSeen.addImage(imposter10);
        break;
    }
    imposterGroup.add(imposterSeen)
    
                                 
  }
}


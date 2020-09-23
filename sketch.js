var ground,groundimage,trex,trexanimation;
var invisibleground;
var cloudimage;
var ob1,ob2,ob3,ob4,ob5,ob6;

var trexcollide;

var obgroup;
var cloudgroup;

var score = 0;

var restart;
var gameover;

var reset;
var over;

//gameState:1 = PLAY, gameState:0 = END;
var gamestate = 1; 

localStorage["highscore"]=0;

var sound1;
var sound2;
var sound3;

function preload(){
groundimage = loadImage("ground2.png")
  trexanimation=loadAnimation("trex1.png","trex3.png","trex4.png")
cloudimage = loadImage("cloud.png")
  ob1 = loadImage("obstacle1.png");
   ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
trexcollide = loadAnimation("trex_collided.png");
  restart = loadImage("restart.png");
  gameover = loadImage("gameOver.png");
  sound1 = loadSound("checkPoint.mp3");
  sound2 = loadSound("die.mp3");
  sound3 = loadSound("jump.mp3");

}

function setup(){
  ground = createSprite(200,270,400,20);
  ground.addImage(groundimage)
  ground.velocityX = -4;
  ground.x = ground.width/2;
  trex = createSprite(50,265,20,20);
  trex.addAnimation("run",trexanimation);
  trex.scale = 0.55;
  createCanvas(600,300);
  invisibleground = createSprite(200,290,400,20);
  invisibleground.visible = false;
  obgroup = new Group();
  cloudgroup = new Group();
  trex.addAnimation("trexcollide",trexcollide);
  reset = createSprite(320,150,30,30);
  reset.addImage(restart);
  reset.scale = 0.7;
  reset.visible = false;
  over = createSprite(320,100,30,30);
  over.addImage(gameover);
  over.scale = 0.7;
  over.visible = false;
  trex.debug = false;
  trex.setCollider("rectangle", 0,0,80,80);
}

function draw(){
  background("white");
  text("Score: "+score,500,50);
  text("Highscore: " +localStorage["highscore"],400,50);
  if(gamestate === 1){
    
    if(keyDown("space")&& trex.y > 244){
     trex.velocityY = -12;
      sound3.play();
      
     }
    
    
    
    score = score+Math.round(getFrameRate()/60); 
    
    if(score%100===0 && score>0) {
      sound1.play();
    }
    
    
    if(ground.x<0){
    ground.x = ground.width/2;
  }
    ground.velocityX = -4;
  trex.velocityY = trex.velocityY+0.8;
    
    spawnclouds();
  spawnob();
    if(obgroup.isTouching(trex)){
      gamestate = 0;
      sound2.play();
    }
  }
  
  else if(gamestate === 0){
  trex.velocityY = 0;
    ground.velocityX = 0;
    
    trex.changeAnimation("trexcollide",trexcollide);
    over.visible = true;
    reset.visible = true;
    obgroup.setVelocityXEach (0);
  cloudgroup.setVelocityXEach(0);
  obgroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    if(mousePressedOver(reset)){
      restart1();
    }
          }
    
  
  trex.collide(invisibleground);
  //console.log(trex.y);
  
  
  
  
  
  drawSprites();
}

function spawnclouds(){
  
  if(frameCount % 60 === 0){
  var cloud = createSprite(600,100,20,20);
    cloud.velocityX = -4;
    cloud.y = Math.round(random(100,200));
    cloud.addImage(cloudimage);
    trex.depth = cloud.depth+1;
    cloud.lifetime = 150;
    cloudgroup.add(cloud);
}
}

function spawnob(){
  if(frameCount % 100 === 0){
    var obstacle = createSprite(600,260,10,20);
    obstacle.velocityX = -4;
    
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(ob1);
        break;
        case 2:obstacle.addImage(ob2);
        break;
        case 3:obstacle.addImage(ob3);
        break;
        case 4:obstacle.addImage(ob4);
        break;
        case 5:obstacle.addImage(ob5);
        break;
        case 6:obstacle.addImage(ob6);
        break;
        default:break;
        
    }
    
    obstacle.scale = 0.37;
    obstacle.lifetime = 150;
    obgroup.add(obstacle);
    
    
  }
  
}

function restart1(){
  obgroup.destroyEach();
  cloudgroup.destroyEach();
  gamestate = 1;
  trex.changeAnimation("run",trexanimation);
  over.visible = false;
  reset.visible = false;
  
  
  if(localStorage["highscore"]<score){
    localStorage["highscore"] = score
  }
  score = 0;
  
}



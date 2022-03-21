var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var score=0;
function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
 // spookySound = loadSound("spooky.wav");
  checkpoint=loadSound("checkpoint.mpeg");
  climbsound=loadSound("climbs.mp3");
  dead=loadSound("dead.mpeg");
  run=loadSound("vaa.mp3");
  start=loadSound("start.mpeg");
}

function setup(){
  createCanvas(10000,600);
  //spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 3;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("a")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("d")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
      
    }
    ghost.velocityY = ghost.velocityY + 0.8
    
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();

    
    //climbersGroup.collide(ghost);
   
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      dead.play();
      gameState = "end"
    }
    score=score+(frameCount%2);
    if(gameState!=="end"){

   
    if(score===5){
     // start.play();
    }
    if(score===600){
      checkpoint.play();
    }
    if(score===160){
      climbsound.play();
    }
    if(score===300){
      run.play();
    }
  }
    drawSprites();
    stroke("yellow");
    fill("yellow");
    textSize(50);
    text("SCORE : "+score,900,500);
    text("SPACE:FOR JUMPING",700,200);
    text("A:FOR MOVING LEFT ",700,300);
    text("D:FOR MOVING RIGHT",700,400);
  }
  
  if (gameState === "end"){
    // ghost = createSprite(200,200,50,50);
    // ghost.scale = 0.3;
    // ghost.addImage("ghost", ghostImg);
   start.stop();
   checkpoint.stop();
   climbsound.stop();
   run.stop();
    drawSprites()
    stroke("yellow");
    fill("yellow");;
    textSize(60);
    text("GAME OVER", 1000,300)
    text("YOUR SCORE IS : "+score, 800,400)
  }

}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 200 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,25);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 3;
    climber.velocityY = 3;
    invisibleBlock.velocityY = 3;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    doorsGroup.add(door);
    //invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}


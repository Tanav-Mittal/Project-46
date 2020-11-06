var canvas
var soldier,soldierAni
var scenery,sceneryImg
var bullet,bulletGroup
var robotGroup
var ufo,ufoImg,ufoGroup

var lives = 5;
var count = 0;
var score = 0;
var firstAid_Img,firstAidGroup
var bulletFromGun_sound,bulletHitsRobot_sound,gameOver_sound,livesIncrease_sound
var soldierHitsRobot_sound,soldierTouchesFirstAid



function preload()
{
  ufoImg = loadImage("images/ufo-1.PNG")
  soldierAni = loadAnimation("images/soldier-1.PNG","images/soldier-2.PNG","images/soldier-3.PNG")
  soldierSit = loadAnimation("images/soldierSitting.png")
  sceneryImg = loadImage("images/war_background.PNG")
  enemy_Ani = loadAnimation("images/enemy1.png","images/enemy2.png","images/enemy3.png","images/enemy4.png","images/enemy5.png")
  firstAid_Img = loadImage("images/first aid.PNG")
  bulletImg = loadImage("images/bullet.png")
  fallenImg = loadImage("images/fallen IMG.png")

  bulletSound = loadSound("sounds/BulletFromGun.mp3")
  robotDieSound = loadSound("sounds/bulletHitsRobot.mp3")
  gameOverSound = loadSound("sounds/gameover.mp3")
  livesSound = loadSound("sounds/livesIncrease.mp3")
  soldierHitSound = loadSound("sounds/soldierHitsRobot.mp3")
  firstAidSound = loadSound("sounds/soldierTouchesFirstAid.mp3");
}
  

function setup()
{
  createCanvas(1200,600);

  scenery = createSprite(600,300)
  scenery.addImage(sceneryImg);
  scenery.scale = 4
  

  soldier = createSprite(100,550,50,50);
  soldier.addAnimation("soldier",soldierAni);
  soldier.addAnimation("soldier",soldierSit);
  soldier.debug = true;
  soldier.setCollider("rectangle",0,0,100,225)
  

  ground = createSprite(600,590,1200,20)

  robotGroup = new Group()
  bulletGroup = new Group()
  firstAidGroup = new Group()
  ufoGroup = new Group();

}

function draw() {
  background(100);
  
  
  console.log(frameCount)
  if(scenery.x <= 0)
  {
    scenery.x = 600;
  }

  scenery.velocityX = -(6 + frameCount/500)
  

  
  if(keyDown("space") && soldier.y >= 467)
  {
    soldier.velocityY = -15
  }

  soldier.velocityY = soldier.velocityY + 0.5;
  soldier.collide(ground)
  
  if(keyWentDown(DOWN_ARROW))
  {
    soldier.changeAnimation(soldierSit)
  }
  if(keyWentUp(RIGHT_ARROW))
  {
    soldier.changeAnimation(soldierAni)
  }
  
  if(keyWentDown(RIGHT_ARROW))
  {
    spawnBullets();
    bulletSound.play();
  }
  
  if(bulletGroup.isTouching(robotGroup))
  {
    robotGroup.destroyEach();
    bulletGroup.destroyEach();
    score += 25
    robotDieSound.play()
  }

  if(bulletGroup.isTouching(ufoGroup))
  {
    ufoGroup.destroyEach();
    bulletGroup.destroyEach();
    score += 50
    robotDieSound.play()
  }

  if(robotGroup.isTouching(soldier))
  {
    lives -= 1
    robotGroup.destroyEach()
    soldierHitSound.play();
  }

  if(ufoGroup.isTouching(soldier))
  {
    lives -= 1
    ufoGroup.destroyEach()
    soldierHitSound.play();
  }

  if(firstAidGroup.isTouching(soldier))
  {
    count += 1
    firstAidGroup.destroyEach()
    firstAidSound.play();
  }

  if(count === 5)
  {
    livesSound.play();
    lives += 1
    count = 0
  }

  /*if(lives = 0)
  {

  }*/

  spawnRobot()
  spawnFirstAid()
  spawnUfo();

  drawSprites();

  textSize(30)
  fill(255)
  text("Lives: " + lives,1000,50)

  text("First Aid: " + count,100,50)
  text("Score: " + score,500,50)
  
}

function spawnUfo()
{
   if(frameCount % 50 === 0)
   {
     var ufo = createSprite(1200,random(120,500))
     ufo.addImage(ufoImg)
     ufo.velocityX = -(6 + frameCount/500)

     ufo.debug = true;
     ufo.setCollider("rectangle",0,0,100,50)

     ufo.lifetime = 400

     ufoGroup.add(ufo)

   }
}


function spawnRobot()
  {
    if(frameCount % 100 === 0)
    {
      var robot = createSprite(1200,500)
      robot.addAnimation("enemy",enemy_Ani)
     // robot.scale = 4
     robot.velocityX = -(6 + frameCount/500)

      robot.debug = true;
      robot.setCollider("rectangle",15,20,75,200)

      robot.lifetime = 400

      robotGroup.add(robot)
      
    }
  }

  function spawnFirstAid()
  {
    if(frameCount % 10 === 0)
    {
      var firstAid = createSprite(1200,random(250,300))
      firstAid.addImage(firstAid_Img)
      firstAid.scale = 0.2

      firstAid.velocityX = -(6 + frameCount/500)

      firstAid.lifetime = 400;

      firstAidGroup.add(firstAid);
    }
  }

  function spawnBullets()
  {
    bullet = createSprite(soldier.x+60,soldier.y-40,20,20)
    bullet.addImage(bulletImg)
    bullet.scale =  0.2
    bullet.velocityX = 5
    bullet.shapeColor = "red"

    bulletGroup.add(bullet)
  }
var PLAY = 1;
var END = 0;
var gameState = PLAY;



var path, pathImg;

var player, playerAnimation, player_collided;



var fire, fireAnimation, fireGroup;

var score = 0;

var ground, ground2;

var gameOver, gameOverImg;

var restart, restartImg;


function preload() {
   pathImg = loadImage("path2.jpg");
   path2Img = loadImage("path2.jpg");

   playerAnimation = loadAnimation("m1.png", "m5.png", "m2.png", "m3.png");
   fireAnimation = loadAnimation("fire.gif");
   player_collided = loadAnimation("m7.png");

   gameOverImg = loadImage("gameOver.png");
   restartImg = loadImage("R.png");

}

function setup() {


   fireGroup = new Group;



   createCanvas(windowWidth, windowHeight);

   path = createSprite(width / 2, height / 2);
   path.addImage(path2Img);

   path.scale = 6;

   //console.log(path.velocityX)

   player = createSprite(width / 3, height / 1.35);
   player.addAnimation("Mario_running", playerAnimation);
   player.scale = 0.8;
   player.setCollider("rectangle", 0, 0, 100, 160);


   //   path2 = createSprite(width/4, height/2);
   //   path2.addImage(path2Img);
   //   path2.scale = 6;
   //   path2.velocityX = -7;

   // if(score > 10){
   //    fire.velocityX = fire.velocityX - 1;
   //    path.velocityX = path.velocityX - 1;
   //   }

   ground = createSprite(width / 2, height - 175, width, 10);
   ground.visible = false;

   ground2 = createSprite(width / 2, height - 470, width, 10);
   ground2.visible = false;

   gameOver = createSprite(width / 2, height / 2 - 150);
   gameOver.addImage(gameOverImg);
   gameOver.scale = 0.5

   restart = createSprite(width / 2, height / 2);
   restart.addImage(restartImg);
   restart.scale = 0.2


}

function draw() {
   background("lightgreen")


   //player.depth = path2.depth + 1;
   player.depth = path.depth + 0.8;





   if (gameState == PLAY) {
      path.velocityX = -9;

      if (frameCount % 5 == 0) {
         score = score + 1;
      }

      if (keyDown("SPACE") && player.y >= height - 280) {
         player.velocityY = player.velocityY - 15;
      }

      player.velocityY = player.velocityY + 0.8;

      if (path.x < 300) {
         path.x = width;
      }

      player.collide(ground);
      player.collide(ground2);

      gameOver.visible = false;
      restart.visible = false;

      spawnFire();

      if (fireGroup.isTouching(player)) {
         gameState = END;
      }

   }

   else if (gameState == END) {
      gameOver.visible = true;
      restart.visible = true;

      path.velocityX = 0;
      player.velocityX = 0;
      fireGroup.setVelocityXEach(0);

      player.collide(ground);
      player.collide(ground2);


      fireGroup.setLifetimeEach(-1);

      if (keyIsDown("82")) {
         reset();
      }


   }



   drawSprites();

   fill("black");
   textSize(25);
   text("Score: " + score, 100, 100);



}

function spawnFire() {

   if (frameCount % 150 == 0) {
      fire = createSprite(width / 1.2, height / 1.35);
      fire.y = Math.round(random(height / 1.35, height / 1.7))
      fire.addAnimation("fire_moving", fireAnimation);
      fire.velocityX = -9;
      fireGroup.add(fire);
      fireGroup.lifetime = width / 6;
      fire.scale = 0.7;
      fire.setCollider('circle', 10, 20, 40)


   }


}


function reset() {
   gameState = PLAY;

   gameOver.visible = false;
   restart.visible = false;

   fireGroup.destroyEach();

   score = 0;
}
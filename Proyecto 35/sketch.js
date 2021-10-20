var balloon,balloonImage1,balloonImage2;
// crea aquí la base de datos y la variable de posición 

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Función para configurar el entorno inicial
function setup() {
  database=firebase.database();
  createCanvas(1300,600);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  textSize(20); 

  var balloonHeight = database.ref("balloon/height");
  balloonHeight.on("value", readHeight, showError);
  var balloonScale = database.ref("balloon/scale/range");
  balloonScale.on("value", readScale, showError);
}
function readHeight(data) {
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}
function readScale(data) {
  scaling = data.val();
  balloon.scale = scaling;
}
function writeProps() {
  database.ref("balloon/scale").set({
    "range":balloon.scale
  })
}
function showError() {
  console.error("Error while updating database");
}
function moveBalloon(x, y) {
  database.ref("balloon/height").set({
    "x": balloon.x + x,
    "y": balloon.y + y
  })
}
// función para mostrar la Interfaz del Usuario (UI por sus siglas en inglés)
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //escribe el código para mover el globo aerostático en dirección hacia la izquierda
    moveBalloon(-15, 0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //escribe el código para mover el globo aerostático en dirección hacia la derecha
    moveBalloon(15, 0);
  }
  if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //escribe el código para mover el globo aerostático en dirección ascendente
    moveBalloon(0, -15);
    if (balloon.scale > 0) {
    balloon.scale = balloon.scale - 0.01;
    }
    writeProps();
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //escribe el código para mover el globo aerostático en dirección descendente
    moveBalloon(0, 15);
    balloon.scale = balloon.scale + 0.01;
    writeProps();
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text(`¡Utiliza las teclas de flecha para mover el globo aerostático!`,40,40);
}

var dogIMG, happyDogIMG;
var dog, happyDog, database, foodS, foodStock;

function preload()
{
	dogIMG = loadImage("images/Dog.png")
  happyDogIMG = loadImage("images/happydog.png")
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,250,10,10);
  dog.addImage(dogIMG);

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}

function draw() {  
  background(46, 139, 87);

  if(keyDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogIMG);
  }
  drawSprites();
  
  textSize(25)
  text("Note : Press UP_ARROW key to feed Drago Milk",250,30);
  fill("white");

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}




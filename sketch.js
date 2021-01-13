var dog, dogImg, happyDogImg, database, foodS, foodStock, x, milkBottleImg;

function preload(){

	dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
  milkBottleImg = loadImage("images/Milk.png");

  }

function setup() {
  console.log("=======1========");
  database = firebase.database();
	createCanvas(500, 500);
  
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  console.log("========2=======");

  dog = createSprite(250, 350, 40, 40);
  dog.addImage("dog", dogImg);
  dog.scale = 0.2;

  console.log("=======3==========")
  
}


function draw() {  
  
  background(131, 207, 91);
  console.log("======3.5=======")

  if(keyDown(UP_ARROW)){
    dog.addImage("dog", happyDogImg);
    console.log("=====4=======")
    writeStock(foodS);
  }

  fill("white");
  stroke("black");
  strokeWeight(1);
  textSize(20);
  text("NOTE: press UP_ARROW to feed drago milk", 50, 60);
  text("milk bottles remaining: "+ foodS, 70, 150);

  drawSprites();

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x <= 0){
    x = 0;
  }else{
    x = x-1;
  }

  database.ref('/').update({
    Food: x
  })

}




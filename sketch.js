var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var feed,addFood;
var lastFed;
var foodObj;
var fedTime;
var fooddy;
var gameState, ReadState;
var bedroom, garden, washroom;
var sadDog;

function preload(){
   dogImg=loadImage("Dog.png");
   dogImg1=loadImage("happydog.png");
   foodObj=new Food();
   bedroom = loadImage("Bed Room.png");
   garden = loadImage("Garden.png");
   washroom = loadImage("Wash Room.png");
   sadDog = loadImage("deadDog.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,400,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('foodCount');
  foodStock.on("value",readStock);
  textSize(20); 

  feed = createButton("Feed the dog");
  feed.position(430,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(650,95);
  addFood.mousePressed(addfoods);

  ReadState = database.ref('gameState');
  ReadState.on("value", function(data){
   gameState = data.val();
  })  
}

// function to display UI
function draw() {
  background(46,139,87);

  foodObj.display();

  fedTime = database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed:" + lastFed%12 + "PM",80,30);
  }
  else if(lastFed==0){
  text("Last Feed: 12AM",80,30);
  }else{
    text("Last Feed" +lastFed+"AM",80,30)
  }
  if(gameState != "Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
  }
  var currentTime = hour();
  if(currentTime == (lastFed+1)){
    update("Playing");
    foodObj.garden();
  }else if(currentTime == (lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastFed+2) && currentTime <= (lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }else{
    update("Hungry")
    foodObj.display();
  }
 
  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,300,30);
  textSize(13);

}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}
//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    foodCount:x
  })
}

function addfoods(){
  foodS++;
  database.ref('/').update({
    foodCount:foodS
  })
  //foodObj.display();
}

function feedDog(){

  
  dog.addImage(dogImg1);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    foodCount:foodObj.getFoodStock(),
    FeedTime:hour()
  })
 // foodObj.display();
}
function update(state){
  database.ref('/').update({
    gameState:state
  })
}
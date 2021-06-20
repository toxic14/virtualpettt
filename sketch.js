var database;
var dog, happyDogImg,feedMeDogImg
var foodS, foodStockReference,fedtime;
var feed,add;
var press=0;

function preload()
{
  happyDogImg = loadImage("happy.png");
  feedMeDogImg = loadImage("waiting.png");
  milk = loadImage("Milk.png")

}

function setup() {
  database = firebase.database();

  createCanvas(500, 500);
  
  dog = createSprite(420,250) ;
  dog.scale = 0.2;
  dog.addImage(feedMeDogImg);
  
  foodStockReference = database.ref('Food');
  foodStockReference.on("value",function(data){foodS=data.val()});

  var lastfedReference = database.ref('lastFed');
  lastfedReference.on("value",function(data){fedtime=data.val()});
}

function draw() {  
  background(46,139,87);
  image(milk,300,250,70,80);

  if(fedtime>=12){
    fill(255);
    text("Last Feed :"+fedtime%12+"PM",350,30);
  }else  if(fedtime==0){
    fill(255);
    text("Last Feed : 12 AM",350,30);
  }else {
    fill(255);
    text("Last Feed :"+fedtime+"AM",350,30);
  }

  var x=10,y=100;

  for (var i=0;i<foodS-1;i++){

   if (i % 8 ===0){
     x=10;
     y+=50;
   }
   image(milk,x,y,50,50);
   x+=30;

  }
  
  feed=createButton("Feed dog");
  feed.position(100,100);

  add=createButton("Add food");
  add.position(200,100);

  add.mousePressed(function(){
  dog.addImage(feedMeDogImg);
  foodS+=1;
  database.ref('/').update({Food:foodS})  
 })

  feed.mousePressed(function(){
    fedtime=hour();
    dog.addImage(happyDogImg);
    foodS-=1;
    database.ref('/').update({Food:foodS}) 
    database.ref('/').update({lastFed:fedtime}) 
 })


  drawSprites();
}

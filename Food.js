var fooddy
class Food{    
    constructor(){
        this.foodStck;
        this.lastFed;
        this.image=loadImage("Milk.png")
    }
    getFoodStock(){
         
     this.foodStck=database.ref("foodCount");
      
       this.foodStck.on("value",function(data){           
        fooddy= data.val()          
        })
     console.log(fooddy)
     return fooddy;
    }
    updateFoodStock(count){
        console.log(count)
        database.ref('/').update({
            foodCount:count
        })
    }
    deductFood(count){
    database.ref('/').update({
    foodCount:count
})
    }
    display(){
        var x = 80,y=100;
        imageMode(CENTER);
      // image(this.image,20,220,70,70);
        fooddy=this.getFoodStock();
        if(fooddy!=0){           
            for(var i=0;i<fooddy;i++){
                if(i%10==0){
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }
    }
    bedroom(){
     background(bedroom, 550, 500);
    }
    garden(){
    background(garden, 550, 500);
    }
    washroom(){
    background(washroom, 550, 500);
    }
}
class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];

        }
    
    play(){
        
        form.hide();

        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
        var x =100;
        var y=200;
        var index =0;
        drawSprites();

        for(var plr in allPlayers){
        
            
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y=500;
            var you = player.index;
            players[index -1].x = x;
            players[index - 1].y = y;

            // Differentiate the main player by printing
            // the name of the player on the basket. 
            textSize(30)
            fill("blue")
            stroke("lightyellow")
            strokeWeight(7)
            text(allPlayers[plr].name,x-40,y+30)


             // Give movements for the players using arrow keys
            if(keyDown(LEFT_ARROW)){
                //x=x-5;
                player.distance+=5
                player.update()
            }
            if(keyDown(RIGHT_ARROW)){
                //x=x+10;
                
                player.distance-=5
                player.update()
            }
            textSize(15)
            fill("lightyellow")
            noStroke()
           text("Score:",100,100);
            text(allPlayers[plr].name+": "+allPlayers[plr].score, 100,100+20*index);

            

            if(index===1){
                
                if(fruitGroup.isTouching(player1)){
                    fruitGroup[0].remove();
                    player.score+=1
                    player.updateScore(player.score)
                    //console.log("1")
                }
            }
            else if(index ===2){
                if(fruitGroup.isTouching(player2)){
                    fruitGroup[0].remove();
                    player.score+=1
                    player.updateScore(player.score)
                    //console.log("2")
                }
            }
         
        }


      

        // Create and spawn fruits randomly
        if(frameCount%60===0){
            var fruit = createSprite(random(10,900),-10,10,10);
            var type = Math.round(random(1,5));
            switch(type){
                case 1: fruit.addImage(fruit1_img); break;
                case 2: fruit.addImage(fruit2_img); break;
                case 3: fruit.addImage(fruit3_img); break;
                case 4: fruit.addImage(fruit4_img); break;
                case 5: fruit.addImage(fruit5_img); break;
            }
            fruit.velocityY=3;
            fruit.lifetime=200;
            fruitGroup.add(fruit)
        }
     /*
        if(fruitGroup.isTouching(player1)){
            allPlayers.player1.score++;
            fruitGroup[0].remove();
            
        }
        if(fruitGroup.isTouching(player2)){
            allPlayers.player2.score++;
            fruitGroup[0].remove();
        }*/

        
    }

    end(){
       console.log("Game Ended");
    }
}
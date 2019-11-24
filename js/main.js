let game = new Phaser.Game(375, 600, Phaser.AUTO);
game.state.add('start', {
  
    create: function(game) {
        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
   
        //  A simple background for our game
        game.add.sprite(0, 0, 'background');
        let logo = game.add.sprite(30, 20, 'logo');
        logo.scale.setTo(0.5, 0.5);
        let btn_play = game.add.sprite(game.world.width/2-70, game.world.height/2, 'play_btn');
        btn_play.scale.setTo(0.5, 0.5);
        console.log(btn_play)

        btn_play.inputEnabled = true;
        btn_play.events.onInputDown.add(listener, this);
        function listener () {
           game.state.start('play');
        }
   },
   
   update: function() {
           // game.state.start('menu');
   }
})


game.state.add('play', {
  preload: function(game) {
    game.load.image('background', 'assets/background.jpg');
    game.load.image('logo', 'assets/donuts_logo.png');
    game.load.image('play_btn', 'assets/btn-play.png');
    game.load.image('gem-01', 'assets/game/gem-01.png');
    game.load.image('gem-02', 'assets/game/gem-02.png');
    game.load.image('gem-03', 'assets/game/gem-03.png');
    game.load.image('gem-04', 'assets/game/gem-04.png');
    game.load.image('gem-05', 'assets/game/gem-05.png');
    game.load.image('gem-06', 'assets/game/gem-06.png');
    game.load.image('gem-07', 'assets/game/gem-07.png');
    game.load.image('gem-08', 'assets/game/gem-08.png');
},
    create: function (game){
          //  A simple background for our game
          game.add.sprite(0, 0, 'background');
          let logo = game.add.sprite(30, 20, 'logo');
          logo.scale.setTo(0.5, 0.5);
          let donuts = game.add.group();
          donuts.enableBody = true;
          let gameArray = [];
          for (let x = 0; x < 6; x++){
            gameArray[x] = []
            for(let y = 0; y < 7; y++){
              let randomImageNameArray = ['gem-01', 'gem-02', 'gem-03', 'gem-04', 'gem-05']
              let donut = game.add.sprite(x * 60, y*60+150, randomImageNameArray[Math.floor(Math.random() * (4 - 0 + 1)) + 0]);
              donut.inputEnabled = true;
              donut.events.onInputDown.add(listener, this);
              donut.scale.setTo(0.7, 0.7);
              gameArray[x][y] = donut;
            }
          }

          let activeDonut = {};
          function listener (donut){
            if(!activeDonut.key){
              console.log("ADD ACTIVE DONUT")
              activeDonut = donut;
            }else{
              let activeDonutX = activeDonut.x/60;
              let activeDonutY = (activeDonut.y - 150)/60;
              let donutx = donut.x/60;
              let donutY = (donut.y - 150)/60;

              if((donutx-activeDonutX)*(donutx-activeDonutX) == 1 && activeDonutY == donutY || (donutY-activeDonutY)*(donutY-activeDonutY) == 1 && activeDonutX == donutx){
                gameArray[donutx][donutY].x = activeDonutX*60
                gameArray[donutx][donutY].y = activeDonutY*60 + 150;
  
                gameArray[activeDonutX][activeDonutY].x = donutx*60
                gameArray[activeDonutX][activeDonutY].y = donutY*60 + 150;
  
                let temp = gameArray[donutx][donutY];
                gameArray[donutx][donutY] = gameArray[activeDonutX][activeDonutY];
                gameArray[activeDonutX][activeDonutY] = temp;
  
                console.log(donutx, activeDonutX, activeDonutY, donutY)
  
                let arrayToRemove = [];
                for(let x = 0; x < gameArray.length; x++){
                  arrayToRemove[x] = [];
                  for (let y = 0; y < gameArray[x].length; y++){
                    arrayToRemove[x][y] = 0;
                  }
                }
                checkHor(arrayToRemove);
                checkVer(arrayToRemove);
                console.log(arrayToRemove)
                let rDelete = deleteMatch(arrayToRemove);
                if(rDelete){
                  setTimeout(function(){
                    console.log("WE DELETE SOME ")
                    fillNewSprite(arrayToRemove);
                  }, 1000)
                }
              }
              console.log("DEWA")
              activeDonut = {};
            }
            console.log(this, donut)
            // donut.scale.setTo(0.90, 0.90);
          }
          function checkGame(){
            // let arrayToRemove = new Array(gameArray.length).fill(new Array(gameArray[0].length).fill(0));
            let arrayToRemove = [];
            for(let x = 0; x < gameArray.length; x++){
              arrayToRemove[x] = [];
              for (let y = 0; y < gameArray[x].length; y++){
                arrayToRemove[x][y] = 0;
              }
            }
            checkHor(arrayToRemove);
            checkVer(arrayToRemove);
            setTimeout(function(){
              let rDelete = deleteMatch(arrayToRemove);
              console.log(rDelete)
              setTimeout(function(){
                if(rDelete){
                  fillNewSprite(arrayToRemove);
                }
              }, 1000)
            }, 0)

            console.log(arrayToRemove);
          }
          function deleteMatch(arrayToRemove){
            let weDeleteSome = false;
            for(let x = 0; x < arrayToRemove.length; x++){
              for (let y = 0; y < arrayToRemove[x].length; y++){
                  if(arrayToRemove[x][y] > 0){
                    gameArray[x][y].kill();
                    gameArray[x][y] = null;
                    arrayToRemove[x][y] = null;
                    weDeleteSome = true;
                  }
              }
            }
            return weDeleteSome;
          }

          
          function fillNewSprite(arrayToRemove){
            for(let x = 0; x < arrayToRemove.length; x++){
              let counterNull = 0;
              for (let y = arrayToRemove[x].length-1; y >= 0; y--){
                if(arrayToRemove[x][y] != null){
                  for(let yReverce = arrayToRemove[x].length-1; yReverce >= y; yReverce--){
                    if(arrayToRemove[x][yReverce] == null){
                      arrayToRemove[x][y] = null;
                      arrayToRemove[x][yReverce] = 0;
                      gameArray[x][y].y = yReverce*60+150;
                      gameArray[x][yReverce] = gameArray[x][y];
                      yReverce = y;
                    }
                  }
                }else{
                  counterNull += 1
                }
              }
              for(let emptyY = counterNull-1; emptyY >= 0; emptyY--){
                  let randomImageNameArray = ['gem-01', 'gem-02', 'gem-03', 'gem-04', 'gem-05']
                  let donut = game.add.sprite(x * 60, 0*60+150, randomImageNameArray[Math.floor(Math.random() * (4 - 0 + 1)) + 0]);
                  donut.scale.setTo(0.6, 0.6);
                  donut.inputEnabled = true;
                  donut.events.onInputDown.add(listener, this);
                  gameArray[x][emptyY] = donut;
                  arrayToRemove[x][emptyY] = 0;
                  gameArray[x][emptyY].y = emptyY*60+150;
              }
            }

            checkGame();
            console.log(arrayToRemove, "arrayToRemove")
          }
          function checkHor(arrayToRemove){
            let lengthY = gameArray[0].length;
            for(let y = 0; y < lengthY; y++){
              let counterMatch = 1;
              for (let x = 0; x < gameArray.length; x++){
                if(counterMatch >= 3){
                  for(let matchRemove = 0; matchRemove < counterMatch; matchRemove++){
                    arrayToRemove[x-matchRemove][y] += 1;
                  }
                }
                if(x+1 < gameArray.length){
                  if(gameArray[x][y].key == gameArray[x+1][y].key ){
                    counterMatch++;
                  }else{
                    counterMatch = 1
                  }
                }
              }
            }
          }
          function checkVer(arrayToRemove){
            for(let x = 0; x < gameArray.length; x++){
              let counterMatch = 1;
              for (let y = 0; y < gameArray[x].length; y++){
                if(counterMatch >= 3){
                  for(let matchRemove = 0; matchRemove < counterMatch; matchRemove++){
                    arrayToRemove[x][y-matchRemove] += 1;
                  }
                }
                if(y+1 < gameArray[x].length){
                  if(gameArray[x][y].key == gameArray[x][y+1].key){
                    counterMatch++;
                  }else{
                    counterMatch = 1;
                  }
                }
              }
            }
          }
          checkGame()
    }
})

game.state.start('play')

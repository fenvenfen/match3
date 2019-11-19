const timeEnemyAnimation = 4000;
class Enemy {
    constructor(option, floor){
        this.floor = floor;
        this.enemy = this.getApiEnemy(option);
        this.enemyTex = this.createEnemy(option, floor, this.enemy);
    }
    getApiEnemy(option){
        var enemyLevel = randomNumber(0, option.enemusMaxPower-1);

      // Temp API 
      var enemysArray = [
            {
            sprite: '../img/level_1.png',
            spead: 100,
            damage: 10,
            attacSpead: 10
            },{
            sprite: '../img/level_2.png',
            spead: 200,
            damage: 20,
            attacSpead: 20
            },{
            sprite: '../img/level_3.png',
            spead: 300,
            damage: 30,
            attacSpead: 30
            }
        ]
    return enemysArray[enemyLevel]

    }
    createEnemy(option, floor, enemy){
  

        let style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 13,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'],
            stroke: '#4a1850',
            strokeThickness: 5,
            wordWrap: true,
            wordWrapWidth: 440
        });
        // BLock with text on the top of people sprite
        let textpeople = new PIXI.Text(("ARR"), style);
        let mainEnemyTex = new PIXI.Container();
        let peopleTex = PIXI.Sprite.from(enemy.sprite);
        textpeople.x = 0;
        textpeople.y = -20;
        mainEnemyTex.addChild(textpeople);
        peopleTex.width = 50;
        peopleTex.height = 40;
        mainEnemyTex.x = 540 + randomNumber(0, 30);
        mainEnemyTex.y = 100 * floor.leverFloor + 50 + randomNumber(0, 20);
        mainEnemyTex.addChild(peopleTex);
        // add people blokc to the conteiner of floor
        floor.floorTex.addChild(mainEnemyTex);

        this.animateEnemi(mainEnemyTex, enemy)

        return mainEnemyTex;
    }
    animateEnemi(mainEnemyTex, enemy){
            var coords = { x: mainEnemyTex.x, y: mainEnemyTex.y};

            var tween = new TWEEN.Tween(coords)
                .to({ x: 200 + randomNumber(10, 20), y: mainEnemyTex.y  }, timeEnemyAnimation - enemy.spead)
                .onUpdate(function () {
                    mainEnemyTex.position.set(coords.x, coords.y);
            })
                .onComplete(() => {
                    this.startAttak()
            })
                .start();
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }
            requestAnimationFrame(animate);
    }
    startAttak(){
        console.log(this)
        let attacSpead = this.enemy.attacSpead + '00';

        let attac = setInterval(() => {
                if(this.floor.blockDoorHP < 0){
                    clearInterval(attac)
                }else{
                    this.floor.blockDoorHP = this.floor.blockDoorHP - this.enemy.damage
                }
                console.log(this.floor.blockDoorHP)
          }, attacSpead);
    }
}
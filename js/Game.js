class Game {
    constructor(app, option){
        this.app = app;
        this.greateFloor(app.stage, option);
    }
    greateFloor(stage, option){
        for(let i = 0; i < option.floorCount; i++){
            var floor = new Floor(i, stage)
            this.greateEnemys(option, floor)
        }
    };
    greateEnemys(option, floor){
        var rand = Number(randomNumber(1, 2) + '000');

        // create and push enemys to the floor 
        // setTimeout(() => {
            var enemy = new Enemy(option, floor);
            // this.greateEnemys(option, floor);
        // }, rand);
    }
}
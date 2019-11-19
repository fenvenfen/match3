const floorSetting = {
    positionStart: 600,
    heightBlockFloor: 100
}
class Floor {
    constructor(leverFloor, stage){
        this.leverFloor = leverFloor;
        this.blockDoorHP = 100;
        this.enemys = [];
        this.floorTex = this.createFloor(stage);
    }
    createFloor(stage){
        //block text to floor number
        var levelFloorText = new PIXI.Text('Level ' + (this.leverFloor) + '');
        var floorTex = new PIXI.Container();
        var height = this.leverFloor * floorSetting.heightBlockFloor + 10;
        levelFloorText.x = floorSetting.positionStart;
        levelFloorText.y = height;
        floorTex.addChild(levelFloorText);
        stage.addChild(floorTex);
        // draw the floor
        var graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0xff00ff, 1);
        graphics.beginFill(0xff00bb, 0.25);
        graphics.drawRoundedRect(200, height, 400, 100, 1);
        graphics.endFill();
        floorTex.addChild(graphics);
        return floorTex;
    }
    
}
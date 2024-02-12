var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,

    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {

    this.load.image('fundo', 'assets/fundoMar.png');
    this.load.image('peixe', 'assets/peixe/tubarao.png');
    }

function create () {

    this.add.image(400, 300, 'fundo');
    tubarao = this.add.image(400, 300, 'peixe');
    tubarao.setFlip(true, false);
    
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

function update () {
    var pixelMove = 10;

    if (keyA.isDown) {
        tubarao.x -= pixelMove;
    } if (keyD.isDown) {
        tubarao.x += pixelMove;
    } if (keyS.isDown) {
        tubarao.y += pixelMove;
    } if (keyW.isDown) {
        tubarao.y -= pixelMove;
    }
}

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
    this.load.image('medico', 'assets/medico.png');
    }

function create () {

    this.add.image(400, 300, 'fundo');
    medico = this.add.image(400, 300, 'medico');
    medico.setFlip(true, false);
    
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

function update () {
    var pixelMove = 10;

    if (keyA.isDown) {
        medico.x -= pixelMove;
    } if (keyD.isDown) {
        medico.x += pixelMove;
    } if (keyS.isDown) {
        medico.y += pixelMove;
    } if (keyW.isDown) {
        medico.y -= pixelMove;
    }
}

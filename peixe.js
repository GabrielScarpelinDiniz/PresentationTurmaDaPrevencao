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

    this.load.image('Mar', 'assets/fundoMar.png');
    this.load.image('bolhas', 'assets/bolhas.png');
    this.load.image('algas', 'assets/Algas.png');
    this.load.image('logo', 'assets/logo-inteli_branco.png');
    this.load.image('peixe', 'assets/peixe/tubarao.png');
    this.load.audio('main_theme', 'assets/audio/musica_de_fundo.mp3');
    }

function create () {

    this.add.image(400, 300, 'Mar');
    this.add.image(120, 500, 'algas') .setScale (0.12);
    this.add.image(400, 75, 'logo') .setScale (0.5);

    tubarao = this.add.image(400, 300, 'peixe');
    bolhas = this.add.image(300, 300, 'bolhas') .setScale (0.2);

    tubarao.setFlip(true, false);
    bolhas.setFlip(true, false);

    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

function update () {
    var pixelMove = 10;

    if (keyA.isDown) {
        tubarao.x -= pixelMove;
        bolhas.x -= pixelMove;
    } if (keyD.isDown) {
        tubarao.x += pixelMove;
        bolhas.x += pixelMove;
    } if (keyS.isDown) {
        tubarao.y += pixelMove;
        bolhas.y += pixelMove;
    } if (keyW.isDown) {
        tubarao.y -= pixelMove;
        bolhas.y -= pixelMove;
    }
}

var config = {
    type: Phaser.AUTO,
    width: 1334,
    height: 724,

    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {

    this.load.image('fundo', 'assets/cenaHospital.png');
    this.load.image('medico', 'assets/medico.png');
    }

function create () {

    this.add.image(667, 362, 'fundo');
    medico = this.add.image(400, 300, 'medico');
    medico.setFlip(true, false);
    
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); // Precisa inicializar as variaveis com var?
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

function update () {
    var pixelMove = 5;

        if (keyA.isDown) {
            medico.x -= pixelMove;
            medico.setFlip(true, false);
        }
        if (keyD.isDown) {
            medico.x += pixelMove;
            medico.setFlip(false, false);
        }   
        if (keyS.isDown) {
            medico.y += pixelMove;
        } 
        if (keyW.isDown) {
            medico.y -= pixelMove;
    }
}

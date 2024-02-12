var config = {
    //configura o tamanho da janela
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
    //essa função faz o pré-carregamento das imagens da tela inicial do jogo
    this.load.image('fundo', 'assets/cenaHospital.png');
    this.load.image('medico', 'assets/medico.png');
    }

function create () {
    //essa função cria elementos no jogo, nesse caso as imagens, a compatibilidade com o teclado 
    this.add.image(667, 362, 'fundo');
    medico = this.add.image(400, 300, 'medico');
    medico.setFlip(true, false);
    

    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); // Precisa inicializar as variaveis com var?
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

function update () {
    //essa função adiciona os movimentos ao jogo, nesse caso, ao médico
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

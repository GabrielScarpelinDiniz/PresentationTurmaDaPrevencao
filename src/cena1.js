var config = {
    //configura o tamanho da janela
    type: Phaser.AUTO,
    width: 1334,
    height: 725,
    scale: {
        mode: Phaser.Scale.FIT, // Ajusta a tela para mobile
    },
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

    // Adiciona um touch a mais
    this.input.addPointer(1);
    }

function update () {
    //essa função adiciona os movimentos ao jogo, nesse caso, ao médico
    var pixelMove = 5;

    // Reposiciona o elemento médico
    if (medico.x > config.width) {
        medico.x = 20;
    }
    if (medico.x < 0) {
        medico.x = config.width - 20;
    }
    if (medico.y > config.height) {
        medico.y = 20;
    }
    if (medico.y < 0) {
        medico.y = config.height - 20;
    }
    // Debug para posição
    // console.log("config.width: "+config.width)
    // console.log("medico.x: "+medico.x)

    // Mapeamento de Inputs
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

    // !!! Altamente Experimental !!!

    //if either touch pointer is down. Two thumbs, two pointers
    if (this.input.pointer1.isDown || this.input.pointer2.isDown) {
        //work out half way point of our game 
        var leftHalf = config.width;
        //if thumb is on the left hand side of the screen we are dealing with horizontal movement
        if (this.input.pointer1.x < leftHalf || this.input.pointer2.x < leftHalf) {
            //reset pointer variable
            var myMovePointer = null;
            //here we get the pointer that is being used on the left hand side of screen. Depends which thumb they touched screen with first.
            if (this.input.pointer1.x < leftHalf && this.input.pointer1.isDown) {
                myMovePointer = this.input.pointer1;
            }
            if (this.input.pointer2.x < leftHalf && this.input.pointer2.isDown) {
                myMovePointer = this.input.pointer2;
            }

            //if we have an active touch pointer on the left hand side of the screen then...
            if (myMovePointer) {
                //if thumb is in the left hand quarter of the screen then go left
                if (Math.floor(myMovePointer.x / (leftHalf / 2)) === 0) {
                    medico.x -= pixelMove;
                }
                //If touch is to the right of the player move them right
                if (Math.floor(myMovePointer.x / (leftHalf / 2)) === 1) {
                    medico.x += pixelMove;
                }
            }
        }
    }
    
}

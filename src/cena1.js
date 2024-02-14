// Cria as configurações para Phaser.Game
var config = {
    type: Phaser.AUTO, // Ajusta o renderizador automaticamente (WebGL e Canvas)
    width: 1334, // Ajusta a largura para 1334 pixels (temporário)
    height: 725, // Altura
    scale: {
        mode: Phaser.Scale.FIT, // Ajusta a tela para mobile
    },
    scene: { // Funções da cena
        preload: preload, // Carrega os assets
        create: create, // Cria os objetos e inicializa algumas configurações
        update: update // Atualiza a lógica do jogo
    }
};

// Cria o jogo passando a variável config como atributos
var game = new Phaser.Game(config);

function preload() {
    // Carregamento de imagens
    this.load.image('fundo', 'assets/cenaHospital.png'); // Fundo da cena do Hospital
    this.load.image('medico', 'assets/medico.png'); // Objeto Medico
    }

function create () {
    this.add.image(667, 362, 'fundo'); // Cria e posiciona o Fundo
    medico = this.add.image(400, 300, 'medico'); // Cria e posiciona o Medico
    medico.setFlip(true, false); // Ajusta a orientação do Medico
    
    // Inicializa as variáveis para movimentação do personagem
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); // Precisa inicializar as variaveis com var?
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); // O código de cada tecla e o modo pelo qual devemos "chamá-la" se encontram na linha 115000 do arquivo "phaser.js"
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    // Adiciona um touch input a mais
    this.input.addPointer(1);
    }

function update () {
    // Ajuste de velocidade do personagem
    const pixelMove = 5;

    // Reposiciona o objeto medico de volta ao mapa (Temporário antes de implementar colisão)
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
        medico.setFlip(true, false); // Ajusta orientação do personagem
    }
    if (keyD.isDown) {
        medico.x += pixelMove;
        medico.setFlip(false, false); // Ajusta orientação do personagem
    }   
    if (keyS.isDown) {
        medico.y += pixelMove;
    } 
    if (keyW.isDown) {
        medico.y -= pixelMove;
    }

    // !!! ALTAMENTE EXPERIMENTAL !!!

    //if either touch pointer is down. Two thumbs, two pointers
    if (this.input.pointer1.isDown || this.input.pointer2.isDown) {
        //work out half way point of our game 
        var divideTela = config.width;
        //if thumb is on the left hand side of the screen we are dealing with horizontal movement
        if (this.input.pointer1.x < divideTela || this.input.pointer2.x < divideTela) {
            //reset pointer variable
            var myMovePointer = null;
            //here we get the pointer that is being used on the left hand side of screen. Depends which thumb they touched screen with first.
            if (this.input.pointer1.x < divideTela && this.input.pointer1.isDown) {
                myMovePointer = this.input.pointer1;
            }
            if (this.input.pointer2.x < divideTela && this.input.pointer2.isDown) {
                myMovePointer = this.input.pointer2;
            }

            //if we have an active touch pointer on the left hand side of the screen then...
            if (myMovePointer) {
                //if thumb is in the left hand quarter of the screen then go left
                if (Math.floor(myMovePointer.x / (divideTela / 2)) === 0) {
                    medico.x -= pixelMove;
                }
                //If touch is to the right of the player move them right
                if (Math.floor(myMovePointer.x / (divideTela / 2)) === 1) {
                    medico.x += pixelMove;
                }
            }
        }
    }
    
}

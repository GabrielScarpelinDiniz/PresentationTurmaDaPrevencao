// Cria as configurações para Phaser.Game
var config = {
    type: Phaser.AUTO,      // Ajusta o renderizador automaticamente (WebGL e Canvas)
    width: 1334,            // Ajusta a largura para 1334 pixels (temporário)
    height: 725,            // Ajusta a altura
    scale: {
        mode: Phaser.Scale.FIT, // Ajusta a tela para mobile
    },
    scene: { // Funções da cena
        preload: preload,   // Carrega os assets
        create: create,     // Cria os objetos e inicializa algumas configurações
        update: update      // Atualiza a lógica do jogo
    }
};

// Cria o jogo passando a variável config como atributos
var game = new Phaser.Game(config);

function preload() {
    // Carregamento de imagens
    this.load.image('cenaHospital', 'assets/cenaHospital.png'); // Fundo da cena do Hospital
    this.load.image('cenaMainMenu', 'assets/cenaMainMenu.png'); // Fundo da cena do Main Menu
    this.load.image('botaoJogar', 'assets/botaoJogar.png');     // Imagem para botaoJogar
    this.load.image('medico', 'assets/medico.png');             // Imagem para medico
    }

function create () {
    // Carrega a cena Main Menu
    mainMenu = this.add.image(667, 362, 'cenaMainMenu').setDepth(2).setScale(1.005);    // setDepth -> Muda profundidade para frente
    botaoJogar = this.add.image(830, 575, 'botaoJogar').setInteractive().setDepth(2);
    
    // Ajuste visual da imagem do mouse para fornecer feedback que o botão jogar é interativo
    botaoJogar.on("pointerover", () => {        // Evento de passar o mouse sobre o botaoJogar
        this.input.setDefaultCursor("pointer"); // Cursor vira mãozinha
    });
    botaoJogar.on("pointerout", () => {         // Evento de retirar o mouse do botaoJogar
        this.input.setDefaultCursor("default"); // Cursor vira setinha
    });

    // Evento disparado ao clicar no botão (Código temporário apenas para demonstração da funcionalidade na sprint 1)
    botaoJogar.on("pointerdown", () => {        // Evento de click do mouse
        mainMenu.destroy();                     // Remoção da imagem mainMenu da tela
        botaoJogar.destroy();                   // Remoção da imagem botaoJogar da tela
        this.input.setDefaultCursor("default"); // Retorno do cursor do mouse para setinha
    });

    
    // Cena Hospital
    this.add.image(667, 362, 'cenaHospital');       // Cria e posiciona o Fundo
    medico = this.add.image(400, 300, 'medico');    // Cria e posiciona o Medico
    medico.setFlip(true, false);                    // Ajusta a orientação do Medico
    
    // Inicializa as variáveis para movimentação do personagem
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); 
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); // O código de cada tecla e o modo pelo qual devemos "chamá-la"
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S); // encontram-se na linha 115000 do arquivo "phaser.js"
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    // Adiciona um touch input a mais (para adaptação mobile de multitouch)
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

    // Mapeamento de Inputs (Normalizar o movimento diagonal futuramente)
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

    // !!! ALTAMENTE EXPERIMENTAL !!! São necessários mais estudo e testes para a correta implementação

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

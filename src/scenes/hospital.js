class CenaHospital extends Phaser.Scene {
  preload() {
    this.load.plugin("rexvirtualjoystickplugin","https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js",true);
    this.load.image("cenaHospital", "assets/cenaHospital.png"); // Fundo da cena do Hospital
    this.load.image("medico", "assets/medico.png"); // Imagem para medico
  }

  create() {
    // Cena Hospital
    this.add.image(667, 362, "cenaHospital"); // Cria e posiciona o Fundo
    medico = this.add.image(400, 300, "medico"); // Cria e posiciona o Medico
    medico.setFlip(true, false); // Ajusta a orientação do Medico

    // Inicializa as variáveis para movimentação do personagem
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); // O código de cada tecla e o modo pelo qual devemos "chamá-la"
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S); // encontram-se na linha 115000 do arquivo "phaser.js"
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    // Adiciona um touch input a mais (para adaptação mobile de multitouch)
    this.input.addPointer(1);
    joystick = this.plugins.get("rexvirtualjoystickplugin").add(
      { preload, create, update },
      {
        x: 200,
        y: gameDimensions.height - 150,
        radius: 100,
        base: this.add.circle(0, 0, 100, 0xff0000),
        thumb: this.add.circle(0, 0, 50, 0xcccccc),
      }
    );
    this.cursorKeys = joystick.createCursorKeys();
  }

  update() {
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
    if (keyA.isDown || this.cursorKeys.left.isDown) {
      medico.x -= pixelMove;
      medico.setFlip(true, false); // Ajusta orientação do personagem
    }
    if (keyD.isDown || this.cursorKeys.right.isDown) {
      medico.x += pixelMove;
      medico.setFlip(false, false); // Ajusta orientação do personagem
    }
    if (keyS.isDown || this.cursorKeys.down.isDown) {
      medico.y += pixelMove;
    }
    if (keyW.isDown || this.cursorKeys.up.isDown) {
      medico.y -= pixelMove;
    }
  }
}
export default CenaHospital
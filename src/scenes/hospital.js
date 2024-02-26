class CenaHospital extends Phaser.Scene {
  constructor() {
    super({
      key: "hospital",
    });
  }
  preload() {
    this.load.plugin(
      "rexvirtualjoystickplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js",
      true
    );
    this.load.image("cenaHospital", "assets/cenaHospital.png"); // Fundo da cena do Hospital
    this.load.image("medico", "assets/medico.png"); // Imagem para medico
  }

  create() {
    // Cena Hospital
    this.add.image(667, 362, "cenaHospital"); // Cria e posiciona o Fundo
    this.medico = this.add.image(400, 300, "medico"); // Cria e posiciona o Medico
    this.medico.setFlip(true, false); // Ajusta a orientação do Medico

    // Inicializa as variáveis para movimentação do personagem
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); // O código de cada tecla e o modo pelo qual devemos "chamá-la"
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S); // encontram-se na linha 115000 do arquivo "phaser.js"
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    // Adiciona um touch input a mais (para adaptação mobile de multitouch)
    this.input.addPointer(1);
    this.joystick = this.plugins.get("rexvirtualjoystickplugin").add(
      CenaHospital,
      {
        x: 200,
        y: gameDimensions.height - 150,
        radius: 100,
        base: this.add.circle(0, 0, 100, 0xff0000),
        thumb: this.add.circle(0, 0, 50, 0xcccccc),
      }
    );
    this.cursorKeys = this.joystick.createCursorKeys();
  }

  update() {
    // Ajuste de velocidade do personagem
    const pixelMove = 5;

    // Reposiciona o objeto medico de volta ao mapa (Temporário antes de implementar colisão)
    /*
    if (this.medico.x > config.width) {
      this.medico.x = 20;
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
    */
    // Debug para posição
    // console.log("config.width: "+config.width)
    // console.log("medico.x: "+medico.x)

    // Mapeamento de Inputs (Normalizar o movimento diagonal futuramente)
    if (this.keyA.isDown || this.cursorKeys.left.isDown) {
      this.medico.x -= pixelMove;
      this.medico.setFlip(true, false); // Ajusta orientação do personagem
    }
    if (this.keyD.isDown || this.cursorKeys.right.isDown) {
      this.medico.x += pixelMove;
      this.medico.setFlip(false, false); // Ajusta orientação do personagem
    }
    if (this.keyS.isDown || this.cursorKeys.down.isDown) {
      this.medico.y += pixelMove;
    }
    if (this.keyW.isDown || this.cursorKeys.up.isDown) {
      this.medico.y -= pixelMove;
    }
  }
}

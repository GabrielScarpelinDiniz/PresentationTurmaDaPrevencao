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
    this.load.image('parede', 'assets/tilemaps/parede.png'); // Paredes do Mapa
    this.load.tilemapTiledJSON('mapa', 'assets/tilemaps/main_map.json'); 
    }

  create() {
    // Cena Hospital
    const map = this.make.tilemap({ key: "mapa", tileWidth: 32, tileHeight: 32});

    const tileset = map.addTilesetImage("parede", 'parede');

    const layer = map.createLayer("Walls", tileset, 0, 0);

    

    const layer2 = map.createLayer("Ground", tileset, 0, 0);



    // this.add.image(667, 362, "cenaHospital"); // Cria e posiciona o Fundo
    
    this.medico = this.physics.add.sprite(1200, 300, "medico"); // Cria e posiciona o Medico
    this.medico.setFlip(true, false).setScale(0.2); // Ajusta a orientação do Medico

    this.physics.add.collider(this.medico,layer)
    layer.setCollisionBetween(20,20)


    this.cameras.main.startFollow(this.medico, true);
    this.cameras.main.setDeadzone(80, 40);
    this.cameras.main.setZoom(0.5);

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
    const pixelMove = 10;

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

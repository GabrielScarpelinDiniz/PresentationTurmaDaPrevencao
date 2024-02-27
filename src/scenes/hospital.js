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
    this.load.image('piso-atendimento', 'assets/tilemaps/piso-atendimento.png'); // Paredes do Mapa
    this.load.image('piso-corredor', 'assets/tilemaps/piso-corredor.png'); // Paredes do Mapa
    this.load.image('piso-madeira', 'assets/tilemaps/piso-madeira.png'); // Paredes do Mapa

    this.load.tilemapTiledJSON('mapa', 'assets/tilemaps/main_map.json'); 
    }

  create() {
    this.cameras.main.fadeIn(6000);
    // Cena Hospital
    this.map = this.make.tilemap({ key: "mapa", tileWidth: 32, tileHeight: 32});
    this.tileset1 = this.map.addTilesetImage('parede');
    this.tileset2 = this.map.addTilesetImage('piso-atendimento');
    this.tileset3 = this.map.addTilesetImage('piso-corredor');
    this.tileset4 = this.map.addTilesetImage('piso-madeira');

    this.groundLayer = this.map.createLayer("Ground", [this.tileset2,this.tileset3,this.tileset4]);
    this.wallsLayer = this.map.createLayer("Walls", [this.tileset1]);

    this.map.setCollisionByExclusion([ 0, 1 ]);

    // Visualize the colliding tiles
    const debugGraphics = this.add.graphics();
    debugGraphics.setScale(2);
    this.map.renderDebug(debugGraphics);

    this.medico = this.physics.add.sprite(1200, 300, "medico"); // Cria e posiciona o Medico
    this.physics.add.existing(this.medico);
    
    this.medico.setFlip(true, false).setScale(0.15); // Ajusta a orientação do Medico

    this.cameras.main.startFollow(this.medico, true);
    // this.cameras.main.setDeadzone(400, 200);
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
    // Colisão de personagem com layer
    this.physics.collide(this.medico, this.wallsLayer);
    
    // Ajuste de velocidade do personagem
    const pixelMove = 5;

    // Mapeamento de Inputs (Normalizar o movimento diagonal futuramente)
    if (this.keyA.isDown || this.cursorKeys.left.isDown) {
      this.medico.x -= pixelMove;
      this.medico.setFlip(false, false); // Ajusta orientação do personagem
    }
    if (this.keyD.isDown || this.cursorKeys.right.isDown) {
      this.medico.x += pixelMove;
      this.medico.setFlip(true, false); // Ajusta orientação do personagem
    }
    if (this.keyS.isDown || this.cursorKeys.down.isDown) {
      this.medico.y += pixelMove;
    }
    if (this.keyW.isDown || this.cursorKeys.up.isDown) {
      this.medico.y -= pixelMove;
    }
  }
}


class CenaHospital extends Phaser.Scene {
  constructor() {
    super({
      key: "hospital",
    });
    this.gameDimensions =  {
      width: 1280,
      height: 740,
    }
  } 
  preload() {
    this.load.plugin(
      "rexvirtualjoystickplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js",
      true
    ); //Carrega a biblioteca do joystick
    this.load.image("cenaHospital", "assets/cenaHospital.png"); // Fundo da cena do Hospital
    this.load.image("medico", "assets/medico.png"); // Imagem para medico

    this.load.image('parede', 'assets/tilemaps/parede.png'); // Paredes do Mapa
    this.load.image('piso-atendimento', 'assets/tilemaps/piso-atendimento.png'); // Piso do mapa
    this.load.image('piso-corredor', 'assets/tilemaps/piso-corredor.png'); // Piso do corredor do Mapa
    this.load.image('piso-madeira', 'assets/tilemaps/piso-madeira.png'); // Piso da biblioteca do Mapa

    this.load.tilemapTiledJSON('mapa', 'assets/tilemaps/main_map.json'); //Carrega o tiled do mapa
    }

  create() {
    // this.cameras.main.fadeIn(6000);
    // Cena Hospital
    this.map = this.make.tilemap({ key: "mapa", tileWidth: 32, tileHeight: 32}); //Cria o mapa colocando o tamanho de cada "azulejo", que no nosso tiled foi 32x32
    this.tileset1 = this.map.addTilesetImage('parede'); //Adiciona no map um tileset e armazena ela
    this.tileset2 = this.map.addTilesetImage('piso-atendimento'); //Adiciona no map um tileset e armazena ela
    this.tileset3 = this.map.addTilesetImage('piso-corredor'); //Adiciona no map um tileset e armazena ela
    this.tileset4 = this.map.addTilesetImage('piso-madeira'); //Adiciona no map um tileset e armazena ela

    this.groundLayer = this.map.createLayer("Ground", [this.tileset2,this.tileset3,this.tileset4]); //Cria a camada do chão, passando o tileset e o nome que definimos no tiled map editor
    this.wallsLayer = this.map.createLayer("Walls", [this.tileset1], 0 , 0); //Cria a camada de paredes, passando o tileset e o nome que definimos no tiled map editor
    this.medico = this.physics.add.sprite(1200, 300, "medico"); // Cria e posiciona o Medico


    this.wallsLayer.setCollisionByProperty({ collider: true }) //Seta as colisões onde tem a propriedade collider: true no tiled map
    this.physics.add.collider(this.medico, this.wallsLayer, () => console.log("Colidiu")) //Adiciona colisão entre o médico e a camada de parede

    this.medico.setFlip(true, false).setScale(0.15); // Ajusta a orientação do Medico
    this.cameras.main.startFollow(this.medico, true); //camera inicia o follow no personagem principal

    // this.cameras.main.setDeadzone(400, 200);
    this.cameras.main.setZoom(2);

    // Inicializa as variáveis para movimentação do personagem
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); // O código de cada tecla e o modo pelo qual devemos "chamá-la"
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S); // encontram-se na linha 115000 do arquivo "phaser.js"
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    // Adiciona um touch input a mais (para adaptação mobile de multitouch)
    this.input.addPointer(1);

    //Cria o joystick na cena do hospital
    this.joystick = this.plugins.get("rexvirtualjoystickplugin").add(
      CenaHospital,
      {
        x: 200,
        y: gameDimensions.height - 150,
        radius: 50,
        base: this.add.circle(0, 0, 50, 0xff0000),
        thumb: this.add.circle(0, 0, 25, 0xcccccc),
      }
    );
    this.cursorKeys = this.joystick.createCursorKeys();
  }
  update() {
    this.joystick.setPosition(this.medico.x, this.medico.y)
    console.log(this.medico.x, this.medico.y)
    // Colisão de personagem com layer

    // Ajuste de velocidade do personagem
    const velocityXY = 100;

    // Mapeamento de Inputs (Normalizar o movimento diagonal futuramente)
    if (this.keyA.isDown || this.cursorKeys.left.isDown) {
      this.medico.setVelocityX(-velocityXY);
      this.medico.setFlip(false, false); // Ajusta orientação do personagem
    }
    else if (this.keyD.isDown || this.cursorKeys.right.isDown) {
      this.medico.setVelocityX(velocityXY);
      this.medico.setFlip(true, false); // Ajusta orientação do personagem
    }
    else {
      this.medico.setVelocityX(0)
    }
    if (this.keyS.isDown || this.cursorKeys.down.isDown) {
      this.medico.setVelocityY(velocityXY)
    }
    else if (this.keyW.isDown || this.cursorKeys.up.isDown) {
      this.medico.setVelocityY(-velocityXY)
    }
    else {
      this.medico.setVelocityY(0);
    }
  }
}

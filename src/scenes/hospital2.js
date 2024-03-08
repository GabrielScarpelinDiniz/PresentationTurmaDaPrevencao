
class CenaHospital extends Phaser.Scene {
  defaultVelocity = 2;
  radiansAngleJoystick = 0;
  joystickForce = 0;
  constructor() {
    super({
      key: "hospital",
    });
    this.gameDimensions =  {
      width: 1280,
      height: 720,
    }
  } 
  preload() {
    this.load.plugin(
      "rexvirtualjoystickplugin",
      "/src/plugins/rexvirtualjoystickplugin.min.js",
      true
    ); //Carrega a biblioteca do joystick
    this.load.image("medico", "assets/medico.png"); // Imagem para medico

    // this.load.image('parede', 'assets/tilemaps/parede.png'); // Paredes do Mapa
    // this.load.image('piso-atendimento', 'assets/tilemaps/piso-atendimento.png'); // Piso do mapa
    // this.load.image('piso-corredor', 'assets/tilemaps/piso-corredor.png'); // Piso do corredor do Mapa
    // this.load.image('piso-madeira', 'assets/tilemaps/piso-madeira.png'); // Piso da biblioteca do Mapa
    
    this.load.image('calcada', 'assets/tilemaps/Calcada.png'); 
    this.load.image('faculdade', 'assets/tilemaps/faculdade.png'); 
    this.load.image('fonte', 'assets/tilemaps/fonte.png'); 
    this.load.image('grama', 'assets/tilemaps/Grass.png'); 
    this.load.image('pedra', 'assets/tilemaps/pedra.png'); 
    this.load.image('portao1', 'assets/tilemaps/portao.png'); 
    this.load.image('portao2', 'assets/tilemaps/portao2.png'); 
    this.load.image('rua', 'assets/tilemaps/rua.png'); 
    this.load.image('tenda', 'assets/tilemaps/tenda.png'); 
    this.load.image('arvore1', 'assets/tilemaps/Tree-Sheet.png'); 
    this.load.image('arvore2', 'assets/tilemaps/Trees_Alt.png'); 

    // this.load.tilemapTiledJSON('mapa', 'assets/tilemaps/main_map.json'); //Carrega o tiled do mapa
    this.load.tilemapTiledJSON('mapa', 'assets/tilemaps/novoMapa.json'); //Carrega o tiled do mapa
    }

  create() {
    // this.cameras.main.fadeIn(6000);
    // Cena Hospital
    this.map = this.make.tilemap({ key: "mapa", tileWidth: 32, tileHeight: 32}); //Cria o mapa colocando o tamanho de cada "azulejo", que no nosso tiled foi 32x32

    // this.tileset1 = this.map.addTilesetImage('parede'); 
    // this.tileset2 = this.map.addTilesetImage('piso-atendimento'); 
    // this.tileset3 = this.map.addTilesetImage('piso-corredor'); 
    // this.tileset4 = this.map.addTilesetImage('piso-madeira'); 

    this.tileset1 = this.map.addTilesetImage('calcada'); 
    this.tileset2 = this.map.addTilesetImage('faculdade'); 
    this.tileset3 = this.map.addTilesetImage('fonte'); 
    this.tileset4 = this.map.addTilesetImage('grama'); 
    this.tileset5 = this.map.addTilesetImage('pedra'); 
    this.tileset6 = this.map.addTilesetImage('portao1'); 
    this.tileset7 = this.map.addTilesetImage('portao2'); 
    this.tileset8 = this.map.addTilesetImage('rua'); 
    this.tileset9 = this.map.addTilesetImage('tenda'); 
    this.tileset10 = this.map.addTilesetImage('arvore1'); 
    this.tileset11 = this.map.addTilesetImage('arvore2'); 
  

    this.chao = this.map.createLayer("Chao", [this.tileset1,this.tileset4,this.tileset5,this.tileset8]); 
    this.arvores = this.map.createLayer("Arvores", [this.tileset10,this.tileset11]); 
    this.faculdade = this.map.createLayer("Faculdade", [this.tileset2]); 
    this.fonte = this.map.createLayer("Fonte", [this.tileset3,this.tileset9]); 
    this.cerca = this.map.createLayer("Cerca", [this.tileset6,this.tileset7]); 

    // this.wallsLayer = this.map.createLayer("Walls", [this.tileset1], 0 , 0);

    this.medico = this.physics.add.sprite(1200, 300, "medico"); 


    this.arvores.setCollisionByProperty({ collider: true }) //Seta as colisões onde tem a propriedade collider: true no tiled map
    this.faculdade.setCollisionByProperty({ collider: true }) //Seta as colisões onde tem a propriedade collider: true no tiled map
    this.fonte.setCollisionByProperty({ collider: true }) //Seta as colisões onde tem a propriedade collider: true no tiled map
    this.cerca.setCollisionByProperty({ collider: true }) //Seta as colisões onde tem a propriedade collider: true no tiled map
    this.physics.add.collider(this.medico, this.arvores, () => console.log("Colidiu")) //Adiciona colisão entre o médico e a camada de parede
    this.physics.add.collider(this.medico, this.faculdade, () => console.log("Colidiu")) //Adiciona colisão entre o médico e a camada de parede
    this.physics.add.collider(this.medico, this.fonte, () => console.log("Colidiu")) //Adiciona colisão entre o médico e a camada de parede
    this.physics.add.collider(this.medico, this.cerca, () => console.log("Colidiu")) //Adiciona colisão entre o médico e a camada de parede

    this.medico.setFlip(true, false).setScale(0.15); // Ajusta a orientação do Medico
    this.cameras.main.startFollow(this.medico, true); //camera inicia o follow no personagem principal

    // this.cameras.main.setDeadzone(400, 200);
    this.cameras.main.setZoom(3);

    // Inicializa as variáveis para movimentação do personagem
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); // O código de cada tecla e o modo pelo qual devemos "chamá-la"
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S); // encontram-se na linha 115000 do arquivo "phaser.js"
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    // Adiciona um touch input a mais (para adaptação mobile de multitouch)
    this.input.addPointer(1);

    //Cria o joystick na cena do hospital
    this.joystick = this.plugins.get("rexvirtualjoystickplugin").add(
      this,
      {
        x: 500,
        y: this.medico.y + 120,
        radius: 30,
        base: this.add.circle(0, 0, 30, 0xff0000),
        thumb: this.add.circle(0, 0, 15, 0xcccccc),
        minForce: 2,
      }
    );
    this.joystick.setScrollFactor(0); // Faz com que o joystick não se mova com a câmera
  }
  update() {
    this.radiansAngleJoystick = this.fixAngle(this.joystick.angle)*Math.PI/180 || 0; // Converte o ângulo do joystick para radianos e normaliza o input para 0 até 360 graus no joystick
    this.joystickForce = this.joystick.force < 75 ? this.joystick.force : 75; // Limita a força do joystick para 75
    const velocityDoctorX = (this.defaultVelocity * Math.cos(this.radiansAngleJoystick) * this.joystickForce) // Calcula a velocidade do médico no eixo X
    velocityDoctorX < 0 ? this.medico.setFlip(false, false) : this.medico.setFlip(true, false) // Ajusta orientação do personagem
    const velocityDoctorY = -(this.defaultVelocity * Math.sin(this.radiansAngleJoystick) * this.joystickForce) // Calcula a velocidade do médico no eixo Y
    this.medico.setVelocityX(velocityDoctorX) // Atribui a velocidade calculada ao médico
    this.medico.setVelocityY(velocityDoctorY) // Atribui a velocidade calculada ao médico
    // Mapeamento de Inputs (Normalizar o movimento diagonal futuramente)
    if (this.keyA.isDown) {
      this.medico.setVelocityX(-this.defaultVelocity * 50);
      this.medico.setFlip(false, false); // Ajusta orientação do personagem   
    }
    else if (this.keyD.isDown) {
      this.medico.setVelocityX(this.defaultVelocity * 50);
      this.medico.setFlip(true, false); // Ajusta orientação do personagem    
    }
    if (this.keyS.isDown) {
      this.medico.setVelocityY(this.defaultVelocity * 50)    
    }
    else if (this.keyW.isDown) {
      this.medico.setVelocityY(-this.defaultVelocity * 50)
    }
  }
  fixAngle(angle) {
    // Corrige o ângulo do joystick para que ele vá de 0 a 360 graus
    if (angle < 0) {
      return -angle
    }
    else if (angle > 0) {
      return 360 - angle
    }
  }
}

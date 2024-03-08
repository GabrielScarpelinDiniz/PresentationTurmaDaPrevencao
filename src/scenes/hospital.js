
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
    this.load.spritesheet("player", "assets/spritesheets/playerPrincipal.png", { frameWidth: 32, frameHeight: 32}); // Imagem para player

    // this.load.image('parede', 'assets/tilemaps/parede.png'); // Paredes do Mapa
    // this.load.image('piso-atendimento', 'assets/tilemaps/piso-atendimento.png'); // Piso do mapa
    // this.load.image('piso-corredor', 'assets/tilemaps/piso-corredor.png'); // Piso do corredor do Mapa
    // this.load.image('piso-madeira', 'assets/tilemaps/piso-madeira.png'); // Piso da biblioteca do Mapa
    
    this.load.spritesheet('tina', 'assets/spritesheets/drTina.png', { frameWidth: 32, frameHeight: 32}); // Piso da biblioteca do Mapa
    this.load.image('case1', 'assets/spritesheets/prontuario1.png'); // Piso da biblioteca do Mapa
    
    this.load.image('Calcada', 'assets/tilemaps/Calcada.png'); 
    this.load.image('faculdade', 'assets/tilemaps/faculdade.png'); 
    this.load.image('fonte', 'assets/tilemaps/fonte.png'); 
    this.load.image('Grass', 'assets/tilemaps/Grass.png'); 
    this.load.image('pedra', 'assets/tilemaps/pedra.png'); 
    this.load.image('portao', 'assets/tilemaps/portao.png'); 
    this.load.image('portao2', 'assets/tilemaps/portao2.png'); 
    this.load.image('rua', 'assets/tilemaps/rua.png'); 
    this.load.image('tenda', 'assets/tilemaps/tenda.png'); 
    this.load.image('Tree-Sheet', 'assets/tilemaps/Tree-Sheet.png'); 
    this.load.image('grade-lateral-left', 'assets/tilemaps/grade-lateral-left.png'); 
    this.load.image('grade-lateral-left-01', 'assets/tilemaps/grade-lateral-left-01.png'); 
    this.load.image('grade-lateral-right', 'assets/tilemaps/grade-lateral-right.png'); 
    this.load.image('grade-lateral-right-01', 'assets/tilemaps/grade-lateral-right-01.png'); 
    // this.load.image('arvore2', 'assets/tilemaps/Trees_Alt.png'); 


    // this.load.tilemapTiledJSON('mapa', 'assets/tilemaps/main_map.json'); //Carrega o tiled do mapa
    this.load.tilemapTiledJSON('mapa', 'assets/tilemaps/novoMapa.json'); //Carrega o tiled do mapa
        
   }

  create() {
    // this.cameras.main.fadeIn(6000);
    // Cena Hospital
    this.map = this.make.tilemap({ key: "mapa", tileWidth: 32, tileHeight: 32}); //Cria o mapa colocando o tamanho de cada "azulejo", que no nosso tiled foi 32x32
    
    // this.tileset1 = this.map.addTilesetImage('parede'); //Adiciona no map um tileset e armazena ela
    // this.tileset2 = this.map.addTilesetImage('piso-atendimento'); //Adiciona no map um tileset e armazena ela
    // this.tileset3 = this.map.addTilesetImage('piso-corredor'); //Adiciona no map um tileset e armazena ela
    // this.tileset4 = this.map.addTilesetImage('piso-madeira'); //Adiciona no map um tileset e armazena ela
    this.tileset1 = this.map.addTilesetImage('Calcada'); 
    this.tileset2 = this.map.addTilesetImage('faculdade'); 
    this.tileset3 = this.map.addTilesetImage('fonte'); 
    this.tileset4 = this.map.addTilesetImage('Grass'); 
    this.tileset5 = this.map.addTilesetImage('pedra'); 
    this.tileset6 = this.map.addTilesetImage('portao'); 
    this.tileset7 = this.map.addTilesetImage('portao2'); 
    this.tileset8 = this.map.addTilesetImage('rua'); 
    this.tileset9 = this.map.addTilesetImage('tenda'); 
    this.tileset10 = this.map.addTilesetImage('Tree-Sheet');
    this.tileset11 = this.map.addTilesetImage('grade-lateral-left');
    this.tileset12 = this.map.addTilesetImage('grade-lateral-left-01');
    this.tileset13 = this.map.addTilesetImage('grade-lateral-right');
    this.tileset14 = this.map.addTilesetImage('grade-lateral-right-01');
    // this.tileset11 = this.map.addTilesetImage('arvore2'); 

    this.chao = this.map.createLayer("Chao", [this.tileset1,this.tileset4,this.tileset5,this.tileset8]); 
    this.arvores = this.map.createLayer("Arvores", [this.tileset10,this.tileset11]); 
    this.faculdade = this.map.createLayer("Faculdade", [this.tileset2]); 
    this.fonte = this.map.createLayer("Fonte", [this.tileset3,this.tileset9, this.tileset11, this.tileset12, this.tileset13, this.tileset14]); 
    this.cerca = this.map.createLayer("Cerca", [this.tileset6,this.tileset7]); 


    // this.groundLayer = this.map.createLayer("Ground", [this.tileset2,this.tileset3,this.tileset4]); //Cria a camada do chão, passando o tileset e o nome que definimos no tiled map editor
    // this.wallsLayer = this.map.createLayer("Walls", [this.tileset1], 0 , 0); //Cria a camada de paredes, passando o tileset e o nome que definimos no tiled map editor
    
    this.player = this.physics.add.sprite(550, 800, "player").setScale(1.5).refreshBody(); // Cria e posiciona o player
    this.add.text(400, 240, "Mova nas teclas WASD ou pelo Joystick", { fontSize: '16px', fill: '#000' }).setScrollFactor(0); // Adiciona um texto na tela
    this.add.text(400, 260, "Procure pela doutora Tina", { fontSize: '16px', fill: '#000' }).setScrollFactor(0); // Adiciona um texto na tela
    // this.wallsLayer.setCollisionByProperty({ collider: true }) //Seta as colisões onde tem a propriedade collider: true no tiled map
    // this.physics.add.collider(this.player, this.wallsLayer, () => console.log("Colidiu")) //Adiciona colisão entre o médico e a camada de parede
    this.arvores.setCollisionByProperty({ collider: true }) //Seta as colisões onde tem a propriedade collider: true no tiled map
    this.faculdade.setCollisionByProperty({ collider: true }) //Seta as colisões onde tem a propriedade collider: true no tiled map
    this.fonte.setCollisionByProperty({ collider: true }) //Seta as colisões onde tem a propriedade collider: true no tiled map
    this.cerca.setCollisionByProperty({ collider: true }) //Seta as colisões onde tem a propriedade collider: true no tiled map
    this.physics.add.collider(this.player, this.arvores, () => console.log("Colidiu")) //Adiciona colisão entre o médico e a camada de parede
    this.physics.add.collider(this.player, this.faculdade, () => console.log("Colidiu")) //Adiciona colisão entre o médico e a camada de parede
    this.physics.add.collider(this.player, this.fonte, () => console.log("Colidiu")) //Adiciona colisão entre o médico e a camada de parede
    this.physics.add.collider(this.player, this.cerca, () => console.log("Colidiu")) //Adiciona colisão entre o médico e a camada de parede
    this.fonteCollider = this.add.ellipse(560, 570, 140, 115,0xFFFF00, 0.5) // Adiciona um círculo na tela
    this.player.body.setSize(this.player.width - 18, this.player.height - 12); // Ajusta o tamanho do hitbox do personagem
    this.player.body.setOffset(9, 12); // Ajusta o offset do hitbox do personagem
    this.cameras.main.startFollow(this.player, true); //camera inicia o follow no personagem principal
    this.cameras.main.setBounds(0, 0, 1120, 1120)
    // this.cameras.main.setDeadzone(400, 200);
    this.cameras.main.setZoom(2.5);

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
        x: 470,
        y: 430,
        radius: 30,
        base: this.add.circle(0, 0, 30, 0xff0000),
        thumb: this.add.circle(0, 0, 15, 0xcccccc),
        minForce: 2,
      }
    );
    this.joystick.setScrollFactor(0); // Faz com que o joystick não se mova com a câmera
    
   
    this.tina = this.physics.add.sprite(550, 400, 'tina').setScale(2).refreshBody().setImmovable();

    this.anims.create({
      key: 'tinaIdle', // Indica que essa animação será usada quando o astronauta se mover para a direita.
      frames: this.anims.generateFrameNumbers('tina', {start: 0, end: 15}), // Define quais frames serão utilizados nessa animação.
      frameRate: 10, // Velocidade da animação em frames por segundo.
      repeat: -1 // Indica um loop.
  });

     this.tina.anims.play('tinaIdle', true); // Indica que o personagem está se movendo para a direita.


     this.anims.create({
      key: 'playerWalkingLeft', // Indica que essa animação será usada quando o astronauta se mover para a direita.
      frames: this.anims.generateFrameNumbers('player', {start: 8, end: 15}), // Define quais frames serão utilizados nessa animação.
      frameRate: 10, // Velocidade da animação em frames por segundo.
      repeat: -1 // Indica um loop.
  });
     this.anims.create({
      key: 'playerWalkingRight', // Indica que essa animação será usada quando o astronauta se mover para a direita.
      frames: this.anims.generateFrameNumbers('player', {start: 0, end: 7}), // Define quais frames serão utilizados nessa animação.
      frameRate: 10, // Velocidade da animação em frames por segundo.
      repeat: -1 // Indica um loop.
  });
  this.anims.create({
    key: 'playerIdle', // Indica que essa animação será usada quando o astronauta se mover para a direita.
    frames: this.anims.generateFrameNumbers('player', {start: 0, end: 0}), // Define quais frames serão utilizados nessa animação.
    frameRate: 10, // Velocidade da animação em frames por segundo.
});


    // this.tina.setCollideWorldBounds(true);
    this.physics.add.overlap(this.player, this.tina, () => {  
      this.add.image(550, 430, 'case1').setScale(0.50);
      console.log('teste');
      });
    
    
    //this.botaoFecharCase.on("pointerdown", () => {
    //this.time.addEvent({ 
    //  delay: 1000, // 1000 ms = 1 segundo
    //  callback: () => {
    //    this.fundoTimer.setVisible(true);
    //    this.textoTempo.setVisible(true);
    //    this.tempoInicial -= 1; // Decrementa o contador
    //    this.textoTempo.setText(this.tempoInicial + 's'); 
    //    if (this.tempoInicial <100) {
    //        this.textoTempo.setPosition(70,80);
    //    }
        
    //    if (this.tempoInicial < 10) {
    //        this.textoTempo.setPosition(77,80);
    //        this.textoTempo.setColor('#ff0000');
    //    }
    //  },
    //  loop: true // Atualiza o texto
    //})
   // })
    this.physics.add.collider(this.player, this.tina); // Adiciona a colisão entre o astronauta e as plataformas.
    // this.physics.add.collider(this.tina, this.wallsLayer)

    this.fundoTimer = this.add.image(100,100, 'azul').setScale(0.3).setVisible(false);
    this.tempoInicial = 15;
    this.textoTempo = this.add.text(55,80, this.tempoInicial + 's', { fontSize: '40px', fill: '#000000'}).setVisible(false);
  }
  update() {
    if (this.joystick.visible) {
      this.radiansAngleJoystick = this.fixAngle(this.joystick.angle)*Math.PI/180 || 0;
      this.joystickForce = this.joystick.force < 50 ? this.joystick.force : 50;
      const velocityDoctorX = (this.defaultVelocity * Math.cos(this.radiansAngleJoystick) * this.joystickForce)
      const velocityDoctorY = -(this.defaultVelocity * Math.sin(this.radiansAngleJoystick) * this.joystickForce)
      if (velocityDoctorX > 0) this.player.anims.play('playerWalkingRight', true);
      else if (velocityDoctorX < 0) this.player.anims.play('playerWalkingLeft', true);
      else if (velocityDoctorY == 0) this.player.anims.play('playerIdle', true); 
      this.player.setVelocityX(velocityDoctorX)
      this.player.setVelocityY(velocityDoctorY)
    }
    // Mapeamento de Inputs (Normalizar o movimento diagonal futuramente)
    if (this.keyA.isDown) {
      this.player.setVelocityX(-this.defaultVelocity * 50);
      this.player.anims.play('playerWalkingLeft', true);
    }
    else if (this.keyD.isDown) {
      this.player.setVelocityX(this.defaultVelocity * 50);
      this.player.anims.play('playerWalkingRight', true);
      this.joystick.setVisible(false);
    }
    else {
      if (!this.joystick.visible) {
        this.player.setVelocityX(0);
      }
    }
    if (this.keyS.isDown) {
      this.player.setVelocityY(this.defaultVelocity * 50)
      this.player.anims.play('playerWalkingLeft', true);
      this.joystick.setVisible(false);
    }
    else if (this.keyW.isDown) {
      this.player.setVelocityY(-this.defaultVelocity * 50)
      this.player.anims.play('playerWalkingRight', true);
      this.joystick.setVisible(false);
    }
    else {
      if (!this.joystick.visible) {
        this.player.setVelocityY(0);
      }
    }

    if (this.keyA.isDown && this.keyW.isDown) {
      this.player.setVelocityX(-this.defaultVelocity * 30);
      this.player.setVelocityY(-this.defaultVelocity * 30);
      this.player.anims.play('playerWalkingLeft', true);
    }
    if (this.keyD.isDown && this.keyW.isDown) {
      this.player.setVelocityX(this.defaultVelocity * 30);
      this.player.setVelocityY(-this.defaultVelocity * 30);
      this.player.anims.play('playerWalkingRight', true);
    }
    if (this.keyA.isDown && this.keyS.isDown) {
      this.player.setVelocityX(-this.defaultVelocity * 30);
      this.player.setVelocityY(this.defaultVelocity * 30);
      this.player.anims.play('playerWalkingLeft', true);
    }
    if (this.keyD.isDown && this.keyS.isDown) {
      this.player.setVelocityX(this.defaultVelocity * 30);
      this.player.setVelocityY(this.defaultVelocity * 30);
      this.player.anims.play('playerWalkingRight', true);
    }


    if (this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0) {
      this.player.anims.play('playerIdle', true);
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




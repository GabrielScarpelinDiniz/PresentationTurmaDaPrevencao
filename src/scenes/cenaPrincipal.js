class CenaPrincipal extends Phaser.Scene {
  defaultVelocity = 3;
  radiansAngleJoystick = 0;
  joystickForce = 0;
  constructor() {
    super({
      key: "cenaPrincipal",
    });
    this.gameDimensions = {
      width: 1280,
      height: 720,
    }
  }
  preload() {

    //Carrega a biblioteca do joystick
    this.load.plugin(
      "rexvirtualjoystickplugin",
      "/src/plugins/rexvirtualjoystickplugin.min.js",
      true
    );

    //Carrega personagem e NPC
    this.load.spritesheet("jogador", "assets/spritesheets/playerPrincipal.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('tina', 'assets/spritesheets/drTina.png', {
      frameWidth: 32,
      frameHeight: 32
    });


    this.load.image('case1', 'assets/spritesheets/prontuario1.png');

    //Carrega elementos principais do mapa
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
    this.load.image('botaoX', 'assets/botaoX.png');

    //Carrega o tiled do mapa
    this.load.tilemapTiledJSON('mapa', 'assets/tilemaps/novoMapa.json');

  }

  create(time) {

    this.map = this.make.tilemap({
      key: "mapa",
      tileWidth: 32,
      tileHeight: 32
    }); //Cria o mapa colocando o tamanho de cada "azulejo", que no nosso tiled foi 32x32

    // Mostra elementos do mapa
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
    this.chao = this.map.createLayer("Chao", [this.tileset1, this.tileset4, this.tileset5, this.tileset8]);
    this.arvores = this.map.createLayer("Arvores", [this.tileset10, this.tileset11]);
    this.faculdade = this.map.createLayer("Faculdade", [this.tileset2]);
    this.fonte = this.map.createLayer("Fonte", [this.tileset3, this.tileset9]);
    this.cerca = this.map.createLayer("Cerca", [this.tileset6, this.tileset7]);

    // Cria e posiciona o player
    this.jogador = this.physics.add.sprite(650, 450, "jogador").setOffset(9, 12).setCircle(7).setScale(1.5).refreshBody();
    // Local exato do final da posição da câmera
    // this.jogador = this.physics.add.sprite(550, 800, "jogador").setOffset(9, 12).setCircle(7).setScale(1.5).refreshBody();


    // Cria colisões com a fonte no mapa
    this.circuloFonte = this.add.circle(560, 570, 70, 0xffffff, 0); //Adiciona círculo sob a fonte
    this.physics.add.existing(this.circuloFonte); //Adiciona física ao círculo adicionado
    this.circuloFonte.body.setCircle(70).setImmovable(); //Define a hitbox do objeto criado como um círculo imóvel
    this.fonte.setCollisionByProperty({
      collider: false
    }) //Seta as colisões onde tem a propriedade collider: true no tiled map
    this.physics.add.collider(this.jogador, this.circuloFonte);


    // Cria colisão com as árvores
    this.arvores.setCollisionByProperty({
      collider: true
    }) //Seta as colisões onde tem a propriedade collider: true no tiled map
    this.physics.add.collider(this.jogador, this.arvores, () => console.log("Colidiu")) //Adiciona colisão entre o médico e a camada de parede


    // Cria colisão com a faculdade
    this.faculdade.setCollisionByProperty({
      collider: true
    }) //Seta as colisões onde tem a propriedade collider: true no tiled map
    this.physics.add.collider(this.jogador, this.faculdade, () => console.log("Colidiu"))


    // Cria colisão com a cerca
    this.cerca.setCollisionByProperty({
      collider: true
    }) //Seta as colisões onde tem a propriedade collider: true no tiled map
    this.physics.add.collider(this.jogador, this.cerca, () => console.log("Colidiu"))


    // Configuração de câmeras para seguir o personagem principal
    this.cameras.main.startFollow(this.jogador, true); //camera inicia o follow no personagem principal
    this.cameras.main.setBounds(0, 0, 1120, 1120)
    this.cameras.main.centerOn(0, 0)
    // this.cameras.main.setDeadzone(400, 200);
    this.cameras.main.setZoom(2.5);


    // Inicializa as variáveis para movimentação do personagem
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); // O código de cada tecla e o modo pelo qual devemos "chamá-la"
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S); // encontram-se na linha 115000 do arquivo "phaser.js"
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.cursors = this.input.keyboard.createCursorKeys(); // Adiciona as setas do teclado


    //Cria o joystick na cena do principal
    this.joystick = this.plugins.get("rexvirtualjoystickplugin").add(
      this, {
        x: 470,
        y: 430,
        radius: 30,
        base: this.add.circle(0, 0, 30, 0xff0000),
        thumb: this.add.circle(0, 0, 15, 0xcccccc),
        minForce: 2,
      }
    );
    this.joystick.setScrollFactor(0); // Faz com que o joystick não se mova com a câmera


    // Configuração do NPC Tina
    this.tina = this.physics.add.sprite(560, 400, 'tina').setOffset(8, 12).setCircle(8).setScale(2).refreshBody().setImmovable(); // Adiciona o sprite da Tina
    this.anims.create({ // Cria a animação para a personagem Tina
      key: 'tinaIdle', // Chave que cria o nome para iniciar a animação
      frames: this.anims.generateFrameNumbers('tina', {
        start: 0,
        end: 15
      }), // Define quais frames serão utilizados nessa animação
      frameRate: 10, // Velocidade da animação em frames por segundo
      repeat: -1 // Indica um loop
    });
    this.tina.anims.play('tinaIdle', true); // Inicia a animação tinaIdle


    // Configurações de animação do personagem principal
    this.anims.create({
      key: 'playerWalkingLeft', // Chave que cria o nome para iniciar a animação
      frames: this.anims.generateFrameNumbers('jogador', {
        start: 8,
        end: 15
      }), // Define quais frames serão utilizados nessa animação
      frameRate: 10, // Velocidade da animação em frames por segundo
      repeat: -1 // Indica um loop
    });
    this.anims.create({
      key: 'playerWalkingRight', // Chave que cria o nome para iniciar a animação
      frames: this.anims.generateFrameNumbers('jogador', {
        start: 0,
        end: 7
      }), // Define quais frames serão utilizados nessa animação
      frameRate: 10, // Velocidade da animação em frames por segundo
      repeat: -1 // Indica um loop
    });
    this.anims.create({
      key: 'playerIdle', // Chave que cria o nome para iniciar a animação
      frames: this.anims.generateFrameNumbers('jogador', {
        start: 0,
        end: 0
      }), // Define quais frames serão utilizados nessa animação
      frameRate: 10, // Velocidade da animação em frames por segundo
    });


    // Reserva as posições de X e Y da câmera
    this.centroX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    this.centroY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

    // Adiciona o case e botão para fechar nas coordenadas específicas tendo como referência centro X e Y
    this.case1 = this.add.image(this.centroX, this.centroY, 'case1').setScale(0.50).setVisible(false).setScrollFactor(0); // Adiciona a imagem do case, quando ocorre esse overlap
    this.botaoX = this.add.sprite(this.case1.x + 75, this.case1.y - 92, 'botaoX').setInteractive().setScale(0.1).setVisible(false).setScrollFactor(0); // Adiciona a imagem do botao, quando ocorre esse overlap

    this.overlapCollider;
    this.overlapTriggered = false;

    this.tinaCollider = this.physics.add.overlap(this.tina, this.jogador, () => { // Cria o overlap entre o jogador principal e a Tina
      console.log('teste'); // Console log para verificar o funcionamento do overlap
      this.physics.pause()
      this.case1.setVisible(true)
      this.botaoX.setVisible(true)

      this.botaoX.on("pointerover", () => {
        // Evento de passar o mouse sobre o botaoJogar
        this.input.setDefaultCursor("pointer") // Cursor vira mãozinha
      });
      this.botaoX.on("pointerout", () => {
        // Evento de retirar o mouse do botaoJogar
        this.input.setDefaultCursor("default") // Cursor vira setinha
      });

      // Evento disparado ao clicar no botão (Código temporário apenas para demonstração da funcionalidade na sprint 1)
      this.botaoX.on("pointerdown", () => {
        this.physics.resume()

        this.case1.setVisible(false);
        this.botaoX.setVisible(false);
        
        //  Dispatch a Scene event
        this.events.emit('showTimer');
        this.events.emit('botaoCase');

      }, this.physics.world.removeCollider(this.tinaCollider));
    });

    this.physics.add.collider(this.jogador, this.tina); // Adiciona a colisão entre o persoangem e a Tina
    // this.physics.add.collider(this.tina, this.wallsLayer)

    this.fundoTimer = this.add.image(100, 100, 'azul').setScale(0.3).setVisible(false); // Adiciona o fundo de imagem do timer
    this.tempoInicial = 1200; // Define o tempo do timer
    this.textoTempo = this.add.text(55, 80, this.tempoInicial + 's', {
      fontSize: '40px',
      fill: '#000000'
    }).setVisible(false); // Adiciona o texto do tempo na tela do jogo

  }

  update() {

    // Configuração Joystick
    if (this.joystick.visible) {
      this.radiansAngleJoystick = this.fixAngle(this.joystick.angle) * Math.PI / 180 || 0;
      this.joystickForce = this.joystick.force < 50 ? this.joystick.force : 50;
      const velocityDoctorX = (this.defaultVelocity * Math.cos(this.radiansAngleJoystick) * this.joystickForce)
      const velocityDoctorY = -(this.defaultVelocity * Math.sin(this.radiansAngleJoystick) * this.joystickForce)
      if (velocityDoctorX > 0) this.jogador.anims.play('playerWalkingRight', true);
      else if (velocityDoctorX < 0) this.jogador.anims.play('playerWalkingLeft', true);
      else if (velocityDoctorY == 0) this.jogador.anims.play('playerIdle', true);
      this.jogador.setVelocityX(velocityDoctorX)
      this.jogador.setVelocityY(velocityDoctorY)
    }


    // Mapeamento de Inputs (Normalizar o movimento diagonal futuramente)
    if (this.keyA.isDown || this.cursors.left.isDown) { // Verifica se a tecla A está pressionada
      this.jogador.setVelocityX(-this.defaultVelocity * 50); // Define a velocidade do personagem no eixo X, quando a condição é verdadeira
      this.jogador.anims.play('playerWalkingLeft', true); // Indica que o personagem está se movendo para a direita. 

    } else if (this.keyD.isDown || this.cursors.right.isDown) { // Verifica se a tecla D está pressionada
      this.jogador.setVelocityX(this.defaultVelocity * 50);
      this.jogador.anims.play('playerWalkingRight', true);
      this.joystick.setVisible(false);
    } else {
      if (!this.joystick.visible) {
        this.jogador.setVelocityX(0);
      }
    }
    if (this.keyS.isDown || this.cursors.down.isDown) { // Verifica se a tecla S está pressionada
      this.jogador.setVelocityY(this.defaultVelocity * 50)
      this.jogador.anims.play('playerWalkingLeft', true); // Indica que o personagem está se movendo para a direita.   
      this.joystick.setVisible(false);
    } else if (this.keyW.isDown || this.cursors.up.isDown) { // Verifica se a tecla W está pressionada
      this.jogador.setVelocityY(-this.defaultVelocity * 50)
      this.jogador.anims.play('playerWalkingRight', true);
      this.joystick.setVisible(false);
    } else {
      if (!this.joystick.visible) {
        this.jogador.setVelocityY(0);
      }
    }
    
    if ((this.keyA.isDown || this.cursors.left.isDown) && (this.keyW.isDown || this.cursors.up.isDown)) {
      this.jogador.setVelocityX(-this.defaultVelocity * 30);
      this.jogador.setVelocityY(-this.defaultVelocity * 30);
      this.jogador.anims.play('playerWalkingLeft', true);
    }
    if ((this.keyD.isDown || this.cursors.right.isDown) && (this.keyW.isDow || this.cursors.up.isDown)) {
      this.jogador.setVelocityX(this.defaultVelocity * 30);
      this.jogador.setVelocityY(-this.defaultVelocity * 30);
      this.jogador.anims.play('playerWalkingRight', true);
    }
    if ((this.keyA.isDown || this.cursors.left.isDown) && (this.keyS.isDown || this.cursors.down.isDown)) {
      this.jogador.setVelocityX(-this.defaultVelocity * 30);
      this.jogador.setVelocityY(this.defaultVelocity * 30);
      this.jogador.anims.play('playerWalkingLeft', true);
    }
    if ((this.keyD.isDown || this.cursors.right.isDown) && (this.keyS.isDown || this.cursors.down.isDown)) {
      this.jogador.setVelocityX(this.defaultVelocity * 30);
      this.jogador.setVelocityY(this.defaultVelocity * 30);
      this.jogador.anims.play('playerWalkingRight', true);
    }
    if (this.jogador.body.velocity.x === 0 && this.jogador.body.velocity.y === 0) {
      this.jogador.anims.play('playerIdle', true);
    }
  }

  fixAngle(angle) {
    // Corrige o ângulo do joystick para que ele vá de 0 a 360 graus
    if (angle < 0) {
      return -angle
    } else if (angle > 0) {
      return 360 - angle
    }
  }

}
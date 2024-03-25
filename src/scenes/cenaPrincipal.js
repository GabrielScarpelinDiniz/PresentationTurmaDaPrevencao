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
    this.load.on('complete', (params) => {
      this.boxBarraDeCarregamento.destroy();
      this.barraCarregamento.destroy();
      this.carregandoTexto.destroy();
    });
    this.load.on('progress', (value) => {
      this.barraCarregamento.width = 780 * value;
    });

    
    //Cria a lógica de carregamento enquanto as assets são carregadas
    this.boxBarraDeCarregamento = this.add.rectangle(240, 600, 800, 100, 0x000000, 0.8).setStrokeStyle(4, 0xFFFFFF).setOrigin(0, 0);
    this.barraCarregamento = this.add.rectangle(250, 610, 0, 80, 0xFFFFFF, 0.8).setOrigin(0, 0);
    this.carregandoTexto = this.add.text(240, 550, 'Carregando...', {
      fontSize: '40px',
      fill: '#FFFFFF'
    }).setOrigin(0, 0);

    //Carrega os assets do jogo


    this.load.audio('musicaIntroducao', 'assets/sounds/IntroMusic.wav') // Música de introdução
    this.load.audio('musicaJogo', 'assets/sounds/gameMusicLoopWithEndGame.mp3') // Música de jogo quando o cronometro está ativo
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

    this.load.json('casesData', 'assets/cases/cases.json');
    this.load.image('case1', 'assets/spritesheets/prontuario1.png');

    //Carrega elementos principais do mapa
    this.load.image('Calcada', 'assets/tilemaps/Calcada.png');
    this.load.image('faculdade', 'assets/tilemaps/faculdade.png');
    this.load.image('fonte', 'assets/tilemaps/fonte.png');
    this.load.image('Grass', 'assets/tilemaps/Grass.png');
    this.load.image('pedra', 'assets/tilemaps/pedra.png');
    this.load.image('portao', 'assets/tilemaps/portao.png');
    this.load.image('portao2', 'assets/tilemaps/portao2.png');
    this.load.image('grade-lateral-left', 'assets/tilemaps/grade-lateral-left.png');
    this.load.image('grade-lateral-right', 'assets/tilemaps/grade-lateral-right.png');
    this.load.image('grade-lateral-right-01', 'assets/tilemaps/grade-lateral-right-01.png');
    this.load.image('grade-lateral-left-01', 'assets/tilemaps/grade-lateral-left-01.png');
    this.load.image('rua', 'assets/tilemaps/rua.png');
    this.load.image('tenda_livro', 'assets/tilemaps/tenda_livro.png');
    this.load.image('tenda_quiz', 'assets/tilemaps/tenda_quiz.png');
    this.load.image('Tree-Sheet', 'assets/tilemaps/Tree-Sheet.png');
    this.load.image('botaoX', 'assets/botaoX.png');
    this.load.image('botaoCase_baixo', 'assets/botaoCase_baixo.png');
    this.load.image('botaoCase_alto', 'assets/botaoCase_alto.png');

    this.load.spritesheet('npc01', 'assets/spritesheets/NPC01.png', {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('npc02', 'assets/spritesheets/NPC02.png', {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('npc03', 'assets/spritesheets/NPC03.png', {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('npc04', 'assets/spritesheets/NPC04.png', {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('npc05', 'assets/spritesheets/NPC05.png', {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('npc06', 'assets/spritesheets/NPC06.png', {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('npc07', 'assets/spritesheets/NPC07.png', {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('npc08', 'assets/spritesheets/NPC08.png', {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('npc09', 'assets/spritesheets/NPC09.png', {
      frameWidth: 32,
      frameHeight: 32
    });



    //Carrega o tiled do mapa
    this.load.tilemapTiledJSON('mapa', 'assets/tilemaps/novoMapa.json');
  }

  create() {
    this.sorteados = [];
    this.indiceSorteado;
    this.primeiroCaso = true;
    this.caseData = this.cache.json.get('casesData');
    this.centroX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    this.centroY = this.cameras.main.worldView.y + this.cameras.main.height / 2; // Reserva as posições de X e Y da câmera
    this.overlapCollider;
    this.objetoCaso = {
      caso: null,
      status: false
    };


    // Adiciona a música de introdução
    this.musicaIntroducao = this.sound.add('musicaIntroducao', {
      loop: true
    }); // Adiciona a música de introdução
    this.musicaJogo = this.sound.add('musicaJogo', {
      loop: false,
      volume: 0.1
    }); // Adiciona a música de jogo
    this.map = this.make.tilemap({
      key: "mapa",
      tileWidth: 32,
      tileHeight: 32
    }); //Cria o mapa colocando o tamanho de cada "azulejo", que no nosso tiled foi 32x32

    // Adiciona os tilesets do mapa
    this.tileset1 = this.map.addTilesetImage('Calcada');
    this.tileset2 = this.map.addTilesetImage('faculdade');
    this.tileset3 = this.map.addTilesetImage('fonte');
    this.tileset4 = this.map.addTilesetImage('Grass');
    this.tileset5 = this.map.addTilesetImage('pedra');
    this.tileset6 = this.map.addTilesetImage('portao');
    this.tileset7 = this.map.addTilesetImage('portao2');
    this.tileset8 = this.map.addTilesetImage('rua');
    this.tileset9 = this.map.addTilesetImage('tenda_livro');
    this.tileset10 = this.map.addTilesetImage('Tree-Sheet');
    this.tileset11 = this.map.addTilesetImage('grade-lateral-left');
    this.tileset12 = this.map.addTilesetImage('grade-lateral-right');
    this.tileset13 = this.map.addTilesetImage('grade-lateral-right-01');
    this.tileset14 = this.map.addTilesetImage('grade-lateral-left-01');
    this.tileset15 = this.map.addTilesetImage('tenda_quiz');


    
    this.chao = this.map.createLayer("Chao", [this.tileset1, this.tileset4, this.tileset5, this.tileset8]);
    this.arvores = this.map.createLayer("Arvores", [this.tileset10, this.tileset11]);
    this.faculdade = this.map.createLayer("Faculdade", [this.tileset2]);
    this.fonte = this.map.createLayer("Fonte", [this.tileset3]);
    this.tendaLivro = this.map.createLayer("TendaLivro", [this.tileset9]);
    this.tendaQuiz = this.map.createLayer("TendaQuiz", [this.tileset15]);

    this.musicaIntroducao.play(); // Inicia a música de introdução

    // define os limites do mundo do jogo,
    this.worldBounds = this.physics.add.staticGroup().add(this.add.rectangle(0, 560, 3, 1120, 0x000000, 0)).add(this.add.rectangle(1120, 560, 3, 1120, 0x000000, 0)).add(this.add.rectangle(560, 0, 1120, 3, 0x000000, 0)).add(this.add.rectangle(560, 885, 1120, 3, 0x000000, 0));
    
    // Cria e posiciona o player
    this.jogador = this.physics.add.sprite(550, 800, "jogador").setOffset(9, 12).setCircle(7).setScale(1.5).refreshBody();
    
    //Cria as outras crianças do mapa, com uma classe especial que com alguns metodos que facilitam a movimentação e colisão entre os outros objetos
    this.npc01 = new NPCsAlunos(this.physics.add.sprite(300, 645, 'npc01').setSize(16, 18, 9, 10).setScale(1.5).refreshBody(), this, "npc01") 
    this.npc02 = new NPCsAlunos(this.physics.add.sprite(360, 645, 'npc02').setSize(16, 18, 9, 10).setScale(1.5).refreshBody(), this, "npc02")
    this.npc03 = new NPCsAlunos(this.physics.add.sprite(420, 645, 'npc03').setSize(16, 18, 9, 10).setScale(1.5).refreshBody(), this, "npc03")
    this.npc04 = new NPCsAlunos(this.physics.add.sprite(480, 645, 'npc04').setSize(16, 18, 9, 10).setScale(1.5).refreshBody(), this, "npc04")
    this.npc05 = new NPCsAlunos(this.physics.add.sprite(540, 645, 'npc05').setSize(16, 18, 9, 10).setScale(1.5).refreshBody(), this, "npc05")
    this.npc06 = new NPCsAlunos(this.physics.add.sprite(600, 645, 'npc06').setSize(16, 18, 9, 10).setScale(1.5).refreshBody(), this, "npc06")
    this.npc07 = new NPCsAlunos(this.physics.add.sprite(660, 645, 'npc07').setSize(16, 18, 9, 10).setScale(1.5).refreshBody(), this, "npc07")
    this.npc08 = new NPCsAlunos(this.physics.add.sprite(720, 645, 'npc08').setSize(16, 18, 9, 10).setScale(1.5).refreshBody(), this, "npc08")
    this.npc09 = new NPCsAlunos(this.physics.add.sprite(780, 645, 'npc09').setSize(16, 18, 9, 10).setScale(1.5).refreshBody(), this, "npc09")

    this.tina = this.physics.add.sprite(560, 400, 'tina').setOffset(8, 12).setCircle(8).setScale(2).refreshBody().setImmovable(); // Adiciona o sprite da Tina
    
    // criando a camada da cerca
    this.cerca = this.map.createLayer("Cerca", [this.tileset6, this.tileset7, this.tileset11, this.tileset12, this.tileset13, this.tileset14]);

    this.case1 = this.add.image(this.centroX, this.centroY, 'case1').setScale(0.50).setVisible(false).setScrollFactor(0); // Adiciona a imagem do case, quando ocorre esse overlap
    this.botaoX = this.add.sprite(this.case1.x + 75, this.case1.y - 92, 'botaoX').setInteractive().setScale(0.1).setVisible(false).setScrollFactor(0); // Adiciona a imagem do botao, quando ocorre esse overlap
    
    
    this.fundoTimer = this.add.image(100, 100, 'azul').setScale(0.3).setVisible(false); // Adiciona o fundo de imagem do timer
    this.tempoInicial = 1200; // Define o tempo do timer
    this.textoTempo = this.add.text(55, 80, this.tempoInicial + 's', {
      fontSize: '40px',
      fill: '#000000'
    }).setVisible(false); // Adiciona o texto do tempo na tela do jogo
    


    // Cria circulo de colisao da fonte no mapa
    this.circuloFonte = this.add.circle(560, 570, 70, 0xffffff, 0); //Adiciona círculo sob a fonte
    this.physics.add.existing(this.circuloFonte); //Adiciona física ao círculo adicionado
    this.circuloFonte.body.setCircle(70).setImmovable(); //Define a hitbox do objeto criado como um círculo imóvel




    // Esse trecho do código cria todas as colisões do jogo
    this.physics.add.collider(this.jogador, this.worldBounds);
    this.fonte.setCollisionByProperty({
      collider: false
    }) //Seta as colisões onde tem a propriedade collider: true no tiled map
    this.physics.add.collider(this.jogador, this.circuloFonte);
    // Cria colisão com os NPCs
    this.npc01.setCollisionBetweenItens(this.worldBounds, this.cerca, this.arvores, this.faculdade, this.tendaLivro, this.tendaQuiz, this.circuloFonte, this.jogador, this.npc02.aluno, this.npc03.aluno, this.npc04.aluno, this.npc05.aluno, this.npc06.aluno, this.npc07.aluno, this.npc08.aluno, this.npc09.aluno);
    this.npc02.setCollisionBetweenItens(this.worldBounds, this.cerca, this.arvores, this.faculdade, this.tendaLivro, this.tendaQuiz, this.circuloFonte, this.jogador, this.npc01.aluno, this.npc03.aluno, this.npc04.aluno, this.npc05.aluno, this.npc06.aluno, this.npc07.aluno, this.npc08.aluno, this.npc09.aluno);
    this.npc03.setCollisionBetweenItens(this.worldBounds, this.cerca, this.arvores, this.faculdade, this.tendaLivro, this.tendaQuiz, this.circuloFonte, this.jogador, this.npc01.aluno, this.npc02.aluno, this.npc04.aluno, this.npc05.aluno, this.npc06.aluno, this.npc07.aluno, this.npc08.aluno, this.npc09.aluno);
    this.npc04.setCollisionBetweenItens(this.worldBounds, this.cerca, this.arvores, this.faculdade, this.tendaLivro, this.tendaQuiz, this.circuloFonte, this.jogador, this.npc01.aluno, this.npc02.aluno, this.npc03.aluno, this.npc05.aluno, this.npc06.aluno, this.npc07.aluno, this.npc08.aluno, this.npc09.aluno);
    this.npc05.setCollisionBetweenItens(this.worldBounds, this.cerca, this.arvores, this.faculdade, this.tendaLivro, this.tendaQuiz, this.circuloFonte, this.jogador, this.npc01.aluno, this.npc02.aluno, this.npc03.aluno, this.npc04.aluno, this.npc06.aluno, this.npc07.aluno, this.npc08.aluno, this.npc09.aluno);
    this.npc06.setCollisionBetweenItens(this.worldBounds, this.cerca, this.arvores, this.faculdade, this.tendaLivro, this.tendaQuiz, this.circuloFonte, this.jogador, this.npc01.aluno, this.npc02.aluno, this.npc03.aluno, this.npc04.aluno, this.npc05.aluno, this.npc07.aluno, this.npc08.aluno, this.npc09.aluno);
    this.npc07.setCollisionBetweenItens(this.worldBounds, this.cerca, this.arvores, this.faculdade, this.tendaLivro, this.tendaQuiz, this.circuloFonte, this.jogador, this.npc01.aluno, this.npc02.aluno, this.npc03.aluno, this.npc04.aluno, this.npc05.aluno, this.npc06.aluno, this.npc08.aluno, this.npc09.aluno);
    this.npc08.setCollisionBetweenItens(this.worldBounds, this.cerca, this.arvores, this.faculdade, this.tendaLivro, this.tendaQuiz, this.circuloFonte, this.jogador, this.npc01.aluno, this.npc02.aluno, this.npc03.aluno, this.npc04.aluno, this.npc05.aluno, this.npc06.aluno, this.npc07.aluno, this.npc09.aluno);
    this.npc09.setCollisionBetweenItens(this.worldBounds, this.cerca, this.arvores, this.faculdade, this.tendaLivro, this.tendaQuiz, this.circuloFonte, this.jogador, this.npc01.aluno, this.npc02.aluno, this.npc03.aluno, this.npc04.aluno, this.npc05.aluno, this.npc06.aluno, this.npc07.aluno, this.npc08.aluno);
    // Cria colisão com as árvores
    this.arvores.setCollisionByProperty({
      collider: true
    }) //Seta as colisões onde tem a propriedade collider: true no tiled map
    this.physics.add.collider(this.jogador, this.arvores, () => console.log("Colidiu")) //Adiciona colisão entre o jogador e as árvores
    //Cria colisão com a tenda
    this.tendaQuiz.setCollisionByProperty({
      collider: true
    }) //Seta as colisões onde tem a propriedade collider: true no tiled map
    this.tendaLivro.setCollisionByProperty({
      collider: true
    }) //Seta as colisões onde tem a propriedade collider: true no tiled map
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
    
    this.tinaCollider = this.physics.add.overlap(this.tina, this.jogador, () => { // Cria o overlap entre o jogador principal e a Tina
      console.log('teste'); // Console log para verificar o funcionamento do overlap
      if (this.objetoCaso.status === false) {
        this.indiceSorteado = this.sortearNumero(0, this.caseData.length - 1);
        this.objetoCaso.caso = this.caseData[this.indiceSorteado];
        this.physics.pause()
        this.events.emit('abrirCase');
        
      }
    });
    
    this.physics.add.collider(this.jogador, this.tina); // Adiciona a colisão entre o persoangem e a Tina
    
    
    this.physics.add.collider(this.jogador, this.tendaLivro, () => {
      console.log("Colidiu com a tenda do livro") //Adiciona colisão entre o jogador e a tenda de livros

      //chama a cena para mostrar os 3 livros
      this.scene.wake('livros');
      // pausa a física do jogo enquanto a cena livros estiver exposta
      this.physics.pause()

    });

    this.physics.add.collider(this.jogador, this.tendaQuiz, () => {
      console.log("Colidiu com a tenda do quiz") //Adiciona colisão entre o jogador e a tenda
      if (this.objetoCaso.status === true){
        //chama a cena para mostrar o quiz
        this.scene.wake('quiz');
        // pausa a física do jogo enquanto a cena do quiz estiver exposta
        this.physics.pause();  // Pausa a física do jogo enquanto o quiz estiver aberto
        this.events.emit('abrirQuiz'); // Emite o evento para abrir o quiz
      }
    });






    // Configuração de animação de câmera ao iniciar o jogo
    // this.physics.pause()
    // // Move a câmera da faculdade para o personagem
    // this.cameras.main.centerOn(550, 200);
    // this.cameras.main.pan(550, 800, 6000);
    // // Evento que ativa ao completar o Pan
    // this.cameras.main.on('camerapancomplete', () => {
    //   // Câmera começa a seguir personagem
       this.cameras.main.startFollow(this.jogador, true);
    //   this.physics.resume()
    // });
    // });
    this.cameras.main.setBounds(0, 0, 1120, 1120)
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


    this.events.on('fecharCase', () => {
          //  Dispatch a Scene event
          if (this.primeiroCaso === true){
            this.events.emit('showTimer');
            this.musicaIntroducao.stop(); // Para a música de introdução
            this.musicaJogo.play(); // Inicia a música de jogo
            this.primeiroCaso = false;
          }
          this.events.emit('botaoCase');
          this.objetoCaso.status = true;
    })
    // this.physics.add.collider(this.tina, this.wallsLayer)

    this.events.emit("mostraTarefaInicial");

  }

  update() {
    //Chama a função que faz os npcs andarem
    this.npc01.update();
    this.npc02.update();
    this.npc03.update();
    this.npc04.update();
    this.npc05.update();
    this.npc06.update();
    this.npc07.update();
    this.npc08.update();
    this.npc09.update();
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



    // Mapeamento de Inputs
    if (this.keyA.isDown || this.cursors.left.isDown) { // Verifica se a tecla A está pressionada
      this.jogador.setVelocityX(-this.defaultVelocity * 50); // Define a velocidade do personagem no eixo X, quando a condição é verdadeira
      this.joystick.setVisible(false); // Esconde o joystick

    } else if (this.keyD.isDown || this.cursors.right.isDown) { // Verifica se a tecla D está pressionada
      this.jogador.setVelocityX(this.defaultVelocity * 50);
      this.joystick.setVisible(false); // Esconde o joystick
    } else {
      if (!this.joystick.visible) {
        this.jogador.setVelocityX(0);
      }
    }
    if (this.keyS.isDown || this.cursors.down.isDown) { // Verifica se a tecla S está pressionada
      this.jogador.setVelocityY(this.defaultVelocity * 50)
      this.joystick.setVisible(false);
    } else if (this.keyW.isDown || this.cursors.up.isDown) { // Verifica se a tecla W está pressionada
      this.jogador.setVelocityY(-this.defaultVelocity * 50)
      this.joystick.setVisible(false);
    } else {
      if (!this.joystick.visible) {
        this.jogador.setVelocityY(0);
      }
    }
    // Movimentação diagonal do personagem, para ele não andar mais rápido que o normal
    if ((this.keyA.isDown || this.cursors.left.isDown) && (this.keyW.isDown || this.cursors.up.isDown)) {
      this.jogador.setVelocityX(-this.defaultVelocity * 30);
      this.jogador.setVelocityY(-this.defaultVelocity * 30);
    }
    if ((this.keyD.isDown || this.cursors.right.isDown) && (this.keyW.isDown || this.cursors.up.isDown)) {
      this.jogador.setVelocityX(this.defaultVelocity * 30);
      this.jogador.setVelocityY(-this.defaultVelocity * 30);
    }
    if ((this.keyA.isDown || this.cursors.left.isDown) && (this.keyS.isDown || this.cursors.down.isDown)) {
      this.jogador.setVelocityX(-this.defaultVelocity * 30);
      this.jogador.setVelocityY(this.defaultVelocity * 30);
    }
    if ((this.keyD.isDown || this.cursors.right.isDown) && (this.keyS.isDown || this.cursors.down.isDown)) {
      this.jogador.setVelocityX(this.defaultVelocity * 30);
      this.jogador.setVelocityY(this.defaultVelocity * 30);
    }


    // Verifica se o jogador está parado e roda animação de idle quando ele está
    if (this.jogador.body.velocity.x === 0 && this.jogador.body.velocity.y === 0) {
      this.jogador.anims.play('playerIdle', true);
    }
    // Verifica se o jogador está se movendo e roda animação de movimento quando ele está, considerando a direção que ele está indo
    if (this.jogador.body.velocity.x > 0) this.jogador.anims.play('playerWalkingRight', true);
    else if (this.jogador.body.velocity.x < 0) this.jogador.anims.play('playerWalkingLeft', true);
    else if (this.jogador.body.velocity.y !== 0 && this.jogador.body.velocity.x === 0) this.jogador.anims.play('playerWalkingRight', true);
  }

  fixAngle(angle) {
    // Corrige o ângulo do joystick para que ele vá de 0 a 360 graus
    if (angle < 0) {
      return -angle
    } else if (angle > 0) {
      return 360 - angle
    }
  }

  sortearNumero(min, max) {
    if (this.sorteados.length === this.caseData.length) {
      return 0
    }
    const numeroSorteado = Phaser.Math.Between(min, max);
    console.log(this.sorteados, numeroSorteado)
    if (this.sorteados.includes(numeroSorteado)){
      return this.sortearNumero(min, max);
    }
    this.sorteados.push(numeroSorteado);
    return numeroSorteado
  }

}
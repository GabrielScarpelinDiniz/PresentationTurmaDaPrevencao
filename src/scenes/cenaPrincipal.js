class CenaPrincipal extends Phaser.Scene {
  defaultVelocity = 3;
  radiansAngleJoystick = 0;
  joystickForce = 0;
  atualDialogoIndice = 0;
  dialogo = [
    `Bom dia, alunos e alunas!
Bem-vindos à Faculdade de Medicina da USP.
Eu sou a dr.ª Tina e serei a instrutora de vocês.
Hoje é um dia muito especial... O Dia da Prevenção!!
Para celebrarmos, vamos fazer uma dinâmica muito divertida com todos os alunos acerca do tema...... QUEIMADURAS!`, 
  //NEW DIALOGUE
  "A dinâmica funciona em ciclos e cada um deles terá 3 passos. O primeiro passo, é ler o case que irei entregar à vocês; o segundo passo é estudar o case na tenda de livros e, por último, vocês irão responder um quiz. A cada resposta certa, vocês ganham pontos, mas cuidado, se errar a pergunta vocês perderão 10 segundos e terão menos pontos para completar os ciclos. O objetivo da brincadeira é realizar o maior número de ciclos do jogo no tempo determinado.", 
  //NEW DIALOGUE
  "Querem uma dica? Leiam com bastante atenção os cases e os livros, as informações deles serão essenciais para vocês ganharem mais pontos! Agora vamos começar! E mais importante: Divirtam-se!"]
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
    // this.load.on('complete', (params) => {
    //   this.boxBarraDeCarregamento.destroy();
    //   this.barraCarregamento.destroy();
    //   this.carregandoTexto.destroy();
    // });
    // this.load.on('progress', (value) => {
    //   this.barraCarregamento.width = 780 * value;
    // });

    this.cameras.main.setBackgroundColor(0xA5E2FF);
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    
    // //Cria a lógica de carregamento enquanto as assets são carregadas
    // this.boxBarraDeCarregamento = this.add.rectangle(240, 600, 800, 100, 0x000000, 0.8).setStrokeStyle(4, 0xFFFFFF).setOrigin(0, 0);
    // this.barraCarregamento = this.add.rectangle(250, 610, 0, 80, 0xFFFFFF, 0.8).setOrigin(0, 0);
    // this.carregandoTexto = this.add.text(240, 550, 'Carregando...', {
    //   fontSize: '40px',
    //   fill: '#FFFFFF'
    // }).setOrigin(0, 0);

    //Carrega os assets do jogo
    this.load.audio('musicaIntroducao', 'assets/sounds/IntroMusic.wav') // Música de introdução
    this.load.audio('musicaJogo', 'assets/sounds/gameMusicLoopWithEndGame.mp3') // Música de jogo quando o cronometro está ativo
    this.load.audio('efeitoSonoroOnibus', 'assets/sounds/efeitoSonoroOnibus.mp3') // SFX do botão iniciar
    //Carrega a biblioteca do joystick
    this.load.plugin(
      "rexvirtualjoystickplugin",
      "./../src/plugins/rexvirtualjoystickplugin.min.js",
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
    this.load.image('terrain', 'assets/tilemaps/terrain.png');
    

    this.load.image('botaoX', 'assets/botaoX.png');
    this.load.image('botaoCase_baixo', 'assets/botaoCase_baixo.png');
    this.load.image('botaoCase_alto', 'assets/botaoCase_alto.png');
    this.load.image('botaoCheck', 'assets/checkBotao.png');
    this.load.image('bandeiraPrevencao', 'assets/bandeiraoPrevencao.png');
    this.load.image('posteInteliDireita', 'assets/poste_inteli_direita.png');
    this.load.image('posteInteliEsquerda', 'assets/poste_inteli_esquerda.png');
    this.load.image('posteUspDireita', 'assets/poste_usp_direita.png');
    this.load.image('posteUspEsquerda', 'assets/poste_usp_esquerda.png');
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
    this.load.image('onibus', "assets/spritesheets/bus.png");
    this.load.image("civic", "assets/spritesheets/civic.png");
    this.load.image("jeep", "assets/spritesheets/jeep.png");
    this.load.image("pickup", "assets/spritesheets/pickup.png");
    this.load.image("police", "assets/spritesheets/police.png");
    this.load.image("suv", "assets/spritesheets/suv.png");
    this.load.image("taxi", "assets/spritesheets/taxi.png");

  }

  create() {
    

    this.stateMachine = new StateMachine('cameraPanParaDialogo');
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

    // Adiciona efeito sonoro do ônibus
    this.efeitoSonoroOnibus = this.sound.add('efeitoSonoroOnibus', {
      loop: true,
      volume: 0.2});

    // Adiciona a música de introdução
    this.musicaIntroducao = this.sound.add('musicaIntroducao', {
      loop: true,
      volume: 0.5
    }); // Adiciona a música de introdução
    this.musicaJogo = this.sound.add('musicaJogo', {
      loop: false,
      volume: 0.3
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
    this.tileset16 = this.map.addTilesetImage('terrain');

    console.log(this.tileset16)
    
    this.chao = this.map.createLayer("Chao", [this.tileset1, this.tileset4, this.tileset5, this.tileset8]);
    this.detalhesChao = this.map.createLayer("DetalhesChao", [this.tileset16]);
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
    this.npc01 = new NPCsAlunos(this.physics.add.sprite(575, 980, 'npc01').setSize(16, 18, 9, 10).setVisible(false).setScale(1.5).refreshBody(), this, "npc01") 
    this.npc02 = new NPCsAlunos(this.physics.add.sprite(575, 980, 'npc02').setSize(16, 18, 9, 10).setVisible(false).setScale(1.5).refreshBody(), this, "npc02")
    this.npc03 = new NPCsAlunos(this.physics.add.sprite(575, 980, 'npc03').setSize(16, 18, 9, 10).setVisible(false).setScale(1.5).refreshBody(), this, "npc03")
    this.npc04 = new NPCsAlunos(this.physics.add.sprite(575, 980, 'npc04').setSize(16, 18, 9, 10).setVisible(false).setScale(1.5).refreshBody(), this, "npc04")
    this.npc05 = new NPCsAlunos(this.physics.add.sprite(575, 980, 'npc05').setSize(16, 18, 9, 10).setVisible(false).setScale(1.5).refreshBody(), this, "npc05")
    this.npc06 = new NPCsAlunos(this.physics.add.sprite(575, 980, 'npc06').setSize(16, 18, 9, 10).setVisible(false).setScale(1.5).refreshBody(), this, "npc06")
    this.npc07 = new NPCsAlunos(this.physics.add.sprite(575, 980, 'npc07').setSize(16, 18, 9, 10).setVisible(false).setScale(1.5).refreshBody(), this, "npc07")
    this.npc08 = new NPCsAlunos(this.physics.add.sprite(575, 980, 'npc08').setSize(16, 18, 9, 10).setVisible(false).setScale(1.5).refreshBody(), this, "npc08")
    this.npc09 = new NPCsAlunos(this.physics.add.sprite(575, 980, 'npc09').setSize(16, 18, 9, 10).setVisible(false).setScale(1.5).refreshBody(), this, "npc09")

    this.tina = this.physics.add.sprite(560, 400, 'tina').setOffset(8, 12).setCircle(8).setScale(2).refreshBody().setImmovable(); // Adiciona o sprite da Tina
    
    this.posteInteliDireita = this.add.image(470, 700, 'posteInteliDireita');
    this.posteInteliEsquerda = this.add.image(650, 700, 'posteInteliEsquerda');
    this.posteUspDireita = this.add.image(330, 490, 'posteUspDireita');
    this.posteUspEsquerda = this.add.image(790, 490, 'posteUspEsquerda');

    // criando a camada da cerca
    this.cerca = this.map.createLayer("Cerca", [this.tileset6, this.tileset7, this.tileset11, this.tileset12, this.tileset13, this.tileset14]);

    this.case1 = this.add.image(this.centroX, this.centroY, 'case1').setScale(0.50).setVisible(false).setScrollFactor(0); // Adiciona a imagem do case, quando ocorre esse overlap
    this.botaoX = this.add.sprite(this.case1.x + 75, this.case1.y - 92, 'botaoX').setInteractive().setScale(0.1).setVisible(false).setScrollFactor(0); // Adiciona a imagem do botao, quando ocorre esse overlap
    this.dialogBox = this.add.rectangle(640, 420, 450, 140, 0xadd8e6, 1).setScrollFactor(0).setOrigin(0.5).setVisible(false).setInteractive(); // Adiciona a caixa de diálogo;
    this.dialogBox.setStrokeStyle(2, 0x1a65ac)
    this.botaoCheck = this.add.image(820, 450, 'botaoCheck').setVisible(false).setScrollFactor(0).setScale(0.6); // Adiciona o botão de check para iniciar o quiz
    
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
    this.onibus = this.physics.add.image(80, 1000, "onibus").setBodySize(150, 70).setOffset(32, 70).refreshBody();
    
    
    
    
    // Esse trecho do código cria todas as colisões do jogo
    this.physics.add.collider(this.jogador, this.worldBounds);
    this.fonte.setCollisionByProperty({
      collider: false
    }) //Seta as colisões onde tem a propriedade collider: true no tiled map
    this.physics.add.collider(this.jogador, this.circuloFonte);
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
      if (this.objetoCaso.status === true){
        //chama a cena para mostrar os 3 livros
        this.joystick.toggleEnable();
        this.joystick.toggleEnable();
        this.scene.wake('livros');
        // pausa a física do jogo enquanto a cena livros estiver exposta
        this.physics.pause()
      }
      
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
    
    
    
    //Configuração de animação de câmera ao iniciar o jogo
    this.physics.pause()
    // Move a câmera da faculdade para o personagem
    this.cameras.main.centerOn(550, -250);
    
    const dialogoCompleto = () => {
      this.dialogBox.off('pointerdown', dialogoCompleto)
      this.atualDialogoIndice++
      console.log(this.atualDialogoIndice, this.dialogo.length)
      if (this.atualDialogoIndice === 1){
        this.dialogBox.destroy();
        this.dialogText.destroy();
        this.botaoCheck.destroy();
        this.cameras.main.setBounds(0, 0, 1120, 1120);
        this.cameras.main.pan(50, 1120, 2000);
        
        this.stateMachine.transitionTo('cameraPanOnibus');
        return;
      }
      this.dialogText.on('pointerdown', () => { this.dialogText.skip()})
      this.dialogText.proximoTexto(this.dialogo[this.atualDialogoIndice], () => this.dialogBox.on('pointerdown', dialogoCompleto))
    }
    this.cameras.main.pan(550, 470, 5000)
    this.cameras.main.on('camerapancomplete', () => {
      if (this.stateMachine.currentState() === 'cameraPanParaDialogo') {
        this.botaoCheck.setVisible(true);
        this.dialogBox.setVisible(true);
        this.dialogText = new TypeWritter(this, 420, 353, 'iosevka', this.dialogo[this.atualDialogoIndice], 16, 20, () => {
          this.dialogText.off('pointerdown')
          this.dialogBox.on('pointerdown', dialogoCompleto)
          this.botaoCheck.on('pointerdown', dialogoCompleto)
        }).setMaxWidth(380).setScrollFactor(0).setInteractive().on('pointerdown', () => { this.dialogText.skip()});
      }
      
      else if (this.stateMachine.currentState() === 'cameraPanOnibus'){
        this.physics.resume();
        this.cameras.main.startFollow(this.onibus, true);
        this.onibus.setVelocityX(100);
        this.efeitoSonoroOnibus.play();
      }
      else if (this.stateMachine.currentState() === 'entradaDosPersonagens') {
        this.efeitoSonoroOnibus.stop();
        this.cerca.setVisible(false);
        this.npcControll = 1;
        this.timer = this.time.addEvent({
          delay: 1000,
          callback: () => {
            if (this.npcControll <= 9){
              this[`npc0${this.npcControll}`].aluno.setVisible(true);
              this[`npc0${this.npcControll}`].aluno.setVelocity(0.01, -50)
              this.npcControll++;
            }
            if (this.npcControll === 10){
              if (this[`npc0${this.npcControll - 1}`].aluno.y <= 700){
                console.log('teste')
                this[`npc0${1}`].aluno.setPosition(250, 700);
                this[`npc0${2}`].aluno.setPosition(300, 700);
                this[`npc0${3}`].aluno.setPosition(350, 700);
                this[`npc0${4}`].aluno.setPosition(400, 700);
                this[`npc0${5}`].aluno.setPosition(450, 700);
                this[`npc0${6}`].aluno.setPosition(500, 700);
                this[`npc0${7}`].aluno.setPosition(550, 700);
                this[`npc0${8}`].aluno.setPosition(600, 700);
                this[`npc0${9}`].aluno.setPosition(650, 700);
                this.npc01.setCollisionBetweenItens(this.worldBounds, this.cerca, this.arvores, this.faculdade, this.tendaLivro, this.tendaQuiz, this.circuloFonte, this.jogador, this.npc02.aluno, this.npc03.aluno, this.npc04.aluno, this.npc05.aluno, this.npc06.aluno, this.npc07.aluno, this.npc08.aluno, this.npc09.aluno);
                this.npc02.setCollisionBetweenItens(this.worldBounds, this.cerca, this.arvores, this.faculdade, this.tendaLivro, this.tendaQuiz, this.circuloFonte, this.jogador, this.npc01.aluno, this.npc03.aluno, this.npc04.aluno, this.npc05.aluno, this.npc06.aluno, this.npc07.aluno, this.npc08.aluno, this.npc09.aluno);
                this.npc03.setCollisionBetweenItens(this.worldBounds, this.cerca, this.arvores, this.faculdade, this.tendaLivro, this.tendaQuiz, this.circuloFonte, this.jogador, this.npc01.aluno, this.npc02.aluno, this.npc04.aluno, this.npc05.aluno, this.npc06.aluno, this.npc07.aluno, this.npc08.aluno, this.npc09.aluno);
                this.npc04.setCollisionBetweenItens(this.worldBounds, this.cerca, this.arvores, this.faculdade, this.tendaLivro, this.tendaQuiz, this.circuloFonte, this.jogador, this.npc01.aluno, this.npc02.aluno, this.npc03.aluno, this.npc05.aluno, this.npc06.aluno, this.npc07.aluno, this.npc08.aluno, this.npc09.aluno);
                this.npc05.setCollisionBetweenItens(this.worldBounds, this.cerca, this.arvores, this.faculdade, this.tendaLivro, this.tendaQuiz, this.circuloFonte, this.jogador, this.npc01.aluno, this.npc02.aluno, this.npc03.aluno, this.npc04.aluno, this.npc06.aluno, this.npc07.aluno, this.npc08.aluno, this.npc09.aluno);
                this.npc06.setCollisionBetweenItens(this.worldBounds, this.cerca, this.arvores, this.faculdade, this.tendaLivro, this.tendaQuiz, this.circuloFonte, this.jogador, this.npc01.aluno, this.npc02.aluno, this.npc03.aluno, this.npc04.aluno, this.npc05.aluno, this.npc07.aluno, this.npc08.aluno, this.npc09.aluno);
                this.npc07.setCollisionBetweenItens(this.worldBounds, this.cerca, this.arvores, this.faculdade, this.tendaLivro, this.tendaQuiz, this.circuloFonte, this.jogador, this.npc01.aluno, this.npc02.aluno, this.npc03.aluno, this.npc04.aluno, this.npc05.aluno, this.npc06.aluno, this.npc08.aluno, this.npc09.aluno);
                this.npc08.setCollisionBetweenItens(this.worldBounds, this.cerca, this.arvores, this.faculdade, this.tendaLivro, this.tendaQuiz, this.circuloFonte, this.jogador, this.npc01.aluno, this.npc02.aluno, this.npc03.aluno, this.npc04.aluno, this.npc05.aluno, this.npc06.aluno, this.npc07.aluno, this.npc09.aluno);
                this.npc09.setCollisionBetweenItens(this.worldBounds, this.cerca, this.arvores, this.faculdade, this.tendaLivro, this.tendaQuiz, this.circuloFonte, this.jogador, this.npc01.aluno, this.npc02.aluno, this.npc03.aluno, this.npc04.aluno, this.npc05.aluno, this.npc06.aluno, this.npc07.aluno, this.npc08.aluno);
                this.cameras.main.pan(550, 800, 1000);
                this.timer.remove()
                this.stateMachine.transitionTo('prontoParaJogar');
              }
              
            }
          },
          loop: true
        });
      }
      else if (this.stateMachine.currentState() === 'prontoParaJogar') {
        this.cerca.setVisible(true);
        this.joystick.setVisible(true);
        this.physics.resume();
        this.cameras.main.startFollow(this.jogador, true)
        this.onibus.setVelocityX(150);
        this.events.emit("mostraTarefaInicial");
      }
    });

    this.cameras.main.setBounds(0, -400, 1120, 1120);
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
    this.joystick.setVisible(false); // Esconde o joystick

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
  }

  update() {
    if (this.onibus.x >= 575 && this.stateMachine.currentState() === 'cameraPanOnibus') {
      this.stateMachine.transitionTo('entradaDosPersonagens');
      this.onibus.setVelocityX(0);
      this.cameras.main.pan(575, 900, 1000)
      this.cameras.main.stopFollow()
    }
    //Chama a função que faz os npcs andarem
    if (this.stateMachine.currentState() === 'entradaDosPersonagens') {
      this.npc01.updateAnimation();
      this.npc02.updateAnimation();
      this.npc03.updateAnimation();
      this.npc04.updateAnimation();
      this.npc05.updateAnimation();
      this.npc06.updateAnimation();
      this.npc07.updateAnimation();
      this.npc08.updateAnimation();
      this.npc09.updateAnimation();
    }
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
    
    
    if (this.stateMachine.currentState() === 'prontoParaJogar') {
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
    }
    
    
    // Verifica se o jogador está parado e roda animação de idle quando ele está
    if (this.jogador.body.velocity.x === 0 && this.jogador.body.velocity.y === 0) {
      this.jogador.anims.play('playerIdle', true);
    }
    // Verifica se o jogador está se movendo e roda animação de movimento quando ele está, considerando a direção que ele está indo
    if (this.jogador.body.velocity.x > 0) this.jogador.anims.play('playerWalkingRight', true);
    else if (this.jogador.body.velocity.x < 0) this.jogador.anims.play('playerWalkingLeft', true);
    else if (this.jogador.body.velocity.y !== 0 && this.jogador.body.velocity.x === 0) this.jogador.anims.play('playerWalkingRight', true);


    // Coloca os NPC's para andarem aleatoriamente
    if (this.stateMachine.currentState() === 'prontoParaJogar') {
      this.npc01.update();
      this.npc02.update();
      this.npc03.update();
      this.npc04.update();
      this.npc05.update();
      this.npc06.update();
      this.npc07.update();
      this.npc08.update();
      this.npc09.update();
  
    }
    if (Phaser.Math.Between(0, 1000) > 980 && !this.newCar && this.stateMachine.currentState() === 'prontoParaJogar' && !this.onibus){
      this.newCar = this.sortearCarro();
    }
    if (this.newCar && (this.newCar.x > 1170 || this.newCar.x < -50)){
      this.newCar.destroy();
      this.newCar = null;
    }
    if (this.onibus.x > 1170 && this.stateMachine.currentState() === 'prontoParaJogar' && this.onibus){
      this.onibus.destroy();
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
  sortearCarro(){
    const carros = ['civic', 'jeep', 'pickup', 'police', 'suv', 'taxi']
    const carroSorteado = Phaser.Math.Between(0, carros.length - 1)
    const left = Phaser.Math.Between(0, 1)
    const velocidade = Phaser.Math.Between(250, 300)
    return this.physics.add.image(left === 1 ? 1120 : -0, left === 1 ? 925 : 1000, carros[carroSorteado]).setBodySize(150, 70).setOffset(32, 70).setVelocityX(left === 1 ? -velocidade : velocidade).setFlip(left === 0 ? false: true, false).refreshBody();
  }
}
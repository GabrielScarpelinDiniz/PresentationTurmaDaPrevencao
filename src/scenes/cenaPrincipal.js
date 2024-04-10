class CenaPrincipal extends Phaser.Scene {
  defaultVelocity = 3;
  radiansAngleJoystick = 0;
  joystickForce = 0;
  atualDialogoIndice = 0;
  dialogo = [
    `Bom dia, alunos e alunas!
Bem-vindos à Faculdade de Medicina da USP.
Eu sou a Dra. Tina e serei a instrutora de vocês.
Hoje é um dia muito especial... O Dia da Prevenção!!
Para celebrarmos, vamos fazer uma dinâmica muito divertida com todos os alunos acerca do tema...... QUEIMADURAS!`, 
  //NEW DIALOGUE
  "A dinâmica funciona em ciclos e cada um deles terá 3 passos. O primeiro passo, é ler o case que irei entregar à vocês;", 
  "O segundo passo é estudar o case na tenda de livros, aqui mesmo. Lá vocês encontrarão 3 livros, cada um com uma informação diferente. A informação correta está em um dos livros.",
  "O terceiro passo é responder o quiz na tenda de perguntas. Se acertarem, ganham pontos. Se errarem, perdem tempo. E lembrem-se: o tempo é o seu maior inimigo!",
  //NEW DIALOGUE
  "Querem uma dica? Leiam com bastante atenção os cases e os livros, as informações deles serão essenciais para vocês ganharem mais pontos! Agora vamos começar! E mais importante: Divirtam-se!"]
  constructor() {
    super({
      key: "cenaPrincipal",
    });
    this.gameDimensions = {
      width: 1280,
      height: 720,
    };
  }
  init(data){
    this.from = data.from;
  }
  preload() {
    this.load.on("complete", (params) => {
      this.boxBarraDeCarregamento.destroy();
      this.barraCarregamento.destroy();
      this.carregandoTexto.destroy();
    });
    this.load.on("progress", (value) => {
      this.barraCarregamento.width = 780 * value;
    });

    this.cameras.main.setBackgroundColor(0xa5e2ff);
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    //Cria a lógica de carregamento enquanto as assets são carregadas
    this.boxBarraDeCarregamento = this.add
      .rectangle(240, 600, 800, 100, 0x000000, 0.8)
      .setStrokeStyle(4, 0xffffff)
      .setOrigin(0, 0);
    this.barraCarregamento = this.add
      .rectangle(250, 610, 0, 80, 0xffffff, 0.8)
      .setOrigin(0, 0);
    this.carregandoTexto = this.add
      .text(240, 550, "Carregando...", {
        fontSize: "40px",
        fill: "#FFFFFF",
      })
      .setOrigin(0, 0);

    //Carrega os assets do jogo
    this.load.audio("musicaIntroducao", "src/assets/sounds/temaAbertura.wav") // Música de introdução
    this.load.audio("musicaJogo", "src/assets/sounds/temaPrincipal.mp3") // Música de jogo quando o cronometro está ativo
    this.load.audio("efeitoSonoroOnibus", "src/assets/sounds/efeitoSonoroOnibus.mp3") // SFX do botão iniciar
    this.load.audio("efeitoSonoroCriancas", "src/assets/sounds/efeitoSonoroCriancas.mp3") // SFX das Crianças
    //Carrega a biblioteca do joystick
    this.load.plugin(
      "rexvirtualjoystickplugin",
      "src/plugins/rexvirtualjoystickplugin.min.js",
      true
    );

    //Carrega personagem e NPC
    this.load.spritesheet("jogador", "src/assets/spritesheets/playerPrincipal.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("tina", "src/assets/spritesheets/drTina.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.json("casesData", "src/assets/cases/cases.json");
    this.load.image("case1", "src/assets/spritesheets/prontuario1.png");

    //Carrega elementos principais do mapa
    this.load.image("Calcada", "src/assets/tilemaps/Calcada.png");
    this.load.image("faculdade", "src/assets/tilemaps/faculdade.png");
    this.load.image("fonte", "src/assets/tilemaps/fonte.png");
    this.load.image("Grass", "src/assets/tilemaps/Grass.png");
    this.load.image("pedra", "src/assets/tilemaps/pedra.png");
    this.load.image("portao", "src/assets/tilemaps/portao.png");
    this.load.image("portao2", "src/assets/tilemaps/portao2.png");
    this.load.image("grade-lateral-left", "src/assets/tilemaps/grade-lateral-left.png");
    this.load.image("grade-lateral-right", "src/assets/tilemaps/grade-lateral-right.png");
    this.load.image("grade-lateral-right-01", "src/assets/tilemaps/grade-lateral-right-01.png");
    this.load.image("grade-lateral-left-01", "src/assets/tilemaps/grade-lateral-left-01.png");
    this.load.image("rua", "src/assets/tilemaps/rua.png");
    this.load.image("tenda_livro", "src/assets/tilemaps/tenda_livro.png");
    this.load.image("tenda_quiz", "src/assets/tilemaps/tenda_quiz.png");
    this.load.image("Tree-Sheet", "src/assets/tilemaps/Tree-Sheet.png");
    this.load.image("terrain", "src/assets/tilemaps/terrain.png");
    

    this.load.image("botaoX", "src/assets/botaoX.png");
    this.load.image("botaoCase_baixo", "src/assets/botaoCase_baixo.png");
    this.load.image("botaoCase_alto", "src/assets/botaoCase_alto.png");
    this.load.image("botaoCheck", "src/assets/checkBotao.png");
    this.load.image("bandeiraPrevencao", "src/assets/bandeiraoPrevencao.png");
    this.load.image("posteInteliDireita", "src/assets/poste_inteli_direita.png");
    this.load.image("posteInteliEsquerda", "src/assets/poste_inteli_esquerda.png");
    this.load.image("posteUspDireita", "src/assets/poste_usp_direita.png");
    this.load.image("posteUspEsquerda", "src/assets/poste_usp_esquerda.png");
    this.load.spritesheet("npc01", "src/assets/spritesheets/NPC01.png", {
      frameWidth: 32, 
      frameHeight: 32
    });
    this.load.spritesheet("npc02", "src/assets/spritesheets/NPC02.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("npc03", "src/assets/spritesheets/NPC03.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("npc04", "src/assets/spritesheets/NPC04.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("npc05", "src/assets/spritesheets/NPC05.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("npc06", "src/assets/spritesheets/NPC06.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("npc07", "src/assets/spritesheets/NPC07.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("npc08", "src/assets/spritesheets/NPC08.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("npc09", "src/assets/spritesheets/NPC09.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    //Carrega o tiled do mapa
    this.load.tilemapTiledJSON("mapa", "src/assets/tilemaps/novoMapa.json");
    this.load.image("onibus", "src/assets/spritesheets/bus.png");
    this.load.image("civic", "src/assets/spritesheets/civic.png");
    this.load.image("jeep", "src/assets/spritesheets/jeep.png");
    this.load.image("pickup", "src/assets/spritesheets/pickup.png");
    this.load.image("police", "src/assets/spritesheets/police.png");
    this.load.image("suv", "src/assets/spritesheets/suv.png");
    this.load.image("taxi", "src/assets/spritesheets/taxi.png");
    this.load.image("seta", "src/assets/seta.png");

  }

  create() {
    this.prontoParaJogar = false;
    this.maquinaEstado = new StateMachine("cameraPanParaDialogoInicial");
    this.sorteados = [];
    this.indiceSorteado;
    this.primeiroCaso = true;
    this.iniciarTimer = true;
    this.controlesHabilitados = false;
    this.caseData = this.cache.json.get("casesData");
    this.centroX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    this.centroY = this.cameras.main.worldView.y + this.cameras.main.height / 2; // Reserva as posições de X e Y da câmera
    this.overlapCollider;
    this.objetoCaso = {
      caso: null,
      status: false,
    };

    // Adiciona efeito sonoro do ônibus
    this.efeitoSonoroOnibus = this.sound.add("efeitoSonoroOnibus", {
      loop: true,
      volume: 0.2,
    });

    // Adiciona a música de introdução
    this.musicaIntroducao = this.sound.add("musicaIntroducao", {
      loop: true,
      volume: 0.5,
    }); // Adiciona a música de introdução
    this.musicaJogo = this.sound.add("musicaJogo", {
      loop: false,
      volume: 0.3,
    }); // Adiciona a música de jogo
    this.efeitoSonoroCriancas = this.sound.add("efeitoSonoroCriancas", {
      loop: true,
      volume: 0.2
    }); // Adiciona efeito sonoro das crianças
    this.map = this.make.tilemap({
      key: "mapa",
      tileWidth: 32,
      tileHeight: 32,
    }); //Cria o mapa colocando o tamanho de cada "azulejo", que no nosso tiled foi 32x32

    // Adiciona os tilesets do mapa
    this.tileset1 = this.map.addTilesetImage("Calcada");
    this.tileset2 = this.map.addTilesetImage("faculdade");
    this.tileset3 = this.map.addTilesetImage("fonte");
    this.tileset4 = this.map.addTilesetImage("Grass");
    this.tileset5 = this.map.addTilesetImage("pedra");
    this.tileset6 = this.map.addTilesetImage("portao");
    this.tileset7 = this.map.addTilesetImage("portao2");
    this.tileset8 = this.map.addTilesetImage("rua");
    this.tileset9 = this.map.addTilesetImage("tenda_livro");
    this.tileset10 = this.map.addTilesetImage("Tree-Sheet");
    this.tileset11 = this.map.addTilesetImage("grade-lateral-left");
    this.tileset12 = this.map.addTilesetImage("grade-lateral-right");
    this.tileset13 = this.map.addTilesetImage("grade-lateral-right-01");
    this.tileset14 = this.map.addTilesetImage("grade-lateral-left-01");
    this.tileset15 = this.map.addTilesetImage("tenda_quiz");
    this.tileset16 = this.map.addTilesetImage("terrain");

    console.log(this.maquinaEstado, );

    this.chao = this.map.createLayer("Chao", [
      this.tileset1,
      this.tileset4,
      this.tileset5,
      this.tileset8,
    ]);
    this.detalhesChao = this.map.createLayer("DetalhesChao", [this.tileset16]);
    this.arvores = this.map.createLayer("Arvores", [
      this.tileset10,
      this.tileset11,
    ]);
    this.faculdade = this.map.createLayer("Faculdade", [this.tileset2]);
    this.fonte = this.map.createLayer("Fonte", [this.tileset3]);
    this.tendaLivro = this.map.createLayer("TendaLivro", [this.tileset9]);
    this.tendaQuiz = this.map.createLayer("TendaQuiz", [this.tileset15]);
    this.dialogBox = this.add
      .rectangle(640, 420, 450, 140, 0xadd8e6, 1)
      .setScrollFactor(0)
      .setOrigin(0.5)
      .setVisible(false)
      .setInteractive(); // Adiciona a caixa de diálogo;
    this.dialogBox.setStrokeStyle(2, 0x1a65ac);
    this.botaoCheck = this.add
      .image(820, 450, "botaoCheck")
      .setVisible(false)
      .setScrollFactor(0)
      .setScale(0.6); // Adiciona o botão de check para iniciar o quiz
    this.musicaIntroducao.play(); // Inicia a música de introdução

    // define os limites do mundo do jogo,
    this.worldBounds = this.physics.add.staticGroup().add(this.add.rectangle(0, 560, 3, 1120, 0x000000, 0)).add(this.add.rectangle(1120, 560, 3, 1120, 0x000000, 0)).add(this.add.rectangle(560, 0, 1120, 3, 0x000000, 0)).add(this.add.rectangle(560, 885, 1120, 3, 0x000000, 0));
    this.cameras.main.setBounds(0, -400, 1120, 1520);
    this.cameras.main.setZoom(2.2);
    this.cameras.main.centerOn(550, -250);
    this.tina = this.physics.add.sprite(560, 400, "tina").setOffset(8, 12).setCircle(8).setScale(2).refreshBody().setImmovable(); // Adiciona o sprite da Tina
    this.cameras.main.pan(560, 460, 2000)
    this.cameras.main.on("camerapancomplete", () => {
      console.log(this.maquinaEstado.currentState())
      if (this.maquinaEstado.currentState() === "cameraPanParaDialogoInicial") {
        this.botaoCheck.setVisible(true);
        this.dialogBox.setVisible(true);
        this.cameras.main.setBounds(0, 0, 1120, 1120);
        this.dialogText = new TypeWritter(this, 420, 353, "iosevka", this.dialogo[0], 16, 20, () => {
        this.dialogBox.once("pointerdown", () => {
          console.log("teste0")
          this.maquinaEstado.transitionTo("cameraPanSegundoDialogo");
          this.cameras.main.pan(0, 645, 1000);
          this.dialogBox.setVisible(false);
          this.botaoCheck.setVisible(false);
          this.dialogText.setVisible(false);
        });
        }).setMaxWidth(380).setScrollFactor(0).setInteractive().on("pointerdown", () => { this.dialogText.skip()});
      }
      if (this.maquinaEstado.currentState() === "cameraPanSegundoDialogo") {
        this.cameras.main.pan(50, 560, 1000)
        this.cameras.main.zoomTo(4, 1000)
        this.maquinaEstado.transitionTo("zoomIn");
      }
      if (this.maquinaEstado.currentState() === "abrirLivros") {
        this.scene.wake("livros");
      }
      if (this.maquinaEstado.currentState() === "cameraPanParaTendaQuiz") {
        console.log("teste")
      }
    })
    this.cameras.main.on("camerazoomcomplete", () => {
      if (this.maquinaEstado.currentState() === "zoomIn") {
        this.cameras.main.pan(50, 560, 100);
        this.maquinaEstado.transitionTo("abrirLivros")
      }
      else if (this.maquinaEstado.currentState() === "zoomOut") {
        this.cameras.main.pan(1000, 560, 1000);
        this.maquinaEstado.transitionTo("cameraPanParaTendaQuiz");
      }
    })
    this.events.on("tendaQuiz", () => {
      this.cameras.main.zoomTo(2.2, 1000);
      this.maquinaEstado.transitionTo("zoomOut");
    });
  }

  update() {
    
  }

  fixAngle(angle) {
    // Corrige o ângulo do joystick para que ele vá de 0 a 360 graus
    if (angle < 0) {
      return -angle;
    } else if (angle > 0) {
      return 360 - angle;
    }
  }

  sortearNumero(min, max) {
    // Função que sorteia um número entre min e max, sem repetir os números sorteados, para o caso
    if (this.sorteados.length === this.caseData.length) {
      return 0;
    }
    const numeroSorteado = Phaser.Math.Between(min, max);
    console.log(this.sorteados, numeroSorteado);
    if (this.sorteados.includes(numeroSorteado)) {
      return this.sortearNumero(min, max);
    }
    this.sorteados.push(numeroSorteado);
    return numeroSorteado;
  }
  sortearCarro() {
    // Função que sorteia um carro para aparecer na tela
    const carros = ["civic", "jeep", "pickup", "police", "suv", "taxi"]
    const carroSorteado = Phaser.Math.Between(0, carros.length - 1)
    const left = Phaser.Math.Between(0, 1)
    const velocidade = Phaser.Math.Between(250, 300)
    return this.physics.add.image(left === 1 ? 1120 : -0, left === 1 ? 905 : 985, carros[carroSorteado]).setBodySize(150, 70).setOffset(32, 70).setVelocityX(left === 1 ? -velocidade : velocidade).setFlip(left === 0 ? false: true, false).refreshBody();
  }
  posicionarNPCs(){
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
  }
}

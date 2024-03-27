class MenuPrincipal extends Phaser.Scene {
  constructor() {
    super({
      key: "menu",
    })
  }
  preload() {
<<<<<<< Updated upstream
    this.load.image("background", "assets/background.png") // Fundo da cena do Main Menu
    this.load.image("inteliLogo", "assets/logointeli.png") // Logo do Inteli
    this.load.audio('efeitoSonoroBotaoMenu', 'assets/sounds/iniciaJogo.mp3') // SFX do botão iniciar
    this.load.spritesheet("botaoJogar", "assets/button.png", {
      frameWidth: 138,
      frameHeight: 46
=======
    this.load.image("background", "assets/backgroundMenu.png") // Fundo da cena do Main Menu
    this.load.image("inteliLogo", "assets/logointeli.png") // Fundo da cena do Main Menu
    this.load.image("nuvem", "assets/nuvem.png")
    this.load.spritesheet("botaoJogar", "assets/botaoJogarNovo.png", {
      frameWidth: 400,
      frameHeight: 200
>>>>>>> Stashed changes
    }) // Imagem para botaoJogar

  }

  create() {

    // Carrega a cena Main Menu
    this.mainMenu = this.add.image(640, 360, "background").setScale(1)
    this.logoInteli = this.add.image(1180, 630, "inteliLogo").setScale(1)
    this.nuvem1 = this.physics.add.image(532, 320, "nuvem").setScale(1.3);
    this.nuvem2 = this.physics.add.image(680, 165, "nuvem").setScale(1.2).setFlip(true);
    this.nuvem3 = this.physics.add.image(700, 465, "nuvem").setScale(0.3);
    this.nuvem4 = this.physics.add.image(130, 170, "nuvem").setScale(0.4).setFlip(true);
    this.nuvem5 = this.physics.add.image(980, 320, "nuvem").setScale(0.2).setFlip(true);
    this.botaoJogar = this.add.sprite(640, 620, "botaoJogar").setInteractive().setScale(1)

    // Adiciona efeito sonoro do botão iniciar
    this.efeitoSonoroBotaoMenu = this.sound.add('efeitoSonoroBotaoMenu');

    // Cria a animação de botaoJogar
    this.anims.create({
      key: 'animar',
      frames: this.anims.generateFrameNumbers('botaoJogar', {
        start: 0,
        end: 1
      }),
      frameRate: 2,
      repeat: -1
    });

    // Ativa a animação de botaoJogar
    this.botaoJogar.anims.play('animar', true);

    // Move as nuvens no eixo X
    this.nuvem1.setVelocityX(-190);
    this.nuvem2.setVelocityX(200);
    this.nuvem3.setVelocityX(85);
    this.nuvem4.setVelocityX(-90);
    this.nuvem5.setVelocityX(65);


    // Lógica para destruir nuvens caso ultrapassem os limites de tela
    if (this.nuvem1.x < 100) {
      this.nuvem1.destroy();
    }

    if (this.nuvem2.x > 1200) {
      this.nuvem2.destroy();
    }

    if (this.nuvem3.x > 1200) {
      this.nuvem3.destroy();
    }

    if (this.nuvem4.x < 100) {
      this.nuvem4.destroy();
    }
    
    if (this.nuvem5.x > 1200) {
      this.nuvem5.destroy();
    }

    // Ajuste visual da imagem do mouse para fornecer feedback que o botão jogar é interativo
    this.botaoJogar.on("pointerover", () => {
      // Evento de passar o mouse sobre o botaoJogar
      this.input.setDefaultCursor("pointer") // Cursor vira mãozinha
    })
    this.botaoJogar.on("pointerout", () => {
      // Evento de retirar o mouse do botaoJogar
      this.input.setDefaultCursor("default") // Cursor vira setinha
    })

    // Evento disparado ao clicar no botão (Código temporário apenas para demonstração da funcionalidade na sprint 1)
    this.botaoJogar.on("pointerdown", () => {
      // Evento de click do mouse
<<<<<<< Updated upstream
      this.efeitoSonoroBotaoMenu.play();
      this.scene.start("cenaPrincipal")
      this.scene.start("HUD")
      this.scene.stop("menu")
      this.input.setDefaultCursor("default") // Retorno do cursor do mouse para setinha
=======
      this.cameras.main.fadeOut(1000, 0, 0, 0)
      // Realiza FadeOut antes de passar para próxima cena
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        this.time.delayedCall(1000, () => {
          this.scene.start("cenaPrincipal")
          this.scene.start("HUD")
          this.scene.stop("menu")
          this.input.setDefaultCursor("default") // Retorno do cursor do mouse para setinha
        })
      })
>>>>>>> Stashed changes
      // this.openFullScreen()
    })

    this.scene.sleep('livros');
    this.scene.sleep('quiz');

  }

  update() {}
  
  openFullScreen() {
    const page = document.documentElement //Pega o documento inteiro
    if (page.requestFullscreen) { //Se o navegador suportar o Fullscreen
      page.requestFullscreen() //Ativa o Fullscreen
    } else if (page.mozRequestFullScreen) { //Se o navegador suportar o Fullscreen do Mozila
      page.mozRequestFullScreen() //Ativa o Fullscreen
    } else if (page.webkitRequestFullscreen) { //Se o navegador suportar o Fullscreen do Webkit
      page.webkitRequestFullscreen() //Ativa o Fullscreen
    } else if (page.msRequestFullscreen) { //Se o navegador suportar o Fullscreen do Microsoft
      page.msRequestFullscreen() //Ativa o Fullscreen
    }
  }
}
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
>>>>>>> Stashed changes
    }) // Imagem para botaoJogar

  }

  create() {

    // Carrega a cena Main Menu

    // Adiciona efeito sonoro do botão iniciar
    this.efeitoSonoroBotaoMenu = this.sound.add('efeitoSonoroBotaoMenu');

    // Cria a animação de botaoJogar
    this.anims.create({
      key: 'animar',
      frames: this.anims.generateFrameNumbers('botaoJogar', {
        start: 0,
        end: 1
      }),
      repeat: -1
    });

    // Ativa a animação de botaoJogar
    this.botaoJogar.anims.play('animar', true);


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
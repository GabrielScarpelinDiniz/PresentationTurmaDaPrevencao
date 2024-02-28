class MenuPrincipal extends Phaser.Scene {
  constructor() {
    super({
      key: "menu",
    })
  }
  preload() {
    this.load.image("background", "assets/background.png") // Fundo da cena do Main Menu
    this.load.image("inteliLogo", "assets/logointeli.png") // Fundo da cena do Main Menu
    this.load.spritesheet("botaoJogar", "assets/button.png", { frameWidth: 138, frameHeight: 46 }) // Imagem para botaoJogar

  }

  create() {
    // Carrega a cena Main Menu
    this.mainMenu = this.add.image(630, 365, "background").setScale(2.1)
    this.logoInteli = this.add.image(1200, 690, "inteliLogo").setScale(1)
    this.botaoJogar = this.add.sprite(900, 575, "botaoJogar").setInteractive().setScale(2)

    // Cria a animação de botaoJogar
    this.anims.create({
      key: 'animar',
      frames: this.anims.generateFrameNumbers('botaoJogar', { start: 0, end: 1 }),
      frameRate: 4,
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
      this.scene.start("hospital")
      this.scene.stop('menu')
      this.input.setDefaultCursor("default") // Retorno do cursor do mouse para setinha
      this.openFullScreen()
    })
  }

  update() {}
  openFullScreen() {
    const page = document.documentElement //Pega o documento inteiro
    if (page.requestFullscreen){ //Se o navegador suportar o Fullscreen
        page.requestFullscreen() //Ativa o Fullscreen
    } else if (page.mozRequestFullScreen){ //Se o navegador suportar o Fullscreen do Mozila
        page.mozRequestFullScreen() //Ativa o Fullscreen
    } else if (page.webkitRequestFullscreen){ //Se o navegador suportar o Fullscreen do Webkit
        page.webkitRequestFullscreen() //Ativa o Fullscreen
    } else if (page.msRequestFullscreen){ //Se o navegador suportar o Fullscreen do Microsoft
        page.msRequestFullscreen() //Ativa o Fullscreen
    }
  }
}

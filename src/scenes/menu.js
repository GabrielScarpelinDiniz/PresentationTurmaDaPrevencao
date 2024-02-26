class MenuPrincipal extends Phaser.Scene {
  preload() {
    this.load.image("cenaMainMenu", "assets/cenaMainMenu.png"); // Fundo da cena do Main Menu
    this.load.image("botaoJogar", "assets/botaoJogar.png"); // Imagem para botaoJogar
  }

  create() {
    // Carrega a cena Main Menu
    mainMenu = this.add
      .image(667, 362, "cenaMainMenu")
      .setDepth(2)
      .setScale(1.005); // setDepth -> Muda profundidade para frente
    botaoJogar = this.add.image(830, 575, "botaoJogar").setInteractive().setDepth(2);

    // Ajuste visual da imagem do mouse para fornecer feedback que o botão jogar é interativo
    botaoJogar.on("pointerover", () => {
      // Evento de passar o mouse sobre o botaoJogar
      this.input.setDefaultCursor("pointer"); // Cursor vira mãozinha
    });
    botaoJogar.on("pointerout", () => {
      // Evento de retirar o mouse do botaoJogar
      this.input.setDefaultCursor("default"); // Cursor vira setinha
    });

    // Evento disparado ao clicar no botão (Código temporário apenas para demonstração da funcionalidade na sprint 1)
    botaoJogar.on("pointerdown", () => {
      // Evento de click do mouse
      mainMenu.destroy(); // Remoção da imagem mainMenu da tela
      botaoJogar.destroy(); // Remoção da imagem botaoJogar da tela
      this.input.setDefaultCursor("default"); // Retorno do cursor do mouse para setinha
    });
  }

  update() {}
}
export default MenuPrincipal
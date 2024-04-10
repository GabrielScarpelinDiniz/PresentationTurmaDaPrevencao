class GameOver extends Phaser.Scene {
  constructor() {
    super({
      key: "GameOver",
    });
  }

  preload() {
    this.load.image("backgroundFinalApresentacao", "src/assets/backgroundFinal.png");
  }
  init(params) {
    this.pontuacao = params.pontuacao;
  }
  create() {
    this.background = this.add.image(640, 360, "backgroundFinalApresentacao").setOrigin(0.5);
  }
}

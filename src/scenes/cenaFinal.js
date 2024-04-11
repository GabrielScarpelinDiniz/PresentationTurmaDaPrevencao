class GameOver extends Phaser.Scene {
  constructor() {
    super({
      key: "GameOver",
    });
  }

  preload() {
    this.load.image("telafinal1", "src/assets/telafinal1.png");
    this.load.image("telafinal2", "src/assets/telafinal2.png");
    this.load.image("telafinal3", "src/assets/telafinal3.png");
  }
  init(params) {
    this.pontuacao = params.pontuacao;
  }
  create() {
    this.slide = 1;
    this.background = this.add.image(640, 360, "telafinal1").setOrigin(0.5);
    const pageDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PAGE_DOWN);
    const pageUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PAGE_UP);
    pageDown.on("up", () => {
      if (this.slide < 3) {
        this.slide++;
        this.atualizarSlide();
      }
    });
    pageUp.on("up", () => {
      if (this.slide > 1) {
        this.slide--;
        this.atualizarSlide();
      }
    });
  }
  atualizarSlide(){
    if (this.slide === 1) {
      this.background.setTexture("telafinal1");
    }
    else if (this.slide === 2) {
      this.background.setTexture("telafinal2");
    }
    else if (this.slide === 3) {
      this.background.setTexture("telafinal3");
    }
  }
}

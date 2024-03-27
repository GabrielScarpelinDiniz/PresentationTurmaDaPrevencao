class TypeWritter extends Phaser.GameObjects.BitmapText {
    constructor(scene, x, y, font, text, size, velocidade, onComplete, align) {
      super(scene, x, y, font, text, size, align);
      scene.add.existing(this);
      this.speed = velocidade;
      this.textOriginal = text;
      this.index = 0;
      this.typedText = "";
      this.timer = scene.time.addEvent({
        delay: this.speed,
        callback: this.addChar,
        callbackScope: this,
        loop: true
      });
      this.onComplete = onComplete;
    }
    
    addChar() {
      if (this.textOriginal[this.index] === undefined) return;
      this.typedText += this.textOriginal[this.index];
      this.setText(this.typedText);
      this.index++;
      if (this.index === this.textOriginal.length) {
          this.timer.remove();
          if (this.onComplete) this.onComplete();
      }
    }
    destroy() {
      this.timer.remove();
      super.destroy();
    }
    proximoTexto(texto, onComplete){
        console.log(texto)
        this.textOriginal = texto;
        this.index = 0;
        this.typedText = "";
        this.timer = this.scene.time.addEvent({
            delay: this.speed,
            callback: this.addChar,
            callbackScope: this,
            loop: true
        });
        this.onComplete = onComplete;
    }
  }
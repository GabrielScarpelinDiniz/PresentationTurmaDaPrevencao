class Livros extends Phaser.Scene {
    constructor() {
        super({
            key: 'livros',
        })
    }

    preload() {
        this.load.image('livroVerde', 'assets/livroVerde.png');
        this.load.image('livroAmarelo', 'assets/livroAmarelo.png');
        this.load.image('livroVermelho', 'assets/livroVermelho.png');
    }

    create() {
        this.add.image(100, 200, 'livroVerde');
        this.add.image(100, 300, 'livroAmarelo');
        this.add.image(100, 400, 'livroVermelho');
    }
        
}
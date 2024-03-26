class Livros extends Phaser.Scene {
    constructor() {
        super({
            key: 'livros',
            active: true
        })
    }

    preload() {
        // Carrega as imagens a serem utilizadas
        this.load.image('livroVerde', 'assets/livroVerde.png');
        this.load.image('livroAmarelo', 'assets/livroAmarelo.png');
        this.load.image('livroVermelho', 'assets/livroVermelho.png');
        this.load.image('livroVerdeAberto', 'assets/livroVerdeAberto.png');
        this.load.image('livroAmareloAberto', 'assets/livroAmareloAberto.png');
        this.load.image('livroVermelhoAberto', 'assets/livroVermelhoAberto.png');
        this.load.image('backgroundLivros', 'assets/backgroundLivros.png');
        this.load.image('botaoX', 'assets/botaoX.png');
        this.load.audio('efeitoSonoroVirarPagina', 'assets/sounds/efeitoSonoroVirarPagina.mp3') // SFX da página do livro
    }

    create() {
        this.primeiraCena = this.scene.get('cenaPrincipal');
        this.scene.sleep('livros')

        // this.eventoGatilho.on("tendaLivros", () => {
        // Adiciona o background e livros a serem apresentados na cena
        this.add.image(0, 0, 'backgroundLivros').setOrigin(0, 0).setScale(2);
        this.livroVerde = this.add.image(100, 200, 'livroVerde').setOrigin(0, 0).setScale(1.6).setInteractive();
        this.livroAmarelo = this.add.image(500, 200, 'livroAmarelo').setOrigin(0, 0).setScale(1.6).setInteractive();
        this.livroVermelho = this.add.image(900, 200, 'livroVermelho').setOrigin(0, 0).setScale(1.6).setInteractive();

        // Adiciona efeito sonoro de virar a página
        this.efeitoSonoroVirarPagina = this.sound.add('efeitoSonoroVirarPagina');

        this.livroVerde.on("pointerdown", () => { // Define função que chama o livro verde aberto quando clicar no livro verde fechado
            this.efeitoSonoroVirarPagina.play();
            this.livroVerde.setVisible(false);
            this.livroAmarelo.setVisible(false);
            this.livroVermelho.setVisible(false);
            this.livroVerdeAberto = this.add.image(640, 350, 'livroVerdeAberto').setScale(2.6);
        });

        this.livroAmarelo.on("pointerdown", () => { // Define função que chama o livro amarelo aberto quando clicar no livro amarelo fechado
            this.efeitoSonoroVirarPagina.play();
            this.livroVerde.setVisible(false);
            this.livroAmarelo.setVisible(false);
            this.livroVermelho.setVisible(false);
            this.livroAmareloAberto = this.add.image(640, 350, 'livroAmareloAberto').setScale(2.6);
        });

        this.livroVermelho.on("pointerdown", () => { // Define função que chama o livro vermelho aberto quando clicar no livro vermelho fechado
            this.efeitoSonoroVirarPagina.play();
            this.livroVerde.setVisible(false);
            this.livroAmarelo.setVisible(false);
            this.livroVermelho.setVisible(false);
            this.livroVermelhoAberto = this.add.image(640, 350, 'livroVermelhoAberto').setScale(2.6);
        });
        // });

        // Adiciona o botão de fechar a cena e adiciona o evento de clique
        this.botaoFechar = this.add.sprite(1200, 50, 'botaoX').setScale(0.5).setInteractive().setScrollFactor(0);
        this.botaoFechar.on('pointerdown', () => {
            // Inicie a cena principal passando os dados relevantes do estado da cena principal
            this.events.emit('mudaTarefaParaQuiz');
            this.scene.sleep('livros');
            this.scene.restart();
            this.primeiraCena.physics.resume()
        });
    }
}
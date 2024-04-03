class Livros extends Phaser.Scene {
    constructor() {
        super({
            key: "livros",
            active: true
        })
    }

    preload() {
        // Carrega as imagens a serem utilizadas
        this.load.image("livroVerde", "assets/livroVerde.png");
        this.load.image("livroAmarelo", "assets/livroAmarelo.png");
        this.load.image("livroVermelho", "assets/livroVermelho.png");
        this.load.image("livroVerdeAberto", "assets/livroVerdeAberto.png");
        this.load.image("livroAmareloAberto", "assets/livroAmareloAberto.png");
        this.load.image("livroVermelhoAberto", "assets/livroVermelhoAberto.png");
        this.load.image("backgroundLivros", "assets/backgroundLivros.png");
        this.load.image("botaoX", "assets/botaoX.png");
        this.load.audio("efeitoSonoroVirarPagina", "assets/sounds/efeitoSonoroVirarPagina.mp3") // SFX da página do livro
        this.load.image("primeiro-grau", "assets/conteudo-livros/images/primeiro-grau.png")
        this.load.image("segundo-grau", "assets/conteudo-livros/images/segundo-grau.png")
        this.load.image("terceiro-grau", "assets/conteudo-livros/images/terceiro-grau.png")
        this.load.image("setadireita", "assets/setadireita.png")
    }

    create() {
        this.primeiraCena = this.scene.get("cenaPrincipal");
        this.scene.sleep("livros")
        this.texto = this.cache.json.get("conteudo-livros");
        
        this.add.image()
        // this.eventoGatilho.on("tendaLivros", () => {
        // Adiciona o background e livros a serem apresentados na cena
        this.add.image(0, 0, "backgroundLivros").setOrigin(0, 0).setScale(2);
        this.livroVerde = this.add.image(100, 200, "livroVerde").setOrigin(0, 0).setScale(1.6).setInteractive();
        this.livroAmarelo = this.add.image(500, 200, "livroAmarelo").setOrigin(0, 0).setScale(1.6).setInteractive();
        this.livroVermelho = this.add.image(900, 200, "livroVermelho").setOrigin(0, 0).setScale(1.6).setInteractive();
        this.livroAmareloAberto = this.add.image(640, 350, "livroAmareloAberto").setScale(2.6).setVisible(false);
        this.livroVermelhoAberto = this.add.image(640, 350, "livroVermelhoAberto").setScale(2.6).setVisible(false);
        this.livroVerdeAberto = this.add.image(640, 350, "livroVerdeAberto").setScale(2.6).setVisible(false);
        this.primeiroGrau = this.add.image(400, 475, "primeiro-grau").setScale(2).setVisible(false);
        this.segundoGrau = this.add.image(540, 350, "segundo-grau").setScale(2).setVisible(false);
        this.terceiroGrau = this.add.image(400, 475, "terceiro-grau").setScale(2).setVisible(false);
        this.setaDireita = this.add.image(1095, 500, "setadireita").setScale(0.12).setVisible(false);
        // inicia os objetos iniciais da cena livro
        // Adiciona efeito sonoro de virar a página
        this.efeitoSonoroVirarPagina = this.sound.add("efeitoSonoroVirarPagina",{volume: 0.5});
      
        this.livroVerde.on("pointerdown", () => { // Define função que chama o livro verde aberto quando clicar no livro verde fechado
            // Adiciona o evento de clique no livro verde, ao clicar o livro verde é aberto
            this.efeitoSonoroVirarPagina.play();
            this.livroVerde.setVisible(false);
            this.livroAmarelo.setVisible(false);
            this.livroVermelho.setVisible(false);
            this.livroVerdeAberto.setVisible(true);
            this.setaDireita.setVisible(true);
        });

        this.livroAmarelo.on("pointerdown", () => { // Define função que chama o livro amarelo aberto quando clicar no livro amarelo fechado
            // Adiciona o evento de clique no livro amarelo, ao clicar o livro amarelo é aberto
            this.efeitoSonoroVirarPagina.play();
            this.livroVerde.setVisible(false);
            this.livroAmarelo.setVisible(false);
            this.livroVermelho.setVisible(false);
            this.livroAmareloAberto.setVisible(true);
            this.setaDireita.setVisible(true);
            paginaAtual = 0
            
        });

        this.livroVermelho.on("pointerdown", () => { // Define função que chama o livro vermelho aberto quando clicar no livro vermelho fechado
            // Adiciona o evento de clique no livro vermelho, ao clicar o livro vermelho é aberto
            this.efeitoSonoroVirarPagina.play();
            this.livroVerde.setVisible(false);
            this.livroAmarelo.setVisible(false);
            this.livroVermelho.setVisible(false);
            this.livroVermelhoAberto.setVisible(true);
            this.setaDireita.setVisible(true);
        });    

        // Adiciona o botão de fechar a cena e adiciona o evento de clique
        this.botaoFechar = this.add.sprite(1200, 50, "botaoX").setScale(0.5).setInteractive().setScrollFactor(0);
        this.botaoFechar.on("pointerdown", () => {
            // Fecha a cena de livros
            // Inicie a cena principal passando os dados relevantes do estado da cena principal
            this.events.emit("mudaTarefaParaQuiz");
            this.scene.sleep("livros");
            this.scene.restart();
            this.primeiraCena.physics.resume()
        });
    }
    
}
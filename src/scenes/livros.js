class Livros extends Phaser.Scene {
    constructor() {
        super({
            key: "livros",
            active: true
        })
    }

    preload() {
        // Carrega as imagens a serem utilizadas
        this.load.image("livroVerde", "/src/assets/livroVerde.png");
        this.load.image("livroAmarelo", "/src/assets/livroAmarelo.png");
        this.load.image("livroVermelho", "/src/assets/livroVermelho.png");
        this.load.image("livroVerdeAberto", "/src/assets/livroVerdeAberto.png");
        this.load.image("livroAmareloAberto", "/src/assets/livroAmareloAberto.png");
        this.load.image("livroVermelhoAberto", "/src/assets/livroVermelhoAberto.png");
        this.load.image("backgroundLivros", "/src/assets/backgroundLivros.png");
        this.load.image("botaoX", "/src/assets/botaoX.png");
        this.load.audio("efeitoSonoroVirarPagina", "/src/assets/sounds/efeitoSonoroVirarPagina.mp3") // SFX da página do livro
        this.load.image("primeiro-grau", "/src/assets/conteudo-livros/images/primeiro-grau.png")
        this.load.image("segundo-grau", "/src/assets/conteudo-livros/images/segundo-grau.png")
        this.load.image("terceiro-grau", "/src/assets/conteudo-livros/images/terceiro-grau.png")
        this.load.json("conteudo-livros", "/src/assets/conteudo-livros/textos.json")
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
        // inicia os objetos iniciais da cena livro
        // Adiciona efeito sonoro de virar a página
        this.efeitoSonoroVirarPagina = this.sound.add("efeitoSonoroVirarPagina",{volume: 0.5});
      
      
        this.livroVerde.on("pointerdown", () => { // Define função que chama o livro verde aberto quando clicar no livro verde fechado
            // Adiciona o evento de clique no livro verde, ao clicar o livro verde é aberto
            this.efeitoSonoroVirarPagina.play();
            this.livroVerde.setVisible(false);
            this.livroAmarelo.setVisible(false);
            this.livroVermelho.setVisible(false);
            this.mostrarConteudo(1);
            this.livroVerdeAberto.setVisible(true);
        });

        this.livroAmarelo.on("pointerdown", () => { // Define função que chama o livro amarelo aberto quando clicar no livro amarelo fechado
            // Adiciona o evento de clique no livro amarelo, ao clicar o livro amarelo é aberto
            this.efeitoSonoroVirarPagina.play();
            this.livroVerde.setVisible(false);
            this.livroAmarelo.setVisible(false);
            this.livroVermelho.setVisible(false);
            this.livroAmareloAberto.setVisible(true);
            this.mostrarConteudo(2);

        });

        this.livroVermelho.on("pointerdown", () => { // Define função que chama o livro vermelho aberto quando clicar no livro vermelho fechado
            // Adiciona o evento de clique no livro vermelho, ao clicar o livro vermelho é aberto
            this.efeitoSonoroVirarPagina.play();
            this.livroVerde.setVisible(false);
            this.livroAmarelo.setVisible(false);
            this.livroVermelho.setVisible(false);
            this.livroVermelhoAberto.setVisible(true);
            this.mostrarConteudo(3);

        });
        // });

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
    mostrarConteudo(grau){
        // Função que mostra o conteúdo do livro
        console.log(this.texto[grau - 1], grau - 1, this.texto[grau - 1].quantidadePaginas, this.texto[grau - 1][0])
        grau === 1 ? this.primeiroGrau.setVisible(true) : grau === 2 ? this.segundoGrau.setVisible(true) : this.terceiroGrau.setVisible(true);
        this.primeiraPagina ? this.primeiraPagina.destroy() : null // Verifica se a primeira página existe, se sim, destroi
        this.segundaPagina ? this.segundaPagina.destroy() : null // Verifica se a segunda página existe, se sim, destroi
        this.paginaAtual = 0;
        this.primeiraPagina = this.add.bitmapText(220, 110, "iosevka", this.texto[grau - 1][this.paginaAtual], 30).setVisible(true).setMaxWidth(320); // Adiciona o texto da primeira página
        this.segundaPagina = this.add.bitmapText(660 , 110, "iosevka", this.texto[grau - 1][this.paginaAtual + 1], 30).setVisible(true).setMaxWidth(320); // Adiciona o texto da segunda página
        this.proximaPaginaInterativo = this.add.rectangle(640, 100, 640, 640, 0x000000, 0).setOrigin(0, 0).setInteractive(); // Adiciona a área interativa para passar a página
        if (grau === 1) {
            // Adiciona a imagem do primeiro grau
            this.primeiroGrau.setVisible(true)
        }
        else if (grau === 2) {
            // Adiciona a imagem do segundo grau
            this.segundoGrau.setVisible(true)
        }
        else if (grau === 3) {
            // Adiciona a imagem do terceiro grau
            this.terceiroGrau.setVisible(true)
        }
        this.proximaPaginaInterativo.on("pointerdown", () => {
            this.efeitoSonoroVirarPagina.play();
            if (this.paginaAtual < this.texto[0].quantidadePaginas - 2) {
                // Se a página atual for menor que a quantidade de páginas - 2, então incrementa a página atual em 2
                this.primeiroGrau.setVisible(false)
                this.segundoGrau.setVisible(false)
                this.terceiroGrau.setVisible(false)
                this.paginaAtual += 2;
                this.primeiraPagina.setText(this.texto[grau - 1][this.paginaAtual]);
                this.segundaPagina.setText(this.texto[grau - 1][this.paginaAtual + 1]);
            }
        })
        this.voltarPaginaInterativo = this.add.rectangle(0, 100, 640, 640, 0x000000, 0).setOrigin(0, 0).setInteractive();
        this.voltarPaginaInterativo.on("pointerdown", () => {
            this.efeitoSonoroVirarPagina.play();
            if (this.paginaAtual == 0) {   
                // Se a página atual for 0, então volta para a tela inicial 
                this.primeiraPagina.destroy();
                this.segundaPagina.destroy();
                this.proximaPaginaInterativo.destroy();
                this.voltarPaginaInterativo.destroy();
                this.primeiroGrau.setVisible(false)
                this.segundoGrau.setVisible(false)
                this.terceiroGrau.setVisible(false)
                this.livroVerde.setVisible(true);
                this.livroAmarelo.setVisible(true);
                this.livroVermelho.setVisible(true);
                this.livroVermelhoAberto.setVisible(false);
                this.livroAmareloAberto.setVisible(false);
                this.livroVerdeAberto.setVisible(false);
            }
            else if (this.paginaAtual >= 2) {
                // Porque na primeira página tem imagem
                // verifica se a página atual é maior ou igual a 2
                this.paginaAtual -= 2; // decrementa a página atual em 2
                this.primeiraPagina.setText(this.texto[grau - 1][this.paginaAtual]);
                this.segundaPagina.setText(this.texto[grau - 1][this.paginaAtual + 1]);
                this.paginaAtual === 0 ? grau === 1 ? this.primeiroGrau.setVisible(true) : grau === 2 ? this.segundoGrau.setVisible(true) : this.terceiroGrau.setVisible(true) : null;
            }
        })
    }
}
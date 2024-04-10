class Livros extends Phaser.Scene {
    constructor() {
        super({
            key: "livros",
            active: true
        })
    }

    preload() {
        // Carrega as imagens a serem utilizadas
        this.load.image("livroVerde", "src/assets/livroVerde.png");
        this.load.image("livroAmarelo", "src/assets/livroAmarelo.png");
        this.load.image("livroVermelho", "src/assets/livroVermelho.png");
        this.load.image("livroVerdeAberto", "src/assets/livroVerdeAberto.png");
        this.load.image("livroAmareloAberto", "src/assets/livroAmareloAberto.png");
        this.load.image("livroVermelhoAberto", "src/assets/livroVermelhoAberto.png");
        this.load.image("backgroundLivros", "src/assets/backgroundLivros.png");
        this.load.image("botaoX", "src/assets/botaoX.png");
        this.load.audio("efeitoSonoroVirarPagina", "src/assets/sounds/efeitoSonoroVirarPagina.mp3"); // SFX da página do livro
        this.load.image("primeiro-grau", "src/assets/conteudo-livros/images/primeiro-grau.png");
        this.load.image("segundo-grau", "src/assets/conteudo-livros/images/segundo-grau.png");
        this.load.image("terceiro-grau", "src/assets/conteudo-livros/images/terceiro-grau.png");
        this.load.image("setaVermelha", "src/assets/setaVermelha.png");
        this.load.image("setaVerde", "src/assets/setaVerde.png");
        this.load.image("setaAmarela", "src/assets/setaAmarela.png");

        this.load.image("verdePag1", "src/assets/paginaCases/verdePag1.png");
        this.load.image("verdePag2", "src/assets/paginaCases/verdePag2.png");
        this.load.image("verdePag3", "src/assets/paginaCases/verdePag3.png");
        this.load.image("verdePag4", "src/assets/paginaCases/verdePag4.png");
        this.load.image("verdePag5", "src/assets/paginaCases/verdePag5.png");
        this.load.image("verdePag6", "src/assets/paginaCases/verdePag6.png");
        this.load.image("verdePag7", "src/assets/paginaCases/verdePag7.png");
        this.load.image("verdePag8", "src/assets/paginaCases/verdePag8.png");

        this.load.image("amareloPag1", "src/assets/paginaCases/amareloPag1.png");
        this.load.image("amareloPag2", "src/assets/paginaCases/amareloPag2.png");
        this.load.image("amareloPag3", "src/assets/paginaCases/amareloPag3.png");
        this.load.image("amareloPag4", "src/assets/paginaCases/amareloPag4.png");

        this.load.image("vermelhoPag1", "src/assets/paginaCases/vermelhoPag1.png");
        this.load.image("vermelhoPag2", "src/assets/paginaCases/vermelhoPag2.png");

        this.load.image("tiposQueimadura", "src/assets/paginasIniciais/tipo.png");
        this.load.image("primeirograu1", "src/assets/paginasIniciais/primeirograu1.png");
        this.load.image("primeirograu2", "src/assets/paginasIniciais/primeirograu2.png");
        this.load.image("segundograu1", "src/assets/paginasIniciais/segundograu1.png");
        this.load.image("segundograu2", "src/assets/paginasIniciais/segundograu2.png");
        this.load.image("terceirograu1", "src/assets/paginasIniciais/terceirograu1.png");
        this.load.image("terceirograu2", "src/assets/paginasIniciais/terceirograu2.png");
        this.load.image("setaVoltar", "src/assets/setaVoltar.png")
    }

    create() {
        this.primeiraCena = this.scene.get("cenaPrincipal");
        this.scene.sleep("livros")
        this.maquinaEstado = new StateMachine(0);
        // this.eventoGatilho.on("tendaLivros", () => {
        // Adiciona o background e livros a serem apresentados na cena
        this.add.image(0, 0, "backgroundLivros").setOrigin(0, 0).setScale(2);
        this.livroVerde = this.add.image(100, 200, "livroVerde").setOrigin(0, 0).setScale(1.6).setInteractive();
        this.livroAmarelo = this.add.image(500, 200, "livroAmarelo").setOrigin(0, 0).setScale(1.6).setInteractive();
        this.livroVermelho = this.add.image(900, 200, "livroVermelho").setOrigin(0, 0).setScale(1.6).setInteractive();
        this.livroAmareloAberto = this.add.image(640, 350, "livroAmareloAberto").setScale(2.6).setVisible(false);
        this.livroVermelhoAberto = this.add.image(640, 350, "livroVermelhoAberto").setScale(2.6).setVisible(false);
        this.livroVerdeAberto = this.add.image(640, 350, "livroVerdeAberto").setScale(2.6).setVisible(false);
        this.paginasVerde = [this.add.image(400, 325, "verdePag1").setVisible(false), this.add.image(850, 325, "verdePag2").setVisible(false), this.add.image(400, 325, "verdePag3").setVisible(false), this.add.image(850, 325, "verdePag4").setVisible(false), this.add.image(400, 325, "verdePag5").setVisible(false), this.add.image(850, 325, "verdePag6").setVisible(false), this.add.image(400, 325, "verdePag7").setVisible(false), this.add.image(850, 325, "verdePag8").setVisible(false)];
        this.paginasAmarela = [this.add.image(400, 325, "amareloPag1").setVisible(false), this.add.image(850, 325, "amareloPag2").setVisible(false), this.add.image(400, 325, "amareloPag3").setVisible(false), this.add.image(850, 325, "amareloPag4").setVisible(false)];
        this.paginasVermelha = [this.add.image(400, 325, "vermelhoPag1").setVisible(false), this.add.image(850, 325, "vermelhoPag2").setVisible(false)];
        // inicia os objetos iniciais da cena livro
        // Adiciona efeito sonoro de virar a página
        this.efeitoSonoroVirarPagina = this.sound.add("efeitoSonoroVirarPagina", {
            volume: 0.5
        });
        const pageDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PAGE_DOWN);
        const pageUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PAGE_UP);
        
        pageDown.on("up", () => {
            console.log(this.maquinaEstado.currentState());
            this.efeitoSonoroVirarPagina.play();
            if (this.maquinaEstado.currentState() >= 2 && this.maquinaEstado.currentState() <= this.paginasVerde.length){
                this.paginasVerde[this.maquinaEstado.currentState() - 2].setVisible(false);
                this.paginasVerde[this.maquinaEstado.currentState() - 1].setVisible(false);
            }
            if (this.maquinaEstado.currentState() > 2 + this.paginasVerde.length && this.maquinaEstado.currentState() <= 2 + this.paginasVerde.length + this.paginasAmarela.length){
                this.paginasAmarela[this.maquinaEstado.currentState() - 4 - this.paginasVerde.length].setVisible(false);
                this.paginasAmarela[this.maquinaEstado.currentState() - 3 - this.paginasVerde.length].setVisible(false);
            }
            if (this.maquinaEstado.currentState() > 4 + this.paginasVerde.length + this.paginasAmarela.length && this.maquinaEstado.currentState() <= 4 + this.paginasVerde.length + this.paginasAmarela.length + this.paginasVermelha.length){
                this.paginasVermelha[this.maquinaEstado.currentState() - 6 - this.paginasVerde.length - this.paginasAmarela.length].setVisible(false);
                this.paginasVermelha[this.maquinaEstado.currentState() - 5 - this.paginasVerde.length - this.paginasAmarela.length].setVisible(false);
            }
            if (this.maquinaEstado.currentState() >= 6 + this.paginasVerde.length + this.paginasAmarela.length + this.paginasVermelha.length){
                this.primeiraCena.events.emit("tendaQuiz");
                this.scene.sleep("livros");
                this.scene.restart();
                this.primeiraCena.physics.resume();
            }
            this.maquinaEstado.transitionTo(this.maquinaEstado.currentState() + 2);
        });
        pageUp.on("up", () => {
            this.efeitoSonoroVirarPagina.play();
            if (this.maquinaEstado.currentState() >= 2 && this.maquinaEstado.currentState() <= this.paginasVerde.length){
                this.paginasVerde[this.maquinaEstado.currentState() - 2].setVisible(false);
                this.paginasVerde[this.maquinaEstado.currentState() - 1].setVisible(false);
            }
            console.log(this.maquinaEstado.currentState() >= 4 + this.paginasVerde.length, this.maquinaEstado.currentState() < 4 + this.paginasVerde.length + this.paginasAmarela.length);
            if (this.maquinaEstado.currentState() ,this.maquinaEstado.currentState() >= 4 + this.paginasVerde.length && this.maquinaEstado.currentState() < 4 + this.paginasVerde.length + this.paginasAmarela.length){
                this.paginasAmarela[this.maquinaEstado.currentState() - 4 - this.paginasVerde.length].setVisible(false);
                this.paginasAmarela[this.maquinaEstado.currentState() - 3 - this.paginasVerde.length].setVisible(false);
            }
            if (this.maquinaEstado.currentState() >= 6 + this.paginasVerde.length + this.paginasAmarela.length && this.maquinaEstado.currentState() < 6 + this.paginasVerde.length + this.paginasAmarela.length + this.paginasVermelha.length){
                this.paginasVermelha[this.maquinaEstado.currentState() - 6 - this.paginasVerde.length - this.paginasAmarela.length].setVisible(false);
                this.paginasVermelha[this.maquinaEstado.currentState() - 5 - this.paginasVerde.length - this.paginasAmarela.length].setVisible(false);
            }
            this.maquinaEstado.currentState() <= 2 ? this.maquinaEstado.transitionTo(0) : this.maquinaEstado.transitionTo(this.maquinaEstado.currentState() - 2);
        })
    }
    update(){
        if (this.maquinaEstado.currentState() == 0) {
            this.livroVerde.setVisible(true);
            this.livroAmarelo.setVisible(true);
            this.livroVermelho.setVisible(true);
            this.livroAmareloAberto.setVisible(false);
            this.livroVermelhoAberto.setVisible(false);
            this.livroVerdeAberto.setVisible(false);
            this.paginasVerde.forEach(pagina => {
                pagina.setVisible(false);
            });
            this.paginasAmarela.forEach(pagina => {
                pagina.setVisible(false);
            });
            this.paginasVermelha.forEach(pagina => {
                pagina.setVisible(false);
            });
        }
        if (this.maquinaEstado.currentState()  >= 2 && this.maquinaEstado.currentState() < 2 + this.paginasVerde.length) {
            this.livroVerde.setVisible(false);
            this.livroAmarelo.setVisible(false);
            this.livroVermelho.setVisible(false);
            this.livroVerdeAberto.setVisible(true);
            this.paginasVerde[this.maquinaEstado.currentState() - 2].setVisible(true);
            this.paginasVerde[this.maquinaEstado.currentState() - 1].setVisible(true);
        }
        if (this.maquinaEstado.currentState() > 2 + this.paginasVerde.length && this.maquinaEstado.currentState() <= 2 + this.paginasVerde.length + this.paginasAmarela.length){
            this.livroVerde.setVisible(false);
            this.livroAmarelo.setVisible(false);
            this.livroVermelho.setVisible(false);
            this.livroAmareloAberto.setVisible(true);
            this.paginasAmarela[this.maquinaEstado.currentState() - 4 - this.paginasVerde.length].setVisible(true);
            this.paginasAmarela[this.maquinaEstado.currentState() - 3 - this.paginasVerde.length].setVisible(true);
        }
        if (this.maquinaEstado.currentState() > 4 + this.paginasVerde.length + this.paginasAmarela.length && this.maquinaEstado.currentState() <= 4 + this.paginasVerde.length + this.paginasAmarela.length + this.paginasVermelha.length){
            this.livroVerde.setVisible(false);
            this.livroAmarelo.setVisible(false);
            this.livroVermelho.setVisible(false);
            this.livroVermelhoAberto.setVisible(true);
            this.paginasVermelha[this.maquinaEstado.currentState() - 6 - this.paginasVerde.length - this.paginasAmarela.length].setVisible(true);
            this.paginasVermelha[this.maquinaEstado.currentState() - 5 - this.paginasVerde.length - this.paginasAmarela.length].setVisible(true);
        }
        if (this.maquinaEstado.currentState() === this.paginasVerde.length + 2){
            this.livroVerde.setVisible(true);
            this.livroAmarelo.setVisible(true);
            this.livroVermelho.setVisible(true);
            this.livroAmareloAberto.setVisible(false);
            this.livroVermelhoAberto.setVisible(false);
            this.livroVerdeAberto.setVisible(false);
            this.paginasVerde.forEach(pagina => {
                pagina.setVisible(false);
            });
            this.paginasAmarela.forEach(pagina => {
                pagina.setVisible(false);
            });
            this.paginasVermelha.forEach(pagina => {
                pagina.setVisible(false);
            });
        }
        if (this.maquinaEstado.currentState() === this.paginasVerde.length + this.paginasAmarela.length + 4){
            this.livroVerde.setVisible(true);
            this.livroAmarelo.setVisible(true);
            this.livroVermelho.setVisible(true);
            this.livroAmareloAberto.setVisible(false);
            this.livroVermelhoAberto.setVisible(false);
            this.livroVerdeAberto.setVisible(false);
            this.paginasVerde.forEach(pagina => {
                pagina.setVisible(false);
            });
            this.paginasAmarela.forEach(pagina => {
                pagina.setVisible(false);
            });
            this.paginasVermelha.forEach(pagina => {
                pagina.setVisible(false);
            });
        }
        if (this.maquinaEstado.currentState() === this.paginasVerde.length + this.paginasAmarela.length + this.paginasVermelha.length + 6){
            this.livroVerde.setVisible(true);
            this.livroAmarelo.setVisible(true);
            this.livroVermelho.setVisible(true);
            this.livroAmareloAberto.setVisible(false);
            this.livroVermelhoAberto.setVisible(false);
            this.livroVerdeAberto.setVisible(false);
            this.paginasVerde.forEach(pagina => {
                pagina.setVisible(false);
            });
            this.paginasAmarela.forEach(pagina => {
                pagina.setVisible(false);
            });
            this.paginasVermelha.forEach(pagina => {
                pagina.setVisible(false);
            });
        }
    }
}
// !honest bar
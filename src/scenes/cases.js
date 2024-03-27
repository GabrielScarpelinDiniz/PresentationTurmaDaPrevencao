class CenaCases extends Phaser.Scene {
    constructor() {
        super({ key: 'cenaCases', active: true });
    }

    preload() {
        this.load.image('base-case', 'assets/base-case.png');
        this.load.image('botao-fechar', 'assets/botaoX.png');
        this.load.audio('efeitoSonoroBotaoX', 'assets/sounds/efeitoSonoroBotaoX.mp3') // SFX do Botao de Fechar do Case
        this.load.image('ronald', 'assets/cases/pessoas/ronald.png');
        this.load.image('maria', 'assets/cases/pessoas/maria.png');
        this.load.image('sofia', 'assets/cases/pessoas/sofia.png');
        this.load.image('apolo', 'assets/cases/pessoas/apolo.png');
        this.load.image('carlo', 'assets/cases/pessoas/carlo.png');
        this.load.image('fernanda', 'assets/cases/pessoas/fernanda.png');
        this.load.image('graca', 'assets/cases/pessoas/graca.png');
        this.load.image('henrique', 'assets/cases/pessoas/henrique.png');
        this.load.image('leonardo', 'assets/cases/pessoas/leonardo.png');
        this.load.image('monica', 'assets/cases/pessoas/monica.png');
        this.load.image('pedro', 'assets/cases/pessoas/pedro.png');
        this.load.image('penelope', 'assets/cases/pessoas/penelope.png');
        this.load.image('pepita', 'assets/cases/pessoas/pepita.png');
        this.load.image('tony', 'assets/cases/pessoas/tony.png');
        this.load.bitmapFont('pixelBitmapFont', 'assets/fonts/pixel_0.png', 'assets/fonts/pixel.fnt');
        this.load.bitmapFont('iosevka', 'assets/fonts/iosevka_0.png', 'assets/fonts/iosevka.fnt');

    }

    create() {   
        this.primeiraCena = this.scene.get('cenaPrincipal');

        // Reserva as posições de X e Y da câmera
        this.centroX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.centroY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        // Adiciona o case e botão para fechar nas coordenadas específicas tendo como referência centro X e Y
        
        this.case1 = this.add.image(this.centroX, this.centroY, 'base-case').setScale(0.50).setVisible(false).setScrollFactor(0); // Adiciona a imagem do case, quando ocorre esse overlap
        this.botaoX = this.add.sprite(this.case1.x + 210, this.case1.y - 275, 'botao-fechar').setInteractive().setScale(0.25).setVisible(false).setScrollFactor(0); // Adiciona a imagem do botao, quando ocorre esse overlap

        // Adiciona efeito sonoro do botão iniciar
        this.efeitoSonoroBotaoX = this.sound.add('efeitoSonoroBotaoX');

        this.botaoX.on("pointerover", () => {
            // Evento de passar o mouse sobre o botaoJogar
            this.input.setDefaultCursor("pointer") // Cursor vira mãozinha
        });
            
        this.botaoX.on("pointerout", () => {
            // Evento de retirar o mouse do botaoJogar
            this.input.setDefaultCursor("default") // Cursor vira setinha
        });
            
        // Evento disparado ao clicar no botão (Código temporário apenas para demonstração da funcionalidade na sprint 1)
        this.botaoX.on("pointerdown", () => {
            this.efeitoSonoroBotaoX.play();
            this.nomeTexto.destroy();
            this.casoTexto.destroy();
            this.sintomasTexto.destroy();
            this.classificacaoTexto.destroy();
            this.casoImage.destroy();
            this.case1.setVisible(false);
            this.botaoX.setVisible(false);
            this.primeiraCena.events.emit('fecharCase');    
            this.primeiraCena.physics.resume();
            });
        // Requisições de informações de outras cenas

        this.abrirCase = this.scene.get('cenaHUD');        
        const abrirCase = () => {
            const caso = this.primeiraCena.objetoCaso.caso;
            this.efeitoSonoroBotaoX.play();
            this.case1.setVisible(true);
            this.botaoX.setVisible(true);
            this.nomeTexto ? this.nomeTexto.destroy() : null;
            this.casoTexto ? this.casoTexto.destroy() : null;
            this.sintomasTexto ? this.sintomasTexto.destroy() : null;
            this.classificacaoTexto ? this.classificacaoTexto.destroy() : null;
            this.casoImage ? this.casoImage.destroy() : null;
            this.nomeTexto = this.add.text(this.centroX, this.centroY - 220, caso.nome, { fontSize: '36px', fill: '#000000', backgroundColor: "#5CE1E6", padding: {x: 10, y: 10} }).setVisible(true).setOrigin(0.5);
            this.casoImage = this.add.image(this.centroX, this.centroY - 100, caso.fotoKey).setScale(0.40).setVisible(true)
            this.casoTexto = this.add.bitmapText(this.centroX - 210, this.centroY, 'iosevka', caso.desc, 28).setVisible(true).setMaxWidth(450);
            for (let i = 0; i < caso.colored.length; i++){
                this.casoTexto.setWordTint(caso.colored[i], 1, true, 0x0000ff, 0x0000ff, 0x0000ff, 0x0000ff)
            }
            this.sintomasTexto = this.add.bitmapText(this.centroX - 210, this.centroY + this.casoTexto.height + 10, 'iosevka', "Sintomas: "+caso.sintomas, 24).setVisible(true).setMaxWidth(450);
            this.classificacaoTexto = this.add.bitmapText(this.centroX - 210, this.centroY + this.casoTexto.height + this.sintomasTexto.height + 20, 'iosevka', "Classificação: "+caso.classificacao, 24).setVisible(true).setMaxWidth(450).setWordTint(caso.classificacao.split(" ")[0], 1, true, Number(caso.classificacaoCor), Number(caso.classificacaoCor), Number(caso.classificacaoCor), Number(caso.classificacaoCor));
            this.physics.pause();
        }
        this.abrirCase.events.on('abrirCase', abrirCase, this);
        this.primeiraCena.events.on('abrirCase', abrirCase, this);
    } 
}
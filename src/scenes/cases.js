class CenaCases extends Phaser.Scene {
    constructor() {
        super({ key: 'cenaCases', active: true });
    }

    preload() {
        this.load.image('base-case', 'assets/base-case.png');
        this.load.image('botaoX', 'assets/botaoX.png');
        this.load.image('ronald', 'assets/cases/ronald.png');
    }

    create() {   
        this.primeiraCena = this.scene.get('cenaPrincipal');

        // Reserva as posições de X e Y da câmera
        this.centroX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.centroY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        // Adiciona o case e botão para fechar nas coordenadas específicas tendo como referência centro X e Y
        
        this.case1 = this.add.image(this.centroX, this.centroY, 'base-case').setScale(0.50).setVisible(false).setScrollFactor(0); // Adiciona a imagem do case, quando ocorre esse overlap
        this.botaoX = this.add.sprite(this.case1.x + 210, this.case1.y - 275, 'botaoX').setInteractive().setScale(0.25).setVisible(false).setScrollFactor(0); // Adiciona a imagem do botao, quando ocorre esse overlap

        // Requisições de informações de outras cenas

        this.abrirCase = this.scene.get('cenaHUD');        
        this.abrirCase.events.on('abrirCase', function ()
        {
            const caseData = this.primeiraCena.caseData;
            console.log(caseData[0].nome, caseData[0].fotoKey, caseData[0].desc, caseData[0].sintomas, caseData[0].classificacao);
            this.nomeTexto = this.add.text(this.centroX - 210, this.centroY - 250, caseData[0].nome, { fontSize: '36px', fill: '#000000', backgroundColor: "#5CE1E6", padding: {x: 10, y: 10} }).setVisible(true).setScrollFactor(0);
            this.casoImage = this.add.image(this.centroX, this.centroY - 100, caseData[0].fotoKey).setScale(0.40).setVisible(true).setScrollFactor(0);
            this.casoTexto = this.add.text(this.centroX - 210, this.centroY , caseData[0].desc, { fontSize: '18px', fill: '#000000', wordWrap: { width: 450 } }).setVisible(true).setScrollFactor(0);
            this.sintomasTexto = this.add.text(this.centroX - 210, this.centroY + 100, "Sintomas: "+caseData[0].sintomas, { fontSize: '16px', fill: '#000000', wordWrap: { width: 450 } }).setVisible(true).setScrollFactor(0);
            this.classificacaoTexto = this.add.text(this.centroX - 210, this.centroY + 150, "Classificação: ", { fontSize: '22px', fill: '#000000', wordWrap: { width: 450 } }).setVisible(true).setScrollFactor(0);
            this.classificacaoQueimaduraTexto = this.add.text(this.centroX - 15, this.centroY + 150, caseData[0].classificacao, { fontSize: '22px', fill: '#00FF00', wordWrap: { width: 450 } }).setVisible(true).setScrollFactor(0).setOrigin(0, 0);
            this.physics.pause();
            this.case1.setVisible(true);
            this.botaoX.setVisible(true);
            
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
                this.case1.setVisible(false);
                this.botaoX.setVisible(false);
                this.primeiraCena.physics.resume();
            });
        }, this);
    }  


}
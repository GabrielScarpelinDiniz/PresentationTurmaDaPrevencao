class CenaCases extends Phaser.Scene {
    constructor() {
        super({ key: 'cenaCases', active: true });
    }

    preload() {
        this.load.image('case1', 'assets/spritesheets/prontuario1.png');
        this.load.image('botaoX', 'assets/botaoX.png');
    }

    create() {         
        // Reserva as posições de X e Y da câmera
        this.centroX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.centroY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        // Adiciona o case e botão para fechar nas coordenadas específicas tendo como referência centro X e Y
        
        this.case1 = this.add.image(this.centroX, this.centroY, 'case1').setScale(1.25).setVisible(false).setScrollFactor(0); // Adiciona a imagem do case, quando ocorre esse overlap
        this.botaoX = this.add.sprite(this.case1.x + 183, this.case1.y - 225, 'botaoX').setInteractive().setScale(0.25).setVisible(false).setScrollFactor(0); // Adiciona a imagem do botao, quando ocorre esse overlap

        // Requisições de informações de outras cenas

        this.abrirCase = this.scene.get('cenaHUD');
        this.primeiraCena = this.scene.get('cenaPrincipal');
        
        this.abrirCase.events.on('abrirCase', function ()
        {
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
class CenaHUD extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'cenaHUD', active: true}); //

        this.score = 0;
    }

    create ()
    {
        //  Our Text object to display the Score
        //const info = this.add.text(10, 10, 'Score: 0', { font: '48px Arial', fill: '#000000' }).setVisible(false);
        this.tempoInicial = 10;
        this.fundo = this.add.rectangle(635, 30, 210, 50, 0xadd8e6).setVisible(false).setAlpha(0.8);
        this.textoTempo = this.add.text(545, 10,  (this.tempoInicial - this.tempoInicial %60)/60 + 'min ' + this.tempoInicial %60 + 's', { fontSize: '40px', fill: '#000000'}).setVisible(false); // Adiciona o texto do tempo na tela do jogo
        this.botaoCase = this.add.circle(100, 100, 50, 0xffffff, 1).setVisible(false).setInteractive();
        
        //  Grab a reference to the Game Scene
        const cenaAtual = this.scene.get('cenaPrincipal');

        //  Listen for events from it
        cenaAtual.events.on('showTimer', function ()
        {
            setTimeout( () => {
            }, this.tempoInicial * 1000); // função para chamar tela final após o tempo de jogo

            this.fundo.setVisible(true).setStrokeStyle(2, 0x1a65ac)

            this.textoTempo.setVisible(true)
            this.time.addEvent({ 
                delay: 1000, // delay de 1000 ms = 1 segundo
                callback: () => {
                    //   this.fundoTimer.setVisible(true);
                    this.textoTempo.setVisible(true);
                    if(this.tempoInicial >0) {
                        this.tempoInicial -= 1; // Decrementa o contador
                    }
                    this.textoTempo.setText((this.tempoInicial - this.tempoInicial %60)/60 + 'min ' + this.tempoInicial %60 + 's')
                    // console.log('time: ',time/1000)
                    if (this.tempoInicial == 99) {
                        //this.textoTempo.setPosition(this.player.x, 100);
                    };
                       
                    if ((this.tempoInicial - this.tempoInicial %60)/60 === 0 && this.tempoInicial <= 30) {
                        //this.textoTempo.setPosition(550, 400);
                        this.textoTempo.setColor('#ff0000');
                    };
                },
                loop: true // Atualiza o texto
              });
        }, this);

        cenaAtual.events.on('botaoCase', function ()
        {
            this.botaoCase.setVisible(true);
            console.log("teste1");
            this.botaoCase.on("pointerdown", () => {
                cenaAtual.physics.pause();
                this.events.emit('abrirCase');
                console.log("teste2");
            })
        }, this);
    }
}

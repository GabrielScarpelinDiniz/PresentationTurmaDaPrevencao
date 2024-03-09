class UIScene extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'UIScene', active: true}); //

        this.score = 0;
    }

    create ()
    {
        //  Our Text object to display the Score
        //const info = this.add.text(10, 10, 'Score: 0', { font: '48px Arial', fill: '#000000' }).setVisible(false);
        this.tempoInicial = 300;
        this.fundo = this.add.rectangle(630, 30, 150, 50, 0xadd8e6).setVisible(false).setAlpha(0.7);
        this.textoTempo = this.add.text(585,10,  this.tempoInicial + 's', { fontSize: '40px', fill: '#000000'}).setVisible(false); // Adiciona o texto do tempo na tela do jogo
        
        //  Grab a reference to the Game Scene
        const ourGame = this.scene.get('hospital');

        //  Listen for events from it
        ourGame.events.on('showTimer', function ()
        {
            this.fundo.setVisible(true).setStrokeStyle(2, 0x1a65ac)

            this.textoTempo.setVisible(true)
            this.time.addEvent({ 
                delay: 1000, // delay de 1000 ms = 1 segundo
                callback: () => {
                    //   this.fundoTimer.setVisible(true);
                    this.textoTempo.setVisible(true);
                    this.tempoInicial -= 1; // Decrementa o contador
                    this.textoTempo.setText(this.tempoInicial + 's')
                    // console.log('time: ',time/1000)
                    if (this.tempoInicial == 99) {
                        //this.textoTempo.setPosition(this.player.x, 100);
                    };
                       
                    if (this.tempoInicial < 10) {
                        //this.textoTempo.setPosition(550, 400);
                        this.textoTempo.setColor('#ff0000');
                    };
                },
                loop: true // Atualiza o texto
              });
        }, this);
    }
}

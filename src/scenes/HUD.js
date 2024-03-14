class CenaHUD extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'cenaHUD', active: true}); // Define a key da cena e a mantém ativada desde o início do ciclo de jogo

        this.score = 0;
    }
    preload () {
        this.load.image('botaoCaseBaixo', 'assets/botaoCase_baixo.png');
        this.load.image('botaoCaseAlto', 'assets/botaoCase_alto.png');
    }

    create ()
    {
        //  Our Text object to display the Score
        //const info = this.add.text(10, 10, 'Score: 0', { font: '48px Arial', fill: '#000000' }).setVisible(false);
        this.tempoInicial = 10;
        // Cria os elementos do timer
        this.fundo = this.add.rectangle(635, 30, 210, 50, 0xadd8e6).setVisible(false).setAlpha(0.8);
        this.textoTempo = this.add.text(545, 15,  (this.tempoInicial - this.tempoInicial %60)/60 + 'min ' + this.tempoInicial %60 + 's', { fontSize: '40px', fill: '#000000'}).setVisible(false); // Adiciona o texto do tempo na tela do jogo
        this.botaoCaseBaixo = this.add.image(100, 100, 'botaoCaseBaixo').setScale(3).setVisible(false).setInteractive();
        this.botaoCaseAlto = this.add.image(100, 100, 'botaoCaseAlto').setScale(3).setVisible(false).setInteractive();
        this.botaoCase = this.add.circle(100, 100, 70, 0xffffff, 1).setVisible(false).setInteractive().setAlpha(0.1);
        
        // Cria os elementos da tarefas
        this.fundoTarefa = this.add.rectangle(5, 5, 450, 50, 0xadd8e6).setVisible(false).setAlpha(0.9).setOrigin(0,0);
        this.textoTarefa = this.add.text(10, 15, "Procure a dr.Tina", { fontSize: '36px', fill: '#000000'}).setVisible(false);

        // Cria os elementos da pontuação
        this.fundoPontos = this.add.rectangle(1140, 30, 260, 50, 0xadd8e6).setVisible(false).setAlpha(0.9);
        this.textoPontos = this.add.text(1020, 15, "Pontos: 000", { fontSize: '36px', fill: '#000000'}).setVisible(false);

        //  Grab a reference to the Game Scene
        const cenaAtual = this.scene.get('cenaPrincipal');

        //Cria evento para mostrar parte da HUD
        cenaAtual.events.on('mostraTarefaInicial', function () 
        {
            this.fundoTarefa.setStrokeStyle(2, 0x1a65ac).setVisible(true);
            this.textoTarefa.setVisible(true);
            this.fundoPontos.setStrokeStyle(2, 0x1a65ac).setVisible(true);
            this.textoPontos.setVisible(true);
            
            
        }, this);
        
        //  Listen for events from it
        cenaAtual.events.on('showTimer', function ()
        {
            setTimeout( () => {
            }, this.tempoInicial * 1000); // função para chamar tela final após o tempo de jogo

            this.fundo.setVisible(true).setStrokeStyle(2, 0x1a65ac)

            this.textoTempo.setVisible(true)
            this.textoTarefa.setVisible(true).setText("Vá para a biblioteca")
            this.textoPontos.setText("Pontos: 050");

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

        cenaAtual.events.on('botaoCase', function () // Define o evento 'botaoCase'
        {
            this.botaoCase.setVisible(true);
            this.botaoCaseBaixo.setVisible(true);
            this.botaoCase.on("pointerover", () => { // Troca o ícone de reabertura do case quando o mouse está em cima
                this.botaoCaseBaixo.setVisible(false);
                this.botaoCaseAlto.setVisible(true);
            });

            this.botaoCaseBaixo.setVisible(true);
            console.log("teste1");
            this.botaoCase.on("pointerout", () => { // Retorna o ícone de reabertura do case quando o mouse está em cima
                this.botaoCaseBaixo.setVisible(true);
                this.botaoCaseAlto.setVisible(false);
            });

            this.botaoCase.on("pointerdown", () => { // Disparo da cena 'abrirCase' quando clicar no botão do case
                cenaAtual.physics.pause();
                this.events.emit('abrirCase');
                console.log("teste2");
            });
        }, this);
    }
}

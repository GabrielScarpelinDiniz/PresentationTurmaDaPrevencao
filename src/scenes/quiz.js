class Quiz extends Phaser.Scene {
    constructor() {
        super({
            key: 'quiz', // Chave da cena
            active: true // Define a cena como ativa
        })
    }

    preload() {
        // Pré-carregamento de imagens
        this.load.image('x', 'assets/botaoX.png'); // Carrega a imagem do botão "X"
        this.load.image('simbolo', 'assets/simboloquiz.png'); // Carrega a imagem do símbolo do quiz
    }

    create() {
        this.alternativaRespondida = false;
        this.primeiraCena = this.scene.get('cenaPrincipal'); // Obtém a referência para a cena 'cenaPrincipal'
        this.cenaHUD = this.scene.get('cenaHUD'); // Obtém a referência para a cena 'cenaPrincipal'
        this.scene.sleep();
        // Adicionando o fundo branco e a borda retangulas
        const bgWhite = this.add.rectangle(gameDimensions.width / 2, gameDimensions.height / 2, 700, 500, 0xffffff).setStrokeStyle(2, 0x000000);
        
        // Centralizando a imagem do símbolo
        this.add.image(bgWhite.x, bgWhite.y - 130, 'simbolo').setScale(0.5);
        
        // Adicionando a pergunta à cena
        this.primeiraCena.events.on('abrirQuiz', () => {
            const caso = this.primeiraCena.objetoCaso.caso;
            this.add.text(bgWhite.x, bgWhite.y - 40, caso.quiz.pergunta, {
                fontSize: '20px',
                color: '#000',
                fontFamily: 'Arial',
                align: 'center',
                wordWrap: {
                    width: 500
                }
            }).setOrigin(0.5);
            
            // Adicionando as alternativas à cena e suas aparências na interface
            const alternativa1 = this.add.text(bgWhite.x, bgWhite.y + 60, caso.quiz.alternativas[0], {
                fontSize: '23px',
                color: '#000',
                fontFamily: 'Arial',
                backgroundColor: '#008CCC',
                padding: {
                    x: 10,
                    y: 10
                },
                wordWrap: {
                    width: 500
                },
                align: 'center'
            }).setOrigin(0.5).setInteractive().on('pointerdown', () => {
                if (!this.alternativaRespondida){
                    this.verificarResposta(0, caso.quiz.alternativaCorreta);
                    this.primeiraCena.objetoCaso.status = false;
                    this.primeiraCena.objetoCaso.caso = null;
                    this.alternativaRespondida = true;
                    this.cenaHUD.events.emit('quiz-respondido')

                }
            });
    
            const alternativa2 = this.add.text(bgWhite.x, bgWhite.y + 140, caso.quiz.alternativas[1], {
                fontSize: '21px',
                color: '#000',
                fontFamily: 'Arial',
                backgroundColor: '#FFC107',
                padding: {
                    x: 10,
                    y: 10
                },
                wordWrap: {
                    width: 500
                },
                align: 'center'
            }).setOrigin(0.5).setInteractive().on('pointerdown', () => {
                if (!this.alternativaRespondida){
                    this.verificarResposta(1, caso.quiz.alternativaCorreta);
                    this.primeiraCena.objetoCaso.status = false;
                    this.primeiraCena.objetoCaso.caso = null;
                    this.alternativaRespondida = true;
                    this.cenaHUD.events.emit('quiz-respondido')

                }
            });
    


            // Adicionando a explicação à cena e configurações estéticas
            this.explicacaoText = this.add.text(bgWhite.x, bgWhite.y + 200, '', {
                fontSize: '16px',
                color: '#000',
                fontFamily: 'Arial',
                align: 'center',
                wordWrap: {
                    width: 500
                }
            }).setOrigin(0.5);
        })


        // Adicionando o botão "X" para voltar à cena principal
        const botaoX = this.add.image(bgWhite.x + 300, bgWhite.y - 200, 'x').setScale(0.3).setInteractive();
        botaoX.on('pointerdown', () => {
            // Pausa a cena atual ('quiz')
            this.alternativaRespondida = false;
            this.cenaHUD.textoTempoDescontado.setVisible(false);
            this.cenaHUD.fundoTempoDescontado.setVisible(false);

            this.scene.sleep('quiz');
            // Reinicia a cena para cada vez que ocorre o overlap com a tenda o quiz voltar a sua forma padrão para que o jogador possa jogar de novo
            this.scene.restart();
            // Resume a física na cena 'cenaPrincipal', é útil se a cena principal contiver objetos físicos em movimento ou interações físicas que precisem ser retomadas após o término do quiz
            this.primeiraCena.physics.resume();
        });
    }

    verificarResposta(resposta, alternativaCorreta) {
        // Verifica se a resposta está correta
        if (resposta === alternativaCorreta) {
            this.cenaHUD.atualizarPontuacao(10);
            // Define a mensagem de explicação para resposta correta
            this.explicacaoText.setText('Parabéns! Usar luvas de proteção térmica de alta qualidade evita acidentes graves na cozinha');
            // Define a cor do texto como verde
            this.explicacaoText.setColor('#008000');
        } else {
            this.cenaHUD.atualizarTempo(10);
            // Define a mensagem de explicação para resposta incorreta
            this.explicacaoText.setText('Ops! Essa resposta está incorreta. Estar distraído enquanto cozinha pode gerar acidentes graves.');
            // Define a cor do texto como vermelho
            this.explicacaoText.setColor('#FF0000');
        }
    }
    
}

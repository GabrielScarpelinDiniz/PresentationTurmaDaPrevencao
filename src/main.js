
// Cria as configurações para Phaser.Game
const gameDimensions = {
    width: 2000,
    height: 2000,
}
const config = {
    type: Phaser.AUTO, // Ajusta o renderizador automaticamente (WebGL e Canvas)
    width: gameDimensions.width,  // Ajusta a largura para 1334 pixels (temporário)
    height: gameDimensions.height, // Ajusta a altura
    scale: {
        mode: Phaser.Scale.FIT, // Ajusta a tela para mobile
    },
    scene: [
        MenuPrincipal, CenaHospital
    ]
};

// Cria o jogo passando a variável config como atributos
const game = new Phaser.Game(config);



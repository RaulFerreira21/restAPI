const fs = require('fs');
const path = require('path');

module.exports = (caminho, nomeDoArquivo, callbackImagem) => {
    const tipo = path.extname(caminho);
    const tiposValidos = ['png', 'jpg', 'jpeg'];
    const isValid = tiposValidos.indexOf(tipo.substring(1)) !== -1;

    if (isValid) {

        const novoCaminho = `./assets/imagens/${nomeDoArquivo}${tipo}`;

        fs.createReadStream(caminho,)
            .pipe(fs.createWriteStream(novoCaminho))
            .on('finish', () => callbackImagem(false, novoCaminho));

    } else {

        const erro = "Tipo é invalido";
        console.log('Erro, tipo Inválido!!');
        callbackImagem(erro);
    }
}
const Atendimento = require('../MODELS/atendimentos-model');

module.exports = app => {
    app.get('/', (req, res) => {
        res.send('Servidor rodando, tudo OK');
    });

    app.get('/atendimentos', (req, res) => {
        Atendimento.lista().then(resultados => res.status(200).json(resultados)).catch(erros => res.status(400).json(erros));
    });

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);

        Atendimento.buscaPorId(id, res);

        // res.send('ok');
    })

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body;

        Atendimento.adiciona(atendimento).then((atendimentoCadastrado) => {
            res.status(201).json(atendimentoCadastrado);
        }).catch((erros)=>{
            res.status(400).json(erros)
        });

    });

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body;

        Atendimento.alterar(id, valores, res);
    });

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);

        Atendimento.deletar(id, res);
    })
}
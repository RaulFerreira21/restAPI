module.exports = app => {
    app.get('/', (req, res)=>{
        res.send('Servidor rodando, tudo OK');
    });
    
    app.get('/atendimentos', (req, res)=>{
        res.send('Você está na rota de atendimento');
    });

    app.post('/atendimentos', (req, res) => {
        console.log(req.body);
        res.send('Você está mandando um post na rota de atendimento')
    });
}
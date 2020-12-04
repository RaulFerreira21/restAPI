const axios = require('axios');
const moment = require('moment');
const conexao = require('../infraestrutura/database/conexao');
const repositorio = require('../repositórios/atendimentos-repo');



class Atendimento {
    constructor(){

        this.dataValida = ({data, dataCriacao}) => moment(data).isSameOrAfter(dataCriacao);
        this.clienteValido = (tamanho) => tamanho >= 4;
        this.valida = (parametros) => {
            this.validacoes.filter(campo =>{
                const { nome } = campo;
                const parametro = parametros[nome];

                return !campo.valido(parametro);
            });
        }

        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataValida,
                mensagem: 'Data deve ser maior ou igual a data Atual',
            },
            {
                nome: 'cliente',
                valido: this.clienteValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres',
            }
        ];
    }

    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

        const parametros = {
            data: {data, dataCriacao},
            cliente: {tamanho: atendimento.cliente.length}
        }

        const erros = this.valida(parametros);
        const existeErros = erros.length;
        console.log(existeErros)

        if (existeErros) {
            return new Promise((resolve, reject) => {
                reject(erros);
            });
        } else {

            const atendimentoDatado = { ...atendimento, dataCriacao, data };

            return repositorio.adiciona(atendimentoDatado).then((resultados) => {
                const id = resultados.insertId;
                return { ...atendimento.id, id }
            });
        }

    }

    lista() {
        return repositorio.lista();
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;

        conexao.query(sql, async (erro, resultados) => {
            const atendimento = resultados[0];
            const cpf = atendimento.cliente;
            if (erro) {
                res.status(400).json(erro)
            } else {
                const { data } = await axios.get(`http://localhost:8082/${cpf}`);
                atendimento.cliente = data;
                res.status(200).json(atendimento);
            }
        });
    }

    alterar(id, valores, res) {
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }

        const sql = 'UPDATE Atendimentos SET ? WHERE id=?';

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json([...valores, id]);
            }
        });
    }

    deletar(id, res) {
        const sql = 'DELETE FROM Atendimentos WHERE id=?';
        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(resultados)
            } else {
                res.status(200).json({ id })
            }
        })
    }
}

module.exports = new Atendimento;
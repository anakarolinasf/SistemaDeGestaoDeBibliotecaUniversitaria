const Emprestimo = require('../models/Emprestimo');
const Usuario = require('../models/Usuario');
const Livro = require('../models/Livro');

module.exports = {

    async listar(req, res) {
        const emprestimos = await Emprestimo.findAll({
            include: [Usuario, Livro]
        });
        res.render('emprestimos/listar', { emprestimos });
    },

    async criarForm(req, res) {
        const usuarios = await Usuario.findAll();
        const livros = await Livro.findAll();
        res.render('emprestimos/criar', { usuarios, livros });
    },

    async salvar(req, res) {
        const { id_usuario, id_livro, data_retirada, data_devolucao } = req.body;

        const devolucaoFinal = data_devolucao === "" ? null : data_devolucao;

        if (!data_retirada || data_retirada === "") {
            return res.send("Erro: A Data de Retirada é obrigatória!");
        }

        try {
            await Emprestimo.create({
                id_usuario: id_usuario,
                id_livro: id_livro,
                data_retirada: data_retirada,
                data_devolucao: devolucaoFinal 
            });

            res.redirect('/emprestimos');

        } catch (error) {
            console.log("---------------------------------------------------");
            console.log("ERRO AO SALVAR EMPRÉSTIMO:");
            console.log(error.message); 
            console.log("---------------------------------------------------");
            
            res.status(500).send(`Erro ao salvar: ${error.message}`);
        }
    },

    async editarForm(req, res) {
        const emprestimo = await Emprestimo.findByPk(req.params.id);
        const usuarios = await Usuario.findAll();
        const livros = await Livro.findAll();

        res.render('emprestimos/editar', { emprestimo, usuarios, livros });
    },

    async editar(req, res) {
        
        const { id_emprestimo, id_usuario, id_livro, data_retirada, data_devolucao, multa } = req.body;

        const devolucaoFinal = data_devolucao === "" ? null : data_devolucao;

        try {
            await Emprestimo.update(
                { 
                    id_usuario: id_usuario, 
                    id_livro: id_livro, 
                    data_retirada: data_retirada, 
                    data_devolucao: devolucaoFinal,
                    multa: multa 
                },
                { 
                    where: { id_emprestimo: id_emprestimo } 
                }
            );

            res.redirect('/emprestimos');

        } catch (error) {
            console.log("---------------------------------------------------");
            console.log("ERRO AO EDITAR EMPRÉSTIMO:");
            console.log(error.message);
            console.log("---------------------------------------------------");
            res.status(500).send(`Erro ao editar: ${error.message}`);
        }
    },

    async devolver(req, res) {
        const emprestimo = await Emprestimo.findByPk(req.params.id);

        const hoje = new Date();
        let multa = 0;

        const prevista = new Date(emprestimo.data_devolucao);
        if (hoje > prevista) multa = 5.00;

        await Emprestimo.update(
            { data_devolucao: hoje, multa },
            { where: { id_emprestimo: req.params.id } }
        );

        res.redirect('/emprestimos');
    }
};

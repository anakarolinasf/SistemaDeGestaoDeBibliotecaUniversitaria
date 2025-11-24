const Usuario = require('../models/Usuario');
const Emprestimo = require('../models/Emprestimo'); 

module.exports = {

    async listar(req, res) {
        const usuarios = await Usuario.findAll();
        res.render('usuarios/listar', { usuarios });
    },

    async criarForm(req, res) {
        res.render('usuarios/criar');
    },

    async salvar(req, res) {
        const { nome, matricula, email } = req.body;
        await Usuario.create({ nome, matricula, email });
        res.redirect('/usuarios');
    },

    async editarForm(req, res) {
        const id = req.params.id;
        const usuario = await Usuario.findByPk(id);
        res.render('usuarios/editar', { usuario });
    },

    async editar(req, res) {
        const { id_usuario, nome, matricula, email } = req.body;

        try {
            await Usuario.update(
                { nome, matricula, email },
                { where: { id_usuario: id_usuario } }
            );
            res.redirect('/usuarios');
        } catch (error) {
            console.log("Erro ao editar usuário:", error);
            res.status(500).send("Erro ao editar usuário.");
        }
    },

    async deletar(req, res) {
        const id = req.params.id;

        try {
            const temReservas = await Emprestimo.count({ 
                where: { id_usuario: id } 
            });

            if (temReservas > 0) {
                return res.send(`
                    <script>
                        alert("Não é possível excluir este usuário pois ele possui uma reserva ativa ou histórico de empréstimos!");
                        window.location.href = "/usuarios";
                    </script>
                `);
            }
            await Usuario.destroy({
                where: { id_usuario: id }
            });

            res.redirect('/usuarios');

        } catch (error) {
            console.log("Erro ao excluir usuário:", error);
            res.send(`
                <script>
                    alert("Erro ao tentar excluir: ${error.message}");
                    window.location.href = "/usuarios";
                </script>
            `);
        }
    }
};
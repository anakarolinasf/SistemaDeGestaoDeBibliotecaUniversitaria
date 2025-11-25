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

        // === VALIDAÇÕES ===

        // Nome só pode ter letras e espaços
        if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nome)) {
            return res.send(`
                <script>
                    alert("Erro: O nome não pode conter números ou caracteres inválidos!");
                    window.location.href = "/usuarios/criar";
                </script>
            `);
        }

        // Matrícula só pode ter números
        if (!/^[0-9]+$/.test(matricula)) {
            return res.send(`
                <script>
                    alert("Erro: A matrícula deve conter apenas números!");
                    window.location.href = "/usuarios/criar";
                </script>
            `);
        }

        // Email válido
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.send(`
                <script>
                    alert("Erro: Informe um email válido!");
                    window.location.href = "/usuarios/criar";
                </script>
            `);
        }

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


        if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nome)) {
            return res.send(`
                <script>
                    alert("Erro: O nome não pode conter números ou caracteres inválidos!");
                    window.location.href = "/usuarios";
                </script>
            `);
        }

        if (!/^[0-9]+$/.test(matricula)) {
            return res.send(`
                <script>
                    alert("Erro: A matrícula deve conter apenas números!");
                    window.location.href = "/usuarios";
                </script>
            `);
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.send(`
                <script>
                    alert("Erro: Informe um email válido!");
                    window.location.href = "/usuarios";
                </script>
            `);
        }

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

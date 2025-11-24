const Livro = require('../models/Livro');
const Emprestimo = require('../models/Emprestimo');

module.exports = {

    async listar(req, res) {
        const livros = await Livro.findAll();
        res.render('livros/listar', { livros });
    },

    async criarForm(req, res) {
        res.render('livros/criar');
    },

    async salvar(req, res) {
        const { titulo, autor, ano_publicacao, categoria } = req.body;
        await Livro.create({ titulo, autor, ano_publicacao, categoria });
        res.redirect('/livros');
    },

    async editarForm(req, res) {
        const id = req.params.id;
        const livro = await Livro.findByPk(id);
        res.render('livros/editar', { livro });
    },

    async editar(req, res) {
        const { id_livro, titulo, autor, ano_publicacao, categoria } = req.body;

        try {
            await Livro.update(
                { titulo, autor, ano_publicacao, categoria },
                { where: { id_livro: id_livro } }
            );
            res.redirect('/livros');
        } catch (error) {
            console.log("Erro ao editar livro:", error);
            res.status(500).send("Erro ao editar: " + error.message);
        }
    },

    async deletar(req, res) {
        const id = req.params.id;

        try {
            const temEmprestimos = await Emprestimo.count({ 
                where: { id_livro: id } 
            });
            if (temEmprestimos > 0) {
                return res.send(`
                    <script>
                        alert("Não é possível excluir este livro pois ele possui registros de empréstimos/reservas!");
                        window.location.href = "/livros";
                    </script>
                `);
            }

            await Livro.destroy({
                where: { id_livro: id }
            });

            res.redirect('/livros');

        } catch (error) {
            console.log("Erro ao excluir livro:", error);
            res.send(`
                <script>
                    alert("Erro ao tentar excluir: ${error.message}");
                    window.location.href = "/livros";
                </script>
            `);
        }
    }
};
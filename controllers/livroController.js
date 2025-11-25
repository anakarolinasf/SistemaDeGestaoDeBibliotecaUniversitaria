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

        // === VALIDAÇÕES ===

        if (!titulo || titulo.trim() === "") {
            return res.send(`
                <script>
                    alert("Erro: O título do livro não pode ser vazio!");
                    window.location.href = "/livros/criar";
                </script>
            `);
        }

        if (autor && !/^[A-Za-zÀ-ÿ\s]+$/.test(autor)) {
            return res.send(`
                <script>
                    alert("Erro: O autor deve conter apenas letras!");
                    window.location.href = "/livros/criar";
                </script>
            `);
        }

        if (ano_publicacao && !/^[0-9]+$/.test(ano_publicacao)) {
            return res.send(`
                <script>
                    alert("Erro: O ano de publicação deve ser apenas números!");
                    window.location.href = "/livros/criar";
                </script>
            `);
        }

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

        // === VALIDAÇÕES ===
        if (!titulo || titulo.trim() === "") {
            return res.send(`
                <script>
                    alert("Erro: O título do livro não pode ser vazio!");
                    window.location.href = "/livros";
                </script>
            `);
        }

        if (autor && !/^[A-Za-zÀ-ÿ\s]+$/.test(autor)) {
            return res.send(`
                <script>
                    alert("Erro: O autor deve conter apenas letras!");
                    window.location.href = "/livros";
                </script>
            `);
        }

        if (ano_publicacao && !/^[0-9]+$/.test(ano_publicacao)) {
            return res.send(`
                <script>
                    alert("Erro: O ano de publicação deve conter apenas números!");
                    window.location.href = "/livros";
                </script>
            `);
        }

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

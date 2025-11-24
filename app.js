const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./models/db');

const usuarioController = require('./controllers/usuarioController');
const livroController = require('./controllers/livroController');
const emprestimoController = require('./controllers/emprestimoController');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// ROTAS

app.get('/', (req, res) => res.render('home/index'));

// Usuário
app.get('/usuarios', usuarioController.listar);
app.get('/usuarios/criar', usuarioController.criarForm);
app.post('/usuarios/salvar', usuarioController.salvar);
app.get('/usuarios/editar/:id', usuarioController.editarForm);
app.post('/usuarios/editar', usuarioController.editar);
app.get('/usuarios/deletar/:id', usuarioController.deletar);

// Livro
app.get('/livros', livroController.listar);
app.get('/livros/criar', livroController.criarForm);
app.post('/livros/salvar', livroController.salvar);
app.get('/livros/editar/:id', livroController.editarForm);
app.post('/livros/editar', livroController.editar);
app.get('/livros/deletar/:id', livroController.deletar);

// Empréstimo
app.get('/emprestimos', emprestimoController.listar);
app.get('/emprestimos/criar', emprestimoController.criarForm);
app.post('/emprestimos/salvar', emprestimoController.salvar);
app.get('/emprestimos/editar/:id', emprestimoController.editarForm);
app.post('/emprestimos/editar', emprestimoController.editar);
app.get('/emprestimos/devolver/:id', emprestimoController.devolver);

app.listen(3000, async () => {
    try {
        await db.authenticate();
        console.log("Conectado ao MySQL");
        console.log("🚀 Rodando em http://localhost:3000");
    } catch (error) {
        console.error("❌ Erro no banco:", error);
    }
});

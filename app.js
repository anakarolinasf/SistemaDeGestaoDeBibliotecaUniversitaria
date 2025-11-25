const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./models/db');

const usuariosRouter = require('./routes/usuarios');
const livrosRouter = require('./routes/livros');
const emprestimosRouter = require('./routes/emprestimos');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// ROTAS

app.get('/', (req, res) => res.render('home/index'));

// modular routers
app.use('/usuarios', usuariosRouter);
app.use('/livros', livrosRouter);
app.use('/emprestimos', emprestimosRouter);

app.listen(3000, async () => {
    try {
        await db.authenticate();
        console.log("Conectado ao MySQL");
        console.log("Rodando em http://localhost:3000");
    } catch (error) {
        console.error("Erro no banco:", error);
    }
});

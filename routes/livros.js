const express = require('express');
const router = express.Router();

const livroController = require('../controllers/livroController');

// Rota base: /livros
router.get('/', livroController.listar);
router.get('/criar', livroController.criarForm);
router.post('/salvar', livroController.salvar);
router.get('/editar/:id', livroController.editarForm);
router.post('/editar', livroController.editar);
router.get('/deletar/:id', livroController.deletar);

module.exports = router;

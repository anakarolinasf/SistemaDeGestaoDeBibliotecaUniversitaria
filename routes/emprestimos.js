const express = require('express');
const router = express.Router();

const emprestimoController = require('../controllers/emprestimoController');

// Rota base: /emprestimos
router.get('/', emprestimoController.listar);
router.get('/criar', emprestimoController.criarForm);
router.post('/salvar', emprestimoController.salvar);
router.get('/editar/:id', emprestimoController.editarForm);
router.post('/editar', emprestimoController.editar);
router.get('/devolver/:id', emprestimoController.devolver);

module.exports = router;

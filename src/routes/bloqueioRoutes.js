const express = require('express');
const router = express.Router();
const bloqueioController = require('../controllers/bloqueioController');
const authMiddleware = require('../middleware/authMiddleware'); // <-- adicionar essa linha

router.use(authMiddleware); // <-- proteger todas as rotas abaixo

// Rotas para bloquear e desbloquear dias
router.post('/dias', bloqueioController.bloquearDia);
router.get('/dias', bloqueioController.listarDiasBloqueados);
router.delete('/dias/:id', bloqueioController.desbloquearDia);

// Rotas para bloquear e desbloquear horários
router.post('/horarios', bloqueioController.bloquearHorario);
router.get('/horarios', bloqueioController.listarHorariosBloqueados);
router.delete('/horarios/:id', bloqueioController.desbloquearHorario);

module.exports = router;


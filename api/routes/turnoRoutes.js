const {Router} = require('express');
const {buscarTurno, turnosPorId, agregarTurno, modificarTurno, descartarTurno} = require('../controllers/turnoController');
const routes = Router();
routes.get('/', buscarTurno);
routes.get('/:id', turnosPorId);
routes.post('', agregarTurno);
routes.put('/:id', modificarTurno);
routes.delete('/:id', descartarTurno);

module.exports = routes;
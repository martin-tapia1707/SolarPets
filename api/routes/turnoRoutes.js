const {Router} = require('express');
const {buscarTurno, turnosPorId, agregarTurno, modificarTurno, descartarTurno, clienteTurnos} = require('../controllers/turnoController');
const routes = Router();

//Midlewares
const { auth } = require('../middlewares/auth.js');

//Rutas

routes.get('/lista', auth, clienteTurnos);
routes.get('/', buscarTurno);
routes.get('/:id', turnosPorId);
routes.post('', auth, agregarTurno);
routes.put('/:id', modificarTurno);
routes.delete('/:id', descartarTurno);

module.exports = routes;
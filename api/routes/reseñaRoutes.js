const { Router } = require('express');
const { mostrarReseñas, reseñaPorId, publicarReseña, eliminarReseña, clienteReseña } = require('../controllers/reseñaController.js');
const routes = Router();

const { auth } = require('../middlewares/auth.js')

routes.get('/', mostrarReseñas);
routes.get('/:id', reseñaPorId);
routes.get('/producto/:idProducto', clienteReseña)
routes.post('/', auth, publicarReseña);
routes.delete('/:id', auth, eliminarReseña);

module.exports = routes;
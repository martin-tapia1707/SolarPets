const { Router } = require('express');
const { mostrarReseñas, reseñaPorId, publicarReseña, eliminarReseña } = require('../controllers/reseñaController.js');
const routes = Router();
routes.get('/', mostrarReseñas);
routes.get('/:id', reseñaPorId);
routes.post('/', publicarReseña);
routes.delete('/:id', eliminarReseña);

module.exports = routes;
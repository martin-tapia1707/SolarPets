const { Router } = require('express');
const { mostrarMascotas, mascotasPorId, publicarMascota, actualizarMascota, eliminarMascota } = require('../controllers/mascotaController.js');
const routes = Router();
routes.get('/', mostrarMascotas);
routes.get('/:id', mascotasPorId);
routes.post('/', publicarMascota);
routes.put('/:id', actualizarMascota);
routes.delete('/:id', eliminarMascota);

module.exports = routes;
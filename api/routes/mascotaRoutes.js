const { Router } = require('express');
const { mostrarMascotasAdoptar, mascotasPorId, agregarMascota, actualizarMascota, eliminarMascota } = require('../controllers/mascotaController.js');
const routes = Router();
routes.get('/', mostrarMascotasAdoptar);
routes.get('/:id', mascotasPorId);
routes.post('/', agregarMascota);
routes.put('/:id', actualizarMascota);
routes.delete('/:id', eliminarMascota);

module.exports = routes;
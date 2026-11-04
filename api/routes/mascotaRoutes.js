const { Router } = require('express');
const { mostrarMascotasAdoptar, mostrarMascotas, mascotasPorId, agregarMascota, actualizarMascota, eliminarMascota } = require('../controllers/mascotaController.js');
const routes = Router();
routes.get('/ma', mostrarMascotasAdoptar); //Mascota para adoptar
routes.get('/md', mostrarMascotas)         //Mascota con dueño
routes.get('/:id', mascotasPorId);
routes.post('/', agregarMascota);
routes.put('/:id', actualizarMascota);
routes.delete('/:id', eliminarMascota);

module.exports = routes;
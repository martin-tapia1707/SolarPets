const { Router } = require('express');
const { mostrarRoles, rolesPorNombre, crearRol, actualizarRol, borrarRol } = require('../controllers/rolController.js');
const routes = Router();
routes.get('/', mostrarRoles);
routes.get('/:nombre', rolesPorNombre);
routes.post('/', crearRol);
routes.put('/:id', actualizarRol);
routes.delete('/:id', borrarRol);

module.exports = routes;
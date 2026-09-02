const { Router } = require('express');
const { mostrarCliente, clientePorId, registrarCliente, modificarCliente, eliminarCliente } = require('../controllers/clienteController.js');
const routes = Router() ;
routes.get ('/', mostrarCliente);
routes.get ('/:id', clientePorId);
routes.post('/', registrarCliente);
routes.put('/:id', modificarCliente);
routes.delete('/:id', eliminarCliente);

module.exports = routes;
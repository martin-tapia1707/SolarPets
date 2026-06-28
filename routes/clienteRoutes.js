const { Router } = require('express');
const { mostrarCliente } = require('../controllers/clienteController.js');
const routes = Router() ;
routes.get ('/', mostrarCliente);

module.exports = routes;
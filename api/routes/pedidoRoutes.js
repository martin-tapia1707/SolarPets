const { Router } = require('express');
const { mostrarPedidos, pedidosPorId, realizarPedido } = require('../controllers/pedidoController.js');
const routes = Router();
routes.get('/', mostrarPedidos);
routes.get('/:id', pedidosPorId);
routes.post('/', realizarPedido);

module.exports = routes;
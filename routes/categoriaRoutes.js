const { Router } = require('express');
const { mostrarCategorias, categoriaId, agregarCategoria, actualizarCategoria, eliminarCategoria } = require('../controllers/categoriaController.js');
const routes = Router();

routes.get('/', mostrarCategorias);
routes.get('/:id', categoriaId);
routes.post('/', agregarCategoria);
routes.put('/:id', actualizarCategoria);
routes.delete("/:id", eliminarCategoria);

module.exports = routes;
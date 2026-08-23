const { Router } = require('express');
const { mostrarSubCategorias, subCategoriasPorId, añadirSubCategoria, actualizarSubCategoria, eliminarSubCategoria } = require('../controllers/subcategoriaController.js');
const routes = Router();
routes.get('/', mostrarSubCategorias);
routes.get('/:id', subCategoriasPorId);
routes.post('/', añadirSubCategoria);
routes.put('/:id', actualizarSubCategoria);
routes.delete('/:id', eliminarSubCategoria);

module.exports = routes;
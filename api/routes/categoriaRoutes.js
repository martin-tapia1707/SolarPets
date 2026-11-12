const { Router } = require('express');
const { mostrarCategorias, categoriaId, agregarCategoria, actualizarCategoria, eliminarCategoria, filtro, filtroPulsado } = require('../controllers/categoriaController.js');
const routes = Router();

routes.get('/', mostrarCategorias);
routes.get('/:id', categoriaId);
routes.post('/', agregarCategoria);
routes.post('/filtro', filtro);
routes.post('/filtroPulsado', filtroPulsado);
routes.put('/:id', actualizarCategoria);
routes.delete("/:id", eliminarCategoria);

module.exports = routes;
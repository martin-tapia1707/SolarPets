const { Router } = require('express');
const { mostrarProductos,
    productoId,
    agregarProducto,
    actualizarProducto,
    eliminarProducto
 } = require('../controllers/productoController.js');
const routes = Router() ;

routes.get ('/', mostrarProductos);
routes.get ('/:id', productoId);

routes.post ('/', agregarProducto);

routes.put( '/:id', actualizarProducto);

routes.delete ('/:id', eliminarProducto);

module.exports = routes;
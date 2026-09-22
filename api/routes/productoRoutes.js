const { Router } = require('express');
const { mostrarProductos, productoId, agregarProducto, actualizarProducto, eliminarProducto } = require('../controllers/productoController.js');

// MIDDLEWARES

const { auth } = require('../middlewares/auth.js');
const { isAdmin } = require('../middlewares/isAdmin.js');

const routes = Router() ;

routes.get ('/admin/productos', auth, isAdmin, mostrarProductos); // routes.get('/', auth, mostrarProductos);
routes.get ('/:id', productoId); // RUTA ORIGINAL, LA CAMBIO PARA TESTEAR MIDDLEWARE
routes.post ('/', agregarProducto);
routes.put( '/:id', actualizarProducto);
routes.delete ('/:id', eliminarProducto);

module.exports = routes;
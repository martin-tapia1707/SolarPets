const { Router } = require('express');
const { asignarCarrito, agregarProducto, comprar, eliminarProducto, obtenerProductos } = require('../controllers/carritoController.js');
const { verificarLogin } = require('../middlewares/auth.js');
const routes = Router();

routes.get("/obtenerProductos", verificarLogin, obtenerProductos);
routes.post("/asignar", verificarLogin, asignarCarrito);
routes.post("/agregarProducto", verificarLogin, agregarProducto);
routes.patch("/comprar", verificarLogin, comprar);
routes.delete("/eliminarProducto", verificarLogin, eliminarProducto);

module.exports = routes;
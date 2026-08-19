const { Router } = require("express");
const {
    mostrarProveedores,
    proveedorId,
    agregarProveedor,
    actualizarProveedor,
    eliminarProveedor 
} = require("../controllers/proveedorController.js");
const routes = Router();

routes.get ('/', mostrarProveedores);
routes.get ('/:id', proveedorId);

routes.post ('/', agregarProveedor);

routes.put ('/:id', actualizarProveedor);

routes.delete ('/:id', eliminarProveedor);

module.exports = routes;
const { Router } = require('express');

const { mostrarCliente, clientePorId, registrarCliente, modificarCliente, eliminarCliente, Register, Login } = require('../controllers/clienteController.js');

// MIDDLEWARES

const { auth } = require('../middlewares/auth.js');
const { isAdmin } = require('../middlewares/isAdmin.js');
const { sameId } = require('../middlewares/sameId.js');

// RUTAS

const routes = Router();
routes.get ('/', auth, mostrarCliente);
routes.get ('/:id', auth, sameId, clientePorId);
routes.post('/', auth, registrarCliente); // - martin
routes.put('/:id', auth, modificarCliente);
routes.delete('/:id', auth, eliminarCliente); // LES PONGO EL AUTH TEMPORALMENTE PARA PRACTICAR, DESPUES LOS SACO SI SON INNECESARIOS
routes.post('/register', Register);
routes.post('/login', Login);

module.exports = routes;
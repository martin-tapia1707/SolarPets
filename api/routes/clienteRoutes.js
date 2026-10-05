const { Router } = require('express');

const { mostrarCliente, clientePorId, buscarRol, modificarCliente, eliminarCliente, Register, Login, Perfil } = require('../controllers/clienteController.js');

// MIDDLEWARES

const { auth } = require('../middlewares/auth.js');

// RUTAS

const routes = Router();
routes.get ('/', auth, mostrarCliente);
routes.get ('/idRol/:idRol', buscarRol);
routes.get('/perfil', auth, Perfil);
routes.get ('/:id', auth, clientePorId);
routes.put('/:id', modificarCliente);
routes.delete('/:id', auth, eliminarCliente);
routes.post('/register', Register);
routes.post('/login', Login);

module.exports = routes;
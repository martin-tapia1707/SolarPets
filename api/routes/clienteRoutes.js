const { Router } = require('express');

const { mostrarCliente, clientePorId, buscarRol, modificarCliente, eliminarCliente, Register, Login, Perfil, EditProfile, recuperar, restablecerCon } = require('../controllers/clienteController.js');

// MIDDLEWARES

const { auth, verificarExpiracion } = require('../middlewares/auth.js');

// RUTAS

const routes = Router();
routes.get ('/', auth, mostrarCliente);
routes.get('/perfil', auth, Perfil);
routes.get ('/idRol/:idRol', buscarRol);
routes.get ('/:id', auth, clientePorId);


routes.put('/:id', modificarCliente);

routes.patch('/perfil', auth, EditProfile);
routes.patch('/restablecer', verificarExpiracion,restablecerCon);

routes.delete('/:id', auth, eliminarCliente);

routes.post ('/recuperar', recuperar);
routes.post('/register', Register);
routes.post('/login', Login);

module.exports = routes;
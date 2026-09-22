const { Router } = require('express');
const { Register, Login, verifyToken, dashboard } = require('../controllers/usuarioController.js');
const routes = Router();
routes.post('/register', Register);
routes.post('/login', Login);
routes.get('/dashboard', verifyToken, dashboard);

module.exports = routes;
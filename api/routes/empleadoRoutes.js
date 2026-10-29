const {Router} = require ('express');
const {buscarTodosEmpleados, buscarEmpleadoId, buscarTurno, buscarEspecialidad, registrarEmpleado, modificarEmpleado, eliminarEmpleado} = require ('../controllers/empleadoController.js');
const routes = Router();

routes.get('/', buscarTodosEmpleados);
routes.get('/id/:id', buscarEmpleadoId);
routes.get('/turno/:turno', buscarTurno);
routes.get('/especialidad/:especialidad', buscarEspecialidad);
routes.post('/', registrarEmpleado);
routes.patch('/:id', modificarEmpleado);
routes.delete('/:id', eliminarEmpleado);

module.exports = routes;
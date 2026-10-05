const {Router} = require ('express');
const {buscarTodosEmpleados, buscarEmpleadoDni, buscarTurno, buscarEspecialidad, registrarEmpleado, modificarEmpleado, eliminarEmpleado} = require ('../controllers/empleadoController.js');
const routes = Router();

routes.get('/', buscarTodosEmpleados);
routes.get('/dni/:dni', buscarEmpleadoDni);
routes.get('/turno/:turno', buscarTurno);
routes.get('/especialidad/:especialidad', buscarEspecialidad);
routes.post('/', registrarEmpleado);
routes.patch('/:dni', modificarEmpleado);
routes.delete('/:dni', eliminarEmpleado);

module.exports = routes;
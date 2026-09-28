const {Router} = require ('express');
const {buscarTodosEmpleados, buscarEmpleadoDni, registrarEmpleado, modificarEmpleado, eliminarEmpleado} = require ('../controllers/empleadoController.js');
const routes = Router();

routes.get('/', buscarTodosEmpleados);
routes.get('/:dni', buscarEmpleadoDni);
routes.post('/', registrarEmpleado);
routes.patch('/:dni', modificarEmpleado);
routes.delete('/:dni', eliminarEmpleado);

module.exports = routes;
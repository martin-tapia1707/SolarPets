const { Categoria } = require("./categoriaModel.js");
const { ClienteMascota } = require("./clienteMascotaModel.js");
const { Cliente } = require("./clienteModel.js");
const { Empleado } = require("./EmpleadoModel.js");
const { Mascota } = require("./mascotaModel.js");
const { Pedido } = require("./pedidoModel.js");
const { Producto } = require("./productoModel.js");
const { Proveedor } = require("./proveedorModel.js");
const { Reseña } = require("./reseñaModel.js");
const { Rol } = require("./rolModel.js");
const { SubCategoria } = require("./subCategoriaModel.js");


//-------RELACION CLIENTE-MASCOTA-------
Cliente.hasMany(Mascota, { foreignKey: 'idMascota' });
Mascota.belongsTo(Cliente, { foreignKey: 'idMascota'});

//-------RELACION CLIENTE-EMPLEADO-------
Cliente.belongsToMany(Empleado, { through: 'clienteEmpleado' });
Empleado.belongsToMany(Cliente, { through: 'clienteEmpleado' });

//-------RELACION CLIENTE-CLIENTEMASCOTA--------
Cliente.belongsToMany(ClienteMascota, { through: 'mascotaCliente' });
ClienteMascota.belongsToMany(Cliente, { through: 'mascotaCliente' });

//-------RELACION CLIENTE-ROL--------
Rol.hasMany(Cliente, { foreignKey: 'idRol' });
Cliente.belongsTo(Rol, { foreignKey: 'idRol'});

//-------RELACION MASCOTA-CATEGORIA--------
Categoria.hasMany(Mascota, { foreignKey: 'idCategoria' });
Mascota.belongsTo(Categoria, { foreignKey: 'idCategoria'});

//-------RELACION CATEGORIA-SUBCATEGORIA--------
Categoria.hasMany(SubCategoria, { foreignKey: 'idCategoria' });
SubCategoria.belongsTo(Categoria, { foreignKey: 'idCategoria' });

//-------RELACION CATEGORIA-PRODUCTO--------
Producto.belongsToMany(Categoria, { through: 'productoCategoria' });
Categoria.belongsToMany(Producto, { through: 'productoCategoria' });

//-------RELACION PRODUCTO-PROVEEDORES--------
Producto.belongsToMany(Proveedor, { through: 'productoProveedor' });
Proveedor.belongsToMany(Producto, { through: 'productoProveedor' });

//-------RELACION EMPLEADO-CLIENTEMASCOTA--------
Empleado.belongsToMany(ClienteMascota, { through: 'mascotaClienteEmpleado' });
ClienteMascota.belongsToMany(Empleado, { through: 'mascotaClienteEmpleado' });

//-------RELACION CLIENTE-PRODUCTO--------
Producto.belongsToMany(Cliente, { through: 'productoCliente' });
Cliente.belongsToMany(Producto, { through: 'productoCliente' });

//-------RELACION PRODUCTO-PEDIDOS--------
Producto.belongsToMany(Pedido, { through: 'productoPedido' });
Pedido.belongsToMany(Producto, { through: 'productoPedido' });

//-------RELACION CLIENTE-RESEÑA--------
Cliente.hasOne(Reseña, { foreignKey: 'idCliente' });
Reseña.belongsTo(Cliente, { foreignKey: 'idCliente' });

module.exports = {
    Cliente,
    Mascota,
    Empleado,
    ClienteMascota,
    Rol,
    Categoria,
    SubCategoria,
    Producto,
    Pedido,
    Proveedor,
    Reseña
};

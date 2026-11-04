const { Categoria } = require("./categoriaModel.js");
const { Cliente } = require("./clienteModel.js");
const { Empleado } = require("./empleadoModel.js");
const { Mascota } = require("./mascotaModel.js");
const { Pedido } = require("./pedidoModel.js");
const { Producto } = require("./productoModel.js");
const { Proveedor } = require("./proveedorModel.js");
const { Reseña } = require("./reseñaModel.js");
const { Rol } = require("./rolModel.js");
const { SubCategoria } = require("./subCategoriaModel.js");
const { Turno } = require("./turnoModel.js");
const { Carrito } = require("./carritoModel.js");
const { ItemCarrito } = require("./itemCarritoModel.js");

//-------RELACION CLIENTE-MASCOTA-------
Cliente.hasMany(Mascota, { foreignKey: 'idMascota' });
Mascota.belongsTo(Cliente, { foreignKey: 'idMascota'});

//-------RELACION CLIENTE-EMPLEADO-------
Cliente.belongsToMany(Empleado, { through: 'clienteEmpleado' });
Empleado.belongsToMany(Cliente, { through: 'clienteEmpleado' });


//-------RELACION CLIENTE-ROL--------
Rol.hasMany(Cliente, { foreignKey: 'idRol' });
Cliente.belongsTo(Rol, { foreignKey: 'idRol'});

//-------RELACION EMPLEADO-ROL--------
Rol.hasMany(Empleado, { foreignKey: 'idRol'});
Empleado.belongsTo(Rol, { foreignKey: 'idRol' })

//-------RELACION MASCOTA-CATEGORIA--------
Categoria.hasMany(Mascota, { foreignKey: 'idCategoria' });
Mascota.belongsTo(Categoria, { foreignKey: 'idCategoria'});

//-------RELACION CATEGORIA-SUBCATEGORIA--------
Categoria.hasMany(SubCategoria, { foreignKey: 'idCategoria' });
SubCategoria.belongsTo(Categoria, { foreignKey: 'idCategoria' });

//-------RELACION SUBCATEGORIA-PRODUCTO--------
Producto.belongsToMany(SubCategoria, { through: 'productoSubCategoria', timestamps: false  });
SubCategoria.belongsToMany(Producto, { through: 'productoSubCategoria', timestamps: false, foreignKey: 'SubCategoriaId'  });

//-------RELACION PRODUCTO-PROVEEDORES--------
Producto.belongsToMany(Proveedor, { through: 'productoProveedor'});
Proveedor.belongsToMany(Producto, { through: 'productoProveedor' });

//-------RELACION Cliente-Carrito--------
Cliente.hasMany(Carrito, { foreignKey: 'clienteId' });
Carrito.belongsTo(Cliente, { foreignKey: 'clienteId' });

//-------RELACION Carrito-ItemCarrito--------
Carrito.hasMany(ItemCarrito, { foreignKey: 'carritoId', onDelete: 'CASCADE' });
ItemCarrito.belongsTo(Carrito, { foreignKey: 'carritoId' });

//-------RELACION Producto-ItemCarrito--------
Producto.hasMany(ItemCarrito, { foreignKey: 'productoId' });
ItemCarrito.belongsTo(Producto, { foreignKey: 'productoId' });

//-------RELACION PRODUCTO-PEDIDOS--------
Producto.belongsToMany(Pedido, { through: 'productoPedido' });
Pedido.belongsToMany(Producto, { through: 'productoPedido' });

//-------RELACION CLIENTE-RESEÑA--------
Cliente.hasOne(Reseña, { foreignKey: 'idCliente' });
Reseña.belongsTo(Cliente, { foreignKey: 'idCliente' });

//-------RELACION CLIENTE-TURNO--------
Cliente.hasMany(Turno, {foreignKey: 'idCliente' });
Turno.belongsTo(Cliente, { foreignKey: 'idCliente' });

//-------RELACION EMPLEADO-TURNO--------
Empleado.hasMany(Turno, { foreignKey: 'idEmpleado' });
Turno.belongsTo(Empleado, { foreignKey: 'idEmpleado' });

module.exports = {
    Cliente,
    Mascota,
    Empleado,
    Rol,
    Categoria,
    SubCategoria,
    Producto,
    Pedido,
    Proveedor,
    Reseña,
    Turno,
    Carrito,
    ItemCarrito
};

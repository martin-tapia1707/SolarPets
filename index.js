const express = require("express");
const { sequelize } = require("./config/database.js");

// Sección de modelos de tablas
// require("./models/categoriaModel.js");
// require("./models/clienteMascotaModel.js");
// require("./models/clienteModel.js");
// require("./models/empleadoModel.js");
// require("./models/mascotaModel.js");
// require("./models/pedidoModel.js");
// require("./models/productoModel.js");
// require("./models/proveedorModel.js");
// require("./models/reseñaModel.js");
// require("./models/rolModel.js");
// require("./models/subCategoriaModel.js");


//Seccion de relaciones
require("./models/index.js");

const clienteRoutes = require('./routes/clienteRoutes.js');
const categoriaRoutes = require('./routes/categoriaRoutes.js');




const server = express();
server.use(express.json());
server.get("/", (req, res) => {
  res.status(200).json({ message: "El server funciona correctamente" });
});

server.use("/clientes", clienteRoutes);
server.use("/categoria", categoriaRoutes);

const PORT = 3000;
server.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({force: true}); 
    console.log("Conexión exitosa a la Base de Datos");
    console.log(`El servidor está ON en el puerto ${PORT}`);
  } catch (error) {
    console.error(
      "Error crítico al iniciar el servidor o base de datos:",
      error,
    );
  }
});

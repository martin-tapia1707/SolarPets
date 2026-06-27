const express = require("express");
const { sequelize } = require("./config/database.js");

require("./models/mascotaModel.js");
require("./models/clienteMascotaModel.js");
require("./models/reseñaModel.js");

const server = express();
server.use(express.json());
server.get("/", (req, res) => {
  res.status(200).json({ message: "El server funciona correctamente" });
});

const PORT = 3000;
server.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log("Conexión exitosa a la Base de Datos");
    console.log(`El servidor está ON en el puerto ${PORT}`);
  } catch (error) {
    console.error(
      "Error crítico al iniciar el servidor o base de datos:",
      error,
    );
  }
});

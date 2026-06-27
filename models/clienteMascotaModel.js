const { sequelize } = require("../config/database.js");
const { DataTypes } = require("sequelize");

const ClienteMascota = sequelize.define(
  "ClienteMascota",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    animal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    fechaDeNacimiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    historialMedico: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    estado: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "clientesMascotas",
    timestamps: false,
  },
);

module.exports = { ClienteMascota };

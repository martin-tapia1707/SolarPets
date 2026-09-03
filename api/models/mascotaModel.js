const { sequelize } = require("../config/database.js");
const { DataTypes } = require("sequelize");

const Mascota = sequelize.define(
  "Mascota",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    animal: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    raza: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    antecedentes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tratamientosHechos: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  },
  {
    tableName: "mascotas",
    timestamps: false
  },
);

module.exports = { Mascota };

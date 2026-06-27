const { sequelize } = require("../config/database.js");
const { DataTypes } = require("sequelize");

const Reseña = sequelize.define(
  "Reseña",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    valoracion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 5,
        min: 0,
      },
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "reseñas",
    timestamps: false,
  },
);

module.exports = { Reseña };

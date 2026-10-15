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
      allowNull: true
    },
    raza: {
      type: DataTypes.STRING(100),        
      allowNull: false
    },
    antecedentes: {
      type: DataTypes.TEXT,          
      allowNull: true
    },
    historialMedico: {
      type: DataTypes.TEXT,         
      allowNull: true
    },
    estado: {
      type: DataTypes.TEXT,   
      allowNull: true
    },
    fechaNacimiento: {
      type: DataTypes.DATE,   
      allowNull: true
    },
  },
  {
    tableName: "mascotas",
    timestamps: false
  },
);

module.exports = { Mascota };

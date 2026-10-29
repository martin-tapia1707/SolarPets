const { sequelize } = require('../config/database.js');
const { DataTypes } = require('sequelize');

const Producto = sequelize.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    imagen: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tipoAnimal: {                   // 1: Gato, 0: Perro, Null: Mixto
        type: DataTypes.BOOLEAN,
        allowNull: true        
    }
},
    {
        tableName: 'productos',
        timestamps: false
    }

);

module.exports = { Producto };
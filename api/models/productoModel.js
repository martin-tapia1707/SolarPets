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
    }
},
    {
        tableName: 'productos',
        timestamps: false
    }

);

module.exports = { Producto };
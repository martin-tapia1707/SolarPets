const { sequelize } = require('../config/database.js');
const { DataTypes } = require('sequelize');

const ItemCarrito = sequelize.define('ItemCarrito', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cantidad: {
        type: DataTypes.INTEGER,  // 1 = activo, 0 = inactivo
        allowNull: false
    },
    precioUnitario: {
        type: DataTypes.DECIMAL(10,2),  // 1 = activo, 0 = inactivo
        allowNull: false
    }
},
    {
        tableName: 'ItemCarrito',
        timestamps: false
    }
);

module.exports = { ItemCarrito };
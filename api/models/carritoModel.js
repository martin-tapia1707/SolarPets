const { sequelize } = require('../config/database.js');
const { DataTypes } = require('sequelize');

const Carrito = sequelize.define('Carrito', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    estado: {
        type: DataTypes.BOOLEAN,  // 1 = activo, 0 = inactivo
        allowNull: false,
        defaultValue: false
    }
},
    {
        tableName: 'Carrito',
        timestamps: false
    }
);

module.exports = { Carrito };
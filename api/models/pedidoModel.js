const { sequelize } = require('../config/database.js');
const { DataTypes } = require('sequelize');

const Pedido = sequelize.define('Pedido', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    factura: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    }
},
    {
        tableName: 'pedidos',
        timestamps: false
    }
);

module.exports = { Pedido };
const { sequelize } = require('../config/database.js');
const { DataTypes } = require('sequelize');

const Proveedor = sequelize.define('Proveedor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(35),
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
},
    {
        tableName: 'proveedor',
        timestamps: false
    }
);

module.exports = { Proveedor };
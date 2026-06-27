const { sequelize } = require('../config/database.js');
const { DataTypes } = require('sequelize');

const Cliente = sequelize.define('cliente', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(15),
        allowNull: false
    }

}, {
    tableName: 'clientes',
    timestamps: false
});

module.exports = { Cliente };
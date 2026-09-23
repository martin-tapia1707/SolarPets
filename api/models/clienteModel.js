const { sequelize } = require('../config/database.js');
const { DataTypes } = require('sequelize');

const Cliente = sequelize.define('Cliente', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
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
    },
    password: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    idRol: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, {
    tableName: 'clientes',
    timestamps: false
});

module.exports = { Cliente };
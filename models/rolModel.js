const { sequelize } = require('../config/database.js');
const { DataTypes } = require('sequelize');

const Rol = sequelize.define('Rol', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    }

}, {
    tableName: 'roles',
    timestamps: false
});

module.exports = { Rol };
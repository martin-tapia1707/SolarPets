const { sequelize } = require('../config/database.js');
const { DataTypes } = require('sequelize');

const Usuario = sequelize.define('Usuario', { // esto representa al cliente, despues borrar, se utiliza de referencia.

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(15),
        allowNull: false
    }

}, {
    tableName: 'usuario',
    timestamps: false
});

module.exports = { Usuario };
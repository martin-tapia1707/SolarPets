const { sequelize } = require('../config/database.js');
const { DataTypes } = require('sequelize');

const SubCategoria = sequelize.define('SubCategoria', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    }

}, {
    tableName: 'subCategorias',
    timestamps: true
});

module.exports = { SubCategoria };
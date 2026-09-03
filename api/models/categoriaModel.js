const { sequelize } = require('../config/database.js');
const { DataTypes } = require('sequelize');

const Categoria = sequelize.define('Categoria', {
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
},
    {
        tableName: 'categorias',
        timestamps: false
    }
);

module.exports = { Categoria };
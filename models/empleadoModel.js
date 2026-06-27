const { sequelize } = require('../config/database.js');
const { DataTypes } = require('sequelize');

const Empleado = sequelize.define('producto', {

    dni: {
        type: DataTypes.STRING(11),
        primaryKey: true,
        allowNull: false 
    },
    nombre: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    establecimiento: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    salario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    turno: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    localidad: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    fechaAlta: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fechaBaja: {
        type: DataTypes.DATE,
        allowNull: false
    },
    especialidad: {
        type: DataTypes.STRING(50),
        allowNull: false
    }

}, {
    tableName: 'empleados',
    timestamps: false
});

module.exports = { Empleado };
const { sequelize } = require('../config/database.js');
const { DataTypes } = require('sequelize');

const Turno = sequelize.define('Turno', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idCliente: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    
    cita: {
        type: DataTypes.DATE,
        allowNull: false
    },

    motivo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    
    animal: {
        type: DataTypes.STRING(20),            
        allowNull: true
    },
    raza: {
        type: DataTypes.STRING(100),        
        allowNull: false
    },

    servicio: {
        type: DataTypes.STRING(30),
        allowNull: false
    },

    fechaCreacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }

},

    {
    tableName: 'Turnos',
    timestamps: false
    }
);

module.exports = { Turno };

//  fecha.create.NOW()
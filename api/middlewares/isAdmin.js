const jwt = require('jsonwebtoken');
const Cliente = require('../models/clienteModel.js');

const isAdmin = (req, res, next) => {

    if(req.cliente.tipo === 'admin') {
        return next()

    } else {

        return res.status(403).json({ 
            message: "No tenes permiso para acceder" 
        })

    }
}

module.exports = { isAdmin }
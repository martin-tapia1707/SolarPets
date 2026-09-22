const jwt = require('jsonwebtoken');
const Cliente = require('../models/clienteModel.js');

const sameId = (req, res, next) => {

    const clienteId = Number(req.params.id);

    if(clienteId === req.cliente.id) {
        return next()

    } else {

        return res.status(403).json({ 
            message: "Solo podes acceder a tu propio perfil" 
        })

    }
}

module.exports = { sameId }
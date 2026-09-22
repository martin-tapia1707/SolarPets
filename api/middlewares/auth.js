const jwt = require('jsonwebtoken');
const Cliente = require('../models/clienteModel.js');

const auth = (req, res, next) => {

    if(req.headers.authorization === '1527') {

        

        return next()

    } else {
        res.status(401).json({ 
            message: "No autorizado" 
        })
    }
}

module.exports = { auth }
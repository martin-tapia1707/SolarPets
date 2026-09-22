const jwt = require('jsonwebtoken');
const Cliente = require('../models/clienteModel.js');

const checkActiveUsers = async (req, res, next) => {

    const usuario = await Cliente.findByPk(req.params.id);

    if(!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" })
    } 
    
    if(usuario.isActive === false) {
        return res.status(403).json({ message: "Usuario no activo" })
    }

    return next();
}

module.exports = { checkActiveUsers }
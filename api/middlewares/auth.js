const jwt = require('jsonwebtoken');
const Cliente = require('../models/clienteModel.js');

const auth = (req, res, next) => {

    try{
        const authorization = req.headers["authorization"];

        if(!authorization) {
            return res.status(401).json({
                message: "Acceso denegado"
            })
        }

        const token = authorization.split(" ")[1];

        if(!token) {
            return res.status(401).json({
                message: "Token no encontrado"
            })
        }

        // Verifica que el token no haya expirado o sea valido(haya sido firmado correctamente).
        const decoded = jwt.verify( token, JWT_SECRET );

        req.user = decoded; 
        // decoded es todo lo que estaba en el payload, req user es una variable nueva que le estoy 
        // asignando el valor de decoded, para poder usarlo en los endpoints que requieran autenticación.

        // Si todo esta bien, siga a la petición deseada
        return next();

    } catch(error) {
        return res.status(401).json({ message: "Token invalido o expirado" })
    }
}

module.exports = { auth }
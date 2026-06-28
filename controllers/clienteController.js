const { Cliente } = require('../models/index.js')

const mostrarCliente = async(req, res) =>{ //nombrar la funcion 
    try{    //try / intento para usar las siguientes cosas
        const clientesEncontrados = await Cliente.findAll();
        if(!clientesEncontrados){
            res.status(401).json({message: "No se encontró el cliente la ocncha de la lora"});
        }
        res.status(200).json(clientesEncontrados);
    }
    catch(error){
        res.status(401).json({error: error.message});
    }
}  

module.exports = { mostrarCliente };
const { Cliente } = require('../models/index.js')

const mostrarCliente = async(req, res) =>{
    
    try{

        const listaClientes = await Cliente.findAll();

        if(!listaClientes) {
            return res.status(404).json({ message: "No se encontro ningun cliente" })
        }

        res.status(200).json({listaClientes})

    } catch(error) {
        res.status(500).json({ error: error.message })
    }

}  

const clientePorId = async(req, res) =>{

    try{

        const id = Number(req.params.id)
        const listaClientes = await Cliente.findByPk(id)

        if(!listaClientes) {
            return res.status(404).json({ message: "No se encontro al cliente solicitado" })
        }

        res.status(200).json({listaClientes})

    } catch(error) {
        res.status(500).json({ error: error.message })
    }

}

const registrarCliente = async(req, res) => {

    try{

        const { nombre, apellido, telefono } = req.body;
        if(!nombre || !apellido || !telefono) {
            return res.status(400).json({ message: "Falta rellenar parametros" })
        }

        const nuevoCliente = await Cliente.create({ nombre, apellido, telefono })

        res.status(200).json({ message: "Cliente creado", cliente: nuevoCliente })

    } catch(error) {
        res.status(500).json({ error: error.message })
    }
}

const modificarCliente = async(req, res) => {
    
    try{

        const id = Number(req.params.id);
        const { nombre, apellido, telefono } = req.body;

        const clienteModif = await Cliente.findByPk(id);

        if(!clienteModif) {
            return res.status(404).json({ message: "Cliente no encontrado" })
        }

        if(!nombre || !apellido || !telefono) {
            return res.status(400).json({ message: "Faltan parametros" })
        }

        clienteModif.nombre = nombre;
        clienteModif.apellido = apellido;
        clienteModif.telefono = telefono;
        await clienteModif.save();

        res.status(200).json({ message: "Cliente modificado", cliente: clienteModif})

    } catch(error) {
        res.status(500).json({ error: error.message })
    }
}

const eliminarCliente = async(req, res) => {

    try{

        const id = Number(req.params.id);

        const eliminarCliente = await Cliente.findByPk(id);

        if(!eliminarCliente) {
            return res.status(404).json({ message: "No se encontro al cliente" })
        }

        await eliminarCliente.destroy();

        res.status(200).json({message: "Cliente eliminado con exito"})

    }catch(error){
        res.status(500).json({ error: error.message })
    }

}

module.exports = { mostrarCliente, clientePorId, registrarCliente, modificarCliente, eliminarCliente };
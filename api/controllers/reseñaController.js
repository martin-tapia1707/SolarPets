const { sequelize } = require("../config/database.js");
const { Reseña } = require("../models/reseñaModel.js");

const {Cliente} = require("../models/clienteModel.js")

const mostrarReseñas = async (req, res) =>{

    try{

        const ListaReseñas = await Reseña.findAll();
        if(!ListaReseñas) {
            return res.status(404).json({message: "No se encontraron reseñas aún.."})
        }

        res.status(200).json({ message: "Lista de reseñas: " + ListaReseñas})

    } catch(error) {
        res.status(500).json({ error: error.message})
    }

}

const reseñaPorId = async(req, res) =>{

    try{

        const id = Number(req.params.id);
        const reseña = await Reseña.findByPk(id);

        if(!reseña) {
            return res.status(404).json({message: "No se encontro la reseña solicitada"})
        }

                res.status(200).json({reseña})

    } catch(error) {
        res.status(500).json({ error: error.message })
    }

}

const publicarReseña = async(req, res) =>{

    try{
        const idCliente = req.user.id
        const { valoracion, descripcion, idProducto } = req.body;
        if(!valoracion || !descripcion) {
            return res.status(400).json({ message: "Rellene todos los campos porfavor" })
        }

        const nuevaReseña = await Reseña.create({valoracion: Number(valoracion), descripcion, idProducto: Number(idProducto), idCliente})

        res.status(201).json({ 
            message: "Reseña creada con exito",
            reseña: nuevaReseña
        });

    } catch(error) {
        res.status(500).json({ error: error.message })
    }

}

const eliminarReseña = async(req, res) => {

    try{

        const id = Number(req.params.id);

        const reseña = await Reseña.findByPk(id);

        if(!reseña) {
            return res.status(404).json({message: "reseña no encontrada"})
        }

        await reseña.destroy();

        const ListaReseñas = await Reseña.findAll();

        res.status(200).json({ message: "Reseña eliminada con exito", reseña: ListaReseñas })

    } catch(error) {
        res.status(500).json({ error: error.message })
    }

}

const clienteReseña = async (req, res) => {
    try {

        const {idProducto} = req.params;
        const ListadoReseña = await Reseña.findAll({
            where:{
                idProducto: Number(idProducto)
            },
            include:{
                model: Cliente, attributes: ['nombre','apellido']
            },
            order: [['id', 'DESC']]
        });

        return res.status(200).json({ message: "Reseñas: ", ListadoReseña })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: error.message })
    }
}

module.exports = { mostrarReseñas, reseñaPorId, publicarReseña, eliminarReseña, clienteReseña }
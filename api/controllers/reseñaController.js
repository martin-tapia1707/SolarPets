const { sequelize } = require("../config/database.js");
const { Reseña } = require("../models/reseñaModel.js");

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
        const { valoracion, descripcion } = req.body;
        if(!valoracion || !descripcion) {
            return res.status(404).json({ message: "Rellene todos los campos porfavor" })
        }

        const nuevaReseña = await Reseña.create({valoracion, descripcion})

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

module.exports = { mostrarReseñas, reseñaPorId, publicarReseña, eliminarReseña }
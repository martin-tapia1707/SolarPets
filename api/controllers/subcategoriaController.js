const { sequelize } = require("../config/database.js");
const { SubCategoria } = require("../models/subCategoriaModel.js");

const mostrarSubCategorias = async (req, res) =>{
    try{

        const subCategoriasEncontradas = await SubCategoria.findAll();
        if(!subCategoriasEncontradas) {
            return res.status(404).json({message: "No se encontraron subcategorias aún.."})
        }

        res.status(200).json({ message: "Lista de subcategorias: ", subcategoria: subCategoriasEncontradas })

    }catch(error){
        res.status(500).json({ error: error.message})
    }
}

const subCategoriasPorId = async (req, res) =>{
    try{

        const id = Number(req.params.id);
        const subCategoria = await SubCategoria.findByPk(id);

        if(!subCategoria) {
            return res.status(404).json({message: "No se encontro la subcategoria solicitada"})
        }

        res.status(200).json({ message: "Subcategoria encontrada: ", subcategoria: subCategoria })

    }catch(error){
        res.status(500).json({ error: error.message})
    }
}

const añadirSubCategoria = async (req, res) =>{

    try{

        const { nombre, descripcion } = req.body;
        const nuevaSubCategoria = await SubCategoria.create({ nombre, descripcion });

        if(!nombre || !descripcion) {
            return res.status(400).json({ message: "Faltan parametros" })
        }

        res.status(201).json({ message: "Subcategoria añadida exitosamente: ", subcategoria: nuevaSubCategoria })

    }catch(error){
        res.status(500).json({ error: error.message})
    }

}

const actualizarSubCategoria = async (req, res) =>{
    try{
        const id = Number(req.params.id);
        const { nombre, descripcion } = req.body;

        const subCategoria = await SubCategoria.findByPk(id);

        if(!subCategoria) {
            return res.status(404).json({message: "No se encontro la subcategoria solicitada"})
        }

        if(!nombre || !descripcion) {
            return res.status(400).json({ message: "Faltan parametros" })
        }

        subCategoria.nombre = nombre;
        subCategoria.descripcion = descripcion;
        await subCategoria.save();

        res.status(200).json({ message: "Subcategoria actualizada exitosamente", subcategoria: subCategoria })

    }catch(error){
        res.status(500).json({ error: error.message})
    }
}

const eliminarSubCategoria = async (req, res) =>{
    try{
        const id = Number(req.params.id);
        const subCategoria = await SubCategoria.findByPk(id);

        if(!subCategoria) {
            return res.status(404).json({message: "No se encontro la subcategoria solicitada"})
        }

        await subCategoria.destroy();
        res.status(200).json({ message: "Subcategoria eliminada exitosamente" })

    }catch(error){
        res.status(500).json({ error: error.message})
    }
}

module.exports = { mostrarSubCategorias, subCategoriasPorId, añadirSubCategoria, actualizarSubCategoria, eliminarSubCategoria }
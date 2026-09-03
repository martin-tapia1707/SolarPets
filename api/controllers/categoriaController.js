const { sequelize } = require('../config/database.js');
const { Categoria } = require('../models/index.js');

const mostrarCategorias = async(req, res)=>{
    try {
        const categorias = await Categoria.findAll();
        if(!categorias){
            res.status(404).json({mensaje: "No se encontro nada"});
        }else{
            res.status(200).json(categorias);
        } 
    } catch (error) {
        res.status(500).json(error);
    }
}
const categoriaId = async(req, res)=>{
    try {
        const { id } = req.params;
        const categoria = await Categoria.findByPk(Number(id));
        if(!categoria){
            res.status(404).json({mensaje: "Categoria no encontrada"});
        }else{
            res.status(200).json(categoria);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

const agregarCategoria = async(req, res)=>{
    try {
        const { nombre, descripcion } = req.body;
        if(!nombre || !descripcion){
            res.json({mensaje: "Complete todos los valores"});
        }else{
            const nuevaCategoria = await Categoria.create({nombre: nombre, descripcion: descripcion});
            res.status(201).json({mensaje: "Usuario creado con exito con el id: " + nuevaCategoria.id});
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

const actualizarCategoria = async(req,res) =>{
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;
        const categoria = await Categoria.findByPk(Number(id));
        if(!categoria){
            res.status(404).json({mensaje: "Categoria no encontrada"});
        }else{
            categoria.nombre = nombre;
            categoria.descripcion = descripcion;
            categoria.save();
            res.status(200).json({Mensaje: "Cambios hechos", categoria});
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

const eliminarCategoria = async(req,res)=>{
    try {
        const { id } = req.params;
        const categoria = await Categoria.findByPk(Number(id));
        if(!categoria){
            res.status(500).json({mensaje: "categoria no encontrada"});
        }else{
            await categoria.destroy();
            res.status(200).json({mensaje: "La categoria fue eliminada"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    mostrarCategorias,
    categoriaId,
    agregarCategoria,
    actualizarCategoria,
    eliminarCategoria
}
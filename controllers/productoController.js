const { sequelize } = require('../config/database.js');
const { Producto} = require('../models/index.js');

const mostrarProductos = async(req, res)=>{
    try {
        const productos = await Producto.findAll();
        if(!productos){
            res.status(404).json({mensaje: "No se encontro nada"});
        }else{
            res.status(200).json(productos);
        } 
    } catch (error) {
        res.status(500).json(error);
    }
}

const productoId = async(req, res)=>{
    try {
        const { id } = req.params;
        const producto = await Producto.findByPk(Number(id));
        if(!producto){
            res.status(404).json({mensaje: "Producto no encontrado"});
        }else{
            res.status(200).json(producto);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

const agregarProducto = async(req, res)=>{
    try {
        const { nombre, precio, stock } = req.body;
        if(!nombre || !precio || !stock){
            res.status(500).json({mensaje: "Complete todos los campos"});
        }else{
            const nuevoProducto = await Producto.create({nombre: nombre, precio: precio, stock: stock});
            res.status(201).json({mensaje: "Producto creado con el id: " + nuevoProducto.id});
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

const actualizarProducto = async(req, res)=>{ 
    try {
        const { id } = req.params;
        const { nombre, precio, stock } = req.body;
        const producto = await Producto.findByPk(Number(id));
        if(!nombre || !precio || !stock){
            res.status(500).json({mensaje: "Completar todos los datos"});
        }
        if(!producto){
            res.status(404).json({mensaje: "Producto no encontrado"});
        }else{
            producto.nombre = nombre;
            producto.precio = precio;
            producto.stock = stock;
            producto.save();
            res.status(200).json({mensaje: "producto actualizado: ", producto});
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

const eliminarProducto = async(req, res)=>{ 
    try {
        const { id } = req.params;
        const producto = await Producto.findByPk(Number(id));
        if(!producto){
            res.status(404).json({mensaje: "producto no encontrado"});
        }else{
            await producto.destroy();
            res.status(200).json({mensaje: "El producto fue eliminada"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports = {mostrarProductos, productoId, agregarProducto, actualizarProducto, eliminarProducto}
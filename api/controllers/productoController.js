const { where, Op, or } = require('sequelize');
const { sequelize } = require('../config/database.js');
const { Producto} = require('../models/index.js');

const STOP_WORDS = [
  "el", "la", "los", "las", "un", "una", "unos", "unas", "lo", "al", "del",
  "a", "ante", "bajo", "cabe", "contra", "de", "desde", "durante", "en",
  "entre", "hacia", "hasta", "mediante", "para", "por", "segun", "so",
  "sobre", "tras", "via"];

  const sinonimos = {
    "alimento": ["alimento", "comida"],
    "gato": ["gato", "felino", "gatos"],
    "perro": ["perro", "caninos", "perros", "canino"]
  }

const mostrarProductos = async(req, res)=>{
    try {
        const productos = await Producto.findAll();
        if(!productos){
            res.status(404).json({message: "No se encontro nada"});
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
            res.status(404).json({message: "Producto no encontrado"});
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
            res.status(500).json({message: "Complete todos los campos"});
        }else{
            const nuevoProducto = await Producto.create({nombre: nombre, precio: precio, stock: stock});
            res.status(201).json({message: "Producto creado con el id: " + nuevoProducto.id});
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
            res.status(500).json({message: "Completar todos los datos"});
        }
        if(!producto){
            res.status(404).json({message: "Producto no encontrado"});
        }else{
            producto.nombre = nombre;
            producto.precio = precio;
            producto.stock = stock;
            producto.save();
            res.status(200).json({message: "producto actualizado: ", producto});
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
            res.status(404).json({message: "producto no encontrado"});
        }else{
            await producto.destroy();
            res.status(200).json({message: "El producto fue eliminada"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

const productoBusqueda = async(req,res)=>{
    try {
        const { _q } = req.query;
        const palabras = _q.split(" ");
        let palabrasFil = palabras.filter(palabras => !STOP_WORDS.includes(palabras));
        console.log(palabrasFil);
        let palabrasConSinonimos = {};
        for(const palabra in sinonimos){
            for(let i = 0; i < sinonimos[palabra].length; i++){
                for(let j = 0; j < palabrasFil.length; j++){
                    if(sinonimos[palabra][i] == palabrasFil[j]){ 
                        palabrasConSinonimos[palabra] = sinonimos[palabra];
                        palabrasFil.splice(j, 1);
                        break;
                    }
                }
            }
        }

        let consulta = [];
        if(Object.keys(palabrasConSinonimos).length > 0){
            for(const palabra in palabrasConSinonimos){
            const estructura = {[Op.or]:  palabrasConSinonimos[palabra].map(pal => ({
                nombre: {
                    [Op.like]: `%${pal}%` 
                },
            }))};
            consulta.push(estructura);
            }  
        }
        if(palabrasFil.length > 0){
            for(const palabra in palabrasFil){
            const estructura = {[Op.or]: {  
                nombre: {
                    [Op.like]: `%${palabrasFil[palabra]}%` 
                },
            }};
            consulta.push(estructura);
            } 
        }
        
        
        
        
        console.log(consulta);
        
        const productosBus = await Producto.findAll({
            where: {
                [Op.and]: consulta
            }});
        if(productosBus.length == 0){
            return res.status(404).json({message: "Productos no existente"});
        }
        return res.status(200).json(productosBus);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {mostrarProductos, productoId, agregarProducto, actualizarProducto, eliminarProducto, productoBusqueda}
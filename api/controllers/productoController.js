const { where, Op, Or } = require('sequelize');
const { sequelize } = require('../config/database.js');
const { Producto } = require('../models/index.js');
const { SubCategoria } = require('../models/index.js');
const { Categoria } = require('../models/index.js');

const STOP_WORDS = [
  "el", "la", "los", "las", "un", "una", "unos", "unas", "lo", "al", "del",
  "a", "ante", "bajo", "cabe", "contra", "de", "desde", "durante", "en",
  "entre", "hacia", "hasta", "mediante", "para", "por", "segun", "so",
  "sobre", "tras", "via", "y"];

  const sinonimos = {
    "alimento": ["alimento", "comida"],
    "gato": ["gato", "felino", "gatos"],
    "perro": ["perro", "caninos", "perros", "canino"]
  }

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


const buscarSubcategoriasIds = async (palabra) => {

    const subs = await SubCategoria.findAll({   // llama a la base de datos y pregunta si hay una subcategoria que coincidda con palabra
        where: { nombre: { [Op.like]: `%${palabra}%` } },
        attributes: ["id"]
    });
    if (subs.length > 0){
        const ids = subs.map(s => s.id); 
        return ids; 
    } 

    const cats = await Categoria.findAll({      // si no encontro coincidencia en la tabla de subsCategorias lo intenta en categorias
        where: { nombre: { [Op.like]: `%${palabra}%` } },
        attributes: ["id"]
    });
    if (cats.length > 0) {
        const subsDeCats = await SubCategoria.findAll({
            where: { idCategoria: { [Op.in]: cats.map(c => c.id) } },
            attributes: ["id"]
        });
        const ids = subsDeCats.map(s => s.id); 
        return ids;
    }

    return null;
};

const productoBusqueda = async(req,res)=>{
    try {
        const { _q } = req.query;
        // Se "limpia" la busqueda
        const palabras = _q.split(" ");
        let palabrasFil = palabras.filter(p => !STOP_WORDS.includes(p));
        console.log(palabrasFil);

        // Si la busqueda coincide con un sinonimo se expande la busqueda
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

        console.log(palabrasConSinonimos);

        
        //Se empieza a preparar la consulta con los sinonimos y sin ellos
        let consulta = [];

        let idsSubcategorias = null;
        const aplicarFiltroCategoria = (ids) => {
            // Intersección: cada palabra de categoría restringe más el resultado
            idsSubcategorias = idsSubcategorias === null
                ? ids
                : idsSubcategorias.filter(id => ids.includes(id));
        };

        const tiposAnimal = [];
        if (palabrasConSinonimos["gato"]){
            tiposAnimal.push(0);
        } 
        if (palabrasConSinonimos["perro"]){
            tiposAnimal.push(1);
        } 
        if (tiposAnimal.length === 1) {
            consulta.push({
                [Op.or]: [
                    { tipoAnimal: tiposAnimal[0] },
                    { tipoAnimal: null }
                ]
            });
        }else if(tiposAnimal.length === 2){
            consulta.push({[Op.or]: [
                    { tipoAnimal: tiposAnimal[0] },
                    { tipoAnimal: tiposAnimal[1] },
                    { tipoAnimal: null }
                ]});
        }

        // palabras que no sean gato y perro
        for (const palabra in palabrasConSinonimos) {
            if (palabra === "gato" || palabra === "perro"){
                continue;
            }else{
                const ids = await buscarSubcategoriasIds(palabra);
                if (ids !== null) {
                    aplicarFiltroCategoria(ids);
                    continue;
                }
                consulta.push({
                    [Op.or]: palabrasConSinonimos[palabra].map(pal => ({
                        nombre: { [Op.like]: `%${pal}%` }
                    }))
                });
            }
        }

        for (const palabra of palabrasFil) {
            const ids = await buscarSubcategoriasIds(palabra);
            if (ids !== null) {
                aplicarFiltroCategoria(ids);
                continue;
            }
            consulta.push({ nombre: { [Op.like]: `%${palabra}%` } });
        }
        
        console.log(consulta, idsSubcategorias);

        if (idsSubcategorias !== null && idsSubcategorias.length === 0) {
            return res.status(404).json({ message: "Productos no existente" });
        }

        const include = [];
        if (idsSubcategorias !== null) {
            include.push({
                model: SubCategoria,
                through: { attributes: [] }, // oculta la tabla intermedia
                required: true,              // solo productos con esas subcategorías
                where: { id: { [Op.in]: idsSubcategorias } }
            });
        }
        const where = consulta.length > 0 ? { [Op.and]: consulta } : {};
        const productosBus = await Producto.findAll({ where, include  });
        if(productosBus.length == 0){
            return res.status(404).json({message: "Productos no existente"});
        }
        return res.status(200).json(productosBus);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {mostrarProductos, productoId, agregarProducto, actualizarProducto, eliminarProducto, productoBusqueda} 
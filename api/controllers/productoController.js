const { where, Op, Or } = require('sequelize');
const { sequelize } = require('../config/database.js');
const { Producto } = require('../models/index.js');
const { SubCategoria } = require('../models/index.js');
const { Categoria } = require('../models/index.js');

const STOP_WORDS = [
  "el", "la", "los", "las", "un", "una", "unos", "unas", "lo", "al", "del",
  "a", "ante", "bajo", "cabe", "contra", "de", "desde", "durante", "en",
  "entre", "hacia", "hasta", "mediante", "para", "por", "segun", "so",
  "sobre", "tras", "via", "y", "o"];

  const sinonimos = {
    "alimento": ["alimento", "comida"],
    "gato": ["gato", "felino", "gatos"],
    "perro": ["perro", "caninos", "perros", "canino"],
    "seco": ["seco", "seca", "secos"],
    "ropa": ["ropa", "ropas"],
    "snacks": ["snacks", "snack", "premio", "premios"],
    "camas": ["cama", "cuchas", "cucha", "camas"],
    "juguete": ["juguete", "juguetes"],
    "antiparasitarios": ["antiparasitarios", "antiparasitario", "pipeta", "pipetas"],
    "accesorios": ["accesorio", "accesorios"],
    "humedos": ["humedo", "humedos"],
    "huesos": ["huesos", "hueso"],
    "cueros": ["cueros", "cuero"],
    "piedras": ["piedras", "piedra", "piedritas"],
    "arena": ["arena", "arenas"]
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


const productoBusqueda = async(req,res)=>{
    try {
        const { _q } = req.query;
        // Se "limpia" la busqueda
        if(!_q){
            return res.status(404).json({message: "Productos no existente"});
        }
        const palabras = _q.split(" ");
        let palabrasFil = palabras.filter(p => !STOP_WORDS.includes(p));
        // console.log(palabrasFil);

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
        if(Object.keys(palabrasConSinonimos).length == 0 && palabrasFil.length == 0){
            return res.status(404).json({message: "Productos no existente"});
        }
        if(palabrasFil.length == 1 && palabrasFil[0] == "catalogo"){
            const productosBus = await Producto.findAll({
                include: [{
                    model: SubCategoria,
                    through: { attributes: [] },   // oculta los datos de la tabla intermedia
                    required: true                 // INNER JOIN: solo productos de esa subcategoría
                }]
            });
            return res.status(200).json(productosBus);
        }

        // console.log(palabrasConSinonimos);
        // console.log(palabrasFil);

        
        //Se empieza a preparar la consulta con los sinonimos y sin ellos
        let consulta = [];
        const idSC = [];
        
        if(Object.keys(palabrasConSinonimos).length > 0){
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
            // console.log(consulta);
            // palabras que no sean gato y perro
            const categorias = await Categoria.findAll();
            const subCategorias = await SubCategoria.findAll();
            const ids = {};

            for (const palabra in palabrasConSinonimos) {
                if (palabra === "gato" || palabra === "perro"){
                    continue; 
                }else{
                    let coincidencia = false;
                    for(let i = 0; i < subCategorias.length; i++){
                        if(subCategorias[i].nombre.includes(palabra)){
                            coincidencia = true;
                            if(Object.keys(ids).length === 0){
                                ids[palabra] = [subCategorias[i].id];
                            }else{
                                let encontro = false;
                                for (const id in ids) {
                                    if(palabra === id){
                                        ids[id].push(subCategorias[i].id);
                                        encontro = true;
                                        break;
                                    }
                                }
                                if(encontro == false){
                                    ids[palabra] = [subCategorias[i].id];
                                }
                            }
                        } 
                    }
                    if(coincidencia == false){ 
                        for(let i = 0; i < categorias.length; i++){
                            if(categorias[i].nombre.includes(palabra)){
                                const coincidenciasIds = [];
                                for(let j = 0; j < subCategorias.length; j++){
                                    if(categorias[i].id == subCategorias[j].idCategoria){
                                        coincidenciasIds.push(subCategorias[j].id);
                                    }
                                } 
                                if(Object.keys(ids).length === 0){
                                    ids[palabra] = [coincidenciasIds];
                                }else{
                                    ids[palabra] = [coincidencia];
                                }
                            } 
                        }
                    }
                }
            }
            // console.log(ids);
            // console.log(Object.values(ids).length);
            const idSupremo = Object.values(ids).flat();
            if(Object.values(ids).length > 1){
                
                if(idSupremo.length > 1){
                    for(const id of idSupremo){
                        let cant = 0;
                        for(let i = 0; i < idSupremo.length; i++){
                            if(id == idSupremo[i]){
                                cant++
                            } 
                            if(cant > 1){
                                if(!idSC.includes(id) || idSC.length == 0){
                                    idSC.push(id);
                                    break;
                                }
                                break;
                            }
                        }
                    }   
                // console.log(idSupremo);
                // console.log(idSC);
                }else{
                    if(idSupremo.length === 1){
                        idSC.push(idSupremo[0]);
                    }
                    // console.log(idSupremo);
                    // console.log(idSC);
                }
            }else{
                for(let k = 0; k < idSupremo.length; k++){
                    idSC.push(idSupremo[k]);
                }
                // console.log(idSupremo);
                // console.log(idSC);
            }
            
            
        }
         
        if(palabrasFil.length > 0){
            for (const palabra of palabrasFil) {
                consulta.push({ nombre: { [Op.like]: `%${palabra}%` } });
            }
        }
        
        // console.log(consulta);  

        // const where = consulta.length > 0 ? { [Op.and]: consulta } : {};
        // console.log(idSC.length);
        // console.log(palabrasFil.length);
        if(idSC.length == 0 && palabrasFil.length == 0){ 
            // console.log("Sin sub y fil");
            const productosBus = await Producto.findAll({ where: {[Op.and]: consulta},
                include: [{
                    model: SubCategoria,
                    through: { attributes: [] },   // oculta los datos de la tabla intermedia
                    required: true                 // INNER JOIN: solo productos de esa subcategoría
                }]
            });
            return res.status(200).json(productosBus);
        }else if(idSC.length == 1 && palabrasFil.length == 0){
            // console.log("Con sub y sin fil");
            const productosBus = await Producto.findAll({ where: {[Op.and]: consulta},
                include: [{
                    model: SubCategoria,
                    where: { id: idSC },
                    through: { attributes: [] },   // oculta los datos de la tabla intermedia
                    required: true                 // INNER JOIN: solo productos de esa subcategoría
                }]
            });
            //console.log(productosBus);
            for(let l = 0; l < productosBus.length; l++){
                console.log(productosBus[l].id);
            }
            return res.status(200).json(productosBus);
        }else if(idSC.length > 1 && palabrasFil.length == 0){
            // console.log("busqueda con mas de un id en sub");
            const productosBus = await Producto.findAll({ where: {[Op.and]: consulta},
                include: [{
                    model: SubCategoria,
                    where:  { id: { [Op.in]: idSC } },
                    through: { attributes: [] },   // oculta los datos de la tabla intermedia
                    required: true                 // INNER JOIN: solo productos de esa subcategoría
                }]
            });
            return res.status(200).json(productosBus);
        }else if(idSC.length == 0 && palabrasFil.length > 0){
            // console.log("busqueda con palabraFil"); 
            const productosBus = await Producto.findAll({ where: {[Op.and]: consulta},
                include: [{
                    model: SubCategoria,
                    through: { attributes: [] },   // oculta los datos de la tabla intermedia
                    required: true                 // INNER JOIN: solo productos de esa subcategoría
                }]
            });
            return res.status(200).json(productosBus);
        }
        
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {mostrarProductos, productoId, agregarProducto, actualizarProducto, eliminarProducto, productoBusqueda} 
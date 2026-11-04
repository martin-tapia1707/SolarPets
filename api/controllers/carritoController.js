const { sequelize } = require('../config/database.js');
const { Carrito } = require('../models/index.js');
const { ItemCarrito } = require('../models/index.js');
const { Producto } = require('../models/index.js');

const asignarCarrito = async(req,res)=>{
    try {
        const carritoCli = await Carrito.findOne({
            where: {
                clienteId: req.user.id,
                estado: 1
            }
        });
        if(carritoCli){
            return res.status(200).json({message: "El cliente ya tiene un carrito activo"});
        }
        const carrito = await Carrito.create({
            estado: 1,
            clienteId: req.user.id
        });
        return res.status(200).json({message: "Carrito creado", carrito});
    } catch (error) {
        res.status(500).json(error);
    }
}

const agregarProducto = async(req, res)=>{
    try{
        const carritoCli = await Carrito.findOne({
            where: {
                clienteId: req.user.id,
                estado: 1
            }
        });
        const { productoId, cantidad, precioUnitario } = req.body;
        const itemExistente = await ItemCarrito.findOne({
            where: {
                carritoId: carritoCli.id,
                productoId: productoId
            }
        });
        if(itemExistente){
            itemExistente.cantidad = cantidad;
            itemExistente.precioUnitario = precioUnitario;
            await itemExistente.save();
            return res.status(200).json({message: "Producto actualizado en el carrito", itemExistente});
        }
        const item = await ItemCarrito.create({
            cantidad,
            precioUnitario,
            carritoId: carritoCli.id,
            productoId
        });
        return res.status(200).json({message: "Producto agregado al carrito", item});
    }
    catch(error){
        res.status(500).json(error.message);
    }
}

const comprar = async(req, res)=>{
    try{
        const carritoCli = await Carrito.findOne({
            where: {
                clienteId: req.user.id,
                estado: 1
            }
        });
        const productosCar = await ItemCarrito.findAll({
            where: {
                carritoId: carritoCli.id
            }
        });

        for(let i = 0; i < productosCar.length; i++){
            const producto = await Producto.findByPk(productosCar[i].productoId);
            producto.stock -= productosCar[i].cantidad;
            await producto.save();
        }
        carritoCli.estado = 0;
        await carritoCli.save();

        return res.status(200).json({message: "Compra realizada con exito"});
    }
    catch(error){
        res.status(500).json(error.message);
    }
}

const eliminarProducto = async(req, res)=>{
    try{
        const carritoCli = await Carrito.findOne({
            where: {
                clienteId: req.user.id,
                estado: 1
            }
        });
        const { productoId } = req.body;
        await ItemCarrito.destroy({
            where:{
                carritoId: carritoCli.id,
                productoId: productoId
            }
        });
        return res.status(200).json({message: "Producto eliminado del carrito"});
    }
    catch(error){
        res.status(500).json(error.message);
    }
}

const obtenerProductos = async(req,res)=>{
    try {
        const carritoCli = await Carrito.findOne({
            where: {
                clienteId: req.user.id,
                estado: 1
            }
        });
        const itemsCarrito = await ItemCarrito.findAll({
            where: {
                carritoId: carritoCli.id
            },
            include: [{ model: Producto, attributes: ['nombre', 'imagen', 'stock'] }]
        });
        if(!itemsCarrito.length){
            return res.status(200).json({ itemsCarrito: [] });
        }
        return res.status(200).json({itemsCarrito});
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = {
    asignarCarrito,
    agregarProducto,
    comprar,
    eliminarProducto,
    obtenerProductos
}
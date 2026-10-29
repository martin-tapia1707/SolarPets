const { sequelize } = require("../config/database.js");
const { Proveedor } = require("../models/proveedorModel.js");

const mostrarProveedores = async(req, res)=>{
    try {
        const proveedores = await Proveedor.findAll();
        if(!proveedores){
            res.status(404).json({message: "No se encontro nada"});
        }else{
            res.status(200).json(proveedores);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

const proveedorId = async(req, res)=>{
    try {
        const { id } = req.params;
        const proveedor = await Proveedor.findByPk(Number(id));
        if(!proveedor){
            res.status(404).json({message: "no se encontro ningun proveedor"});
        }else{
            res.status(200).json(proveedor);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

const agregarProveedor = async(req, res)=>{
    try {
        const { nombre, telefono, direccion } = req.body;
        if(!nombre || !telefono || !direccion){
            res.status(500).json({message: "Complete todos los campos"});
        }else{
            const proveedor = await Proveedor.create({
                nombre: nombre,
                telefono: telefono,
                direccion: direccion
            });
            res.status(200).json({message: "Proveedor creado con el id: " + proveedor.id});
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

const actualizarProveedor = async(req, res)=>{
    try {
        const { id } = req.params;
        const { nombre, telefono, direccion } = req.body;
        if(!nombre || !telefono || !direccion){
            res.status(500).json({message: "Complete todos los campos"});
        }else{
            const proveedor = await Proveedor.findByPk(Number(id));
            if(!proveedor){
                res.status(404).json({message: "Proveedor no encontrado"});
            }else{
                proveedor.nombre = nombre;
                proveedor.telefono = telefono;
                proveedor.direccion = direccion;
                proveedor.save();
                res.status(200).json({message: "Proveedor actualizado", proveedor});
            }
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

const eliminarProveedor = async(req, res)=>{
    try {
        const { id } = req.params;
        const proveedor = await Proveedor.findByPk(Number(id));
        if(!proveedor){
            res.status(500).json({message: "No se encontro ningun proveedor con ese id"});
        }else{
            await proveedor.destroy();
            res.status(200).json({message: "proveedor eliminado con exito"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {mostrarProveedores, proveedorId, agregarProveedor, actualizarProveedor, eliminarProveedor};
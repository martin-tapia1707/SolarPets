const { Rol } = require('../models/rolModel.js');

// Seleccionar TODO: mostrarRoles

const mostrarRoles = async(req, res) => {

    try{

        const rolesEncontrados = await Rol.findAll();
        if(!rolesEncontrados) {
            res.status(404).json({ message: "No se han encontrado roles" });
        }

        res.status(200).json(rolesEncontrados);

    } catch(error) {
        res.status(500).json({error: error.message})
    }

}

// Seleccionar POR NOMBRE: rolesPorNombre

const rolesPorNombre = async(req, res) => {

    try{

        const rolNombre = await Rol.findOne
        ({
            where: { nombre: req.params.nombre }
        });

        if(!rolNombre) {
            return res.status(404).json({ message: "No existe un rol con ese nombre" });
        }

        res.status(200).json(rolNombre)

    } catch(error) {
        res.status(500).json({error: error.message})
    }

}

// CREAR rol: crearRol

const crearRol = async(req, res) => {

    try{

        const { nombre, descripcion } = req.body;

        if(!nombre || !descripcion) {
            return res.status(400).json({ message: "Para crear un rol tenes que poner todos los parametros" })
        }

        const nuevoRol = await Rol.create({nombre, descripcion});

        res.status(201).json({ message: "Rol insertado con exito", nuevoRol});

    } catch(error) {
        res.status(500).json({error: error.message})
    }

}

// ACTUALIZAR rol: actualizarRol

const actualizarRol = async(req, res) => {

    try{

        const id = Number(req.params.id);
        const { nombre, descripcion } = req.body;

        if(!nombre || !descripcion) {
            return res.status(400).json({ message: "Faltan parametros" });
        }

        const cambiarRol = await Rol.update(
            { nombre, descripcion },
            { 
                where: { id } 
            }
        );

        if(!id) {
            return res.status(404).json({ message: "Rol no encontrado" })
        }

        const yaModificado = await Rol.findByPk(id);

        res.status(200).json({ message: "Rol modificado con exito", yaModificado});


    } catch(error) {
        res.status(500).json({error: error.message})
    }

}

// BORRAR ROL: borrarRol

const borrarRol = async(req, res) => {

    try{
        const id = Number(req.params.id);
        const eliminarRol = await Rol.destroy
        ({
            where: { id }
        })
        if(!id) {
            return res.status(404).json({ message: "Rol no encontrado" });
        }

        const listaRoles = await Rol.findAll();

        res.status(200).json({ message: "Usuario eliminado con exito", listaRoles })

    } catch(error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = { mostrarRoles, rolesPorNombre, crearRol, actualizarRol, borrarRol }
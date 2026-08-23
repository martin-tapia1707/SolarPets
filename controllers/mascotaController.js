const { sequelize } = require("../config/database.js");
const { Mascota } = require("../models/mascotaModel.js");

const mostrarMascotas = async (req, res) =>{

    try{

        const MascotasEncontradas = await Mascota.findAll();
        if(!MascotasEncontradas) {
            return res.status(404).json({message: "No se encontraron mascotas aún.."})
        }

        res.status(200).json({ message: "Lista de mascotas: ", mascotas: MascotasEncontradas })

    }catch(error){
        res.status(500).json({ error: error.message})
    }

}

const mascotasPorId = async (req, res) =>{
    try{

        const id = Number(req.params.id);
        const mascota = await Mascota.findByPk(id);

        if(!mascota) {
            return res.status(404).json({message: "No se encontro la mascota solicitada"})
        }

        res.status(200).json({ message: "Mascota encontrada: ", mascota: mascota })

    }catch(error){
        res.status(500).json({ error: error.message})
    }
}

const publicarMascota = async (req, res) =>{

    try{

        const { nombre, edad, animal, raza, antecedentes, tratamientosHechos } = req.body;
        const nuevaMascota = await Mascota.create({ nombre, edad, animal, raza, antecedentes, tratamientosHechos });

        if(!nombre || !raza || !edad || !animal || !antecedentes || !tratamientosHechos) {
            return res.status(400).json({ message: "Faltan parametros" })
        }

        res.status(201).json({ message: "Mascota publicada exitosamente", mascota: nuevaMascota })

    }catch(error){
        res.status(500).json({ error: error.message})
    }
}

const actualizarMascota = async (req, res) =>{
    try{

        const id = Number(req.params.id);
        const { nombre, edad, animal, raza, antecedentes, tratamientosHechos } = req.body;

        if(!nombre || !edad || !animal || !raza || !antecedentes || !tratamientosHechos) {
            return res.status(400).json({ message: "Faltan parametros" })
        }

        const mascota = await Mascota.findByPk(id);

        if(!mascota) {
            return res.status(404).json({ message: "Mascota no encontrada" })
        }

        mascota.nombre = nombre;
        mascota.raza = raza;
        mascota.edad = edad;
        mascota.animal = animal;
        mascota.antecedentes = antecedentes;
        mascota.tratamientosHechos = tratamientosHechos;
        await mascota.save();

        res.status(200).json({ message: "Mascota actualizada exitosamente", mascota: mascota })

    }catch(error){
        res.status(500).json({ error: error.message})
    }
}

const eliminarMascota = async (req, res) =>{
    try{
        const id = Number(req.params.id);
        const mascota = await Mascota.findByPk(id);

        if(!mascota) {
            return res.status(404).json({ message: "Mascota no encontrada" })
        }

        await mascota.destroy();
        res.status(200).json({ message: "Mascota eliminada exitosamente" })

    }catch(error){
        res.status(500).json({ error: error.message})
    }
}

module.exports = { 
    mostrarMascotas,
    mascotasPorId,
    publicarMascota,
    actualizarMascota,
    eliminarMascota 
}
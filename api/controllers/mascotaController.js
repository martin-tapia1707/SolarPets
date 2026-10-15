const { sequelize } = require("../config/database.js");
const { Mascota } = require("../models/mascotaModel.js");

const mostrarMascotasAdoptar = async (req, res) =>{

    try{

        const MascotasEncontradas = await Mascota.findAll();        //especificar que son para adoptar
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

const agregarMascota = async (req, res) =>{

    try{

        const { nombre, edad, animal, raza, antecedentes, historialMedico } = req.body;
        const nuevaMascota = await Mascota.create({ nombre, edad, animal, raza, antecedentes, historialMedico });

        if(!nombre || !raza || !edad || !animal || !antecedentes || !historialMedico) {
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
        const { nombre, edad, animal, raza, antecedentes, historialMedico } = req.body;

        if(!nombre || !edad || !animal || !raza || !antecedentes || !historialMedico) {
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
        mascota.historialMedico = historialMedico;
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
    mostrarMascotasAdoptar,
    mascotasPorId,
    agregarMascota,
    actualizarMascota,
    eliminarMascota 
}
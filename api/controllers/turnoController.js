const { sequelize } = require("../config/database.js");
const { Turno } = require("../models/turnoModel.js");

const buscarTurno = async (req, res) => {
    try {
        const turnosEncontrados = await Turno.findAll();
        if (turnosEncontrados.length === 0) {
            return res.status(404).json({ message: "No se encontraron Turnos aún.." })
        }
        res.status(200).json({message: "Lista de turnos: ", turnos: turnosEncontrados })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const turnosPorId = async (req, res) => {
    try {

        const { id } = req.params;
        const turnoId = await Turno.findByPk(Number(id));

        if (!turnoId) {
            return res.status(404).json({ message: "No se encontró el turno solicitado" })
        }

        res.status(200).json({ message: "Turno encontrado: ", turno: turnoId })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const agregarTurno = async (req, res) => {
    try {
        const { nombre, cita, motivo, animal, raza, servicio} = req.body;
        if (!nombre || !cita || !motivo || !animal || !raza || !servicio) {
            return res.status(400).json({ message: "Complete todos los campos" });
        }
            const nuevoTurno = await Turno.create({nombre: nombre, cita: cita, motivo: motivo, animal: animal, raza: raza, servicio: servicio});
            res.status(201).json({message: "Turno creado, asignó el id: " + nuevoTurno.id})
        

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const modificarTurno = async (req, res) => {
    try {
        const {id} = req.params;
        const { nombre, cita, motivo, animal, raza, servicio } = req.body;
        
        if (!nombre || !cita || !motivo || !animal || !raza || !servicio) {
            return res.status(400).json({ message: "Complete todos los campos" });
        }
        const turno = await Turno.findByPk(Number(id));
        if(!turno){
            return res.status(404).json({message: "No se encontró el turnoId a modificar."})
        }
        turno.nombre = nombre;
        turno.cita = cita;
        turno.motivo = motivo;
        turno.animal = animal;
        turno.raza = raza;
        turno.servicio = servicio;
        await turno.save();

        res.status(200).json({message: `El Turno con Id: ${id} fue modificado existosamente`, turnoModificado : turno});

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const descartarTurno = async (req, res) => {
    try {
        const {id} = req.params;
        const turno = await Turno.findByPk(Number(id))
        if(!turno){
            return res.status(404).json({message: "turno no encontrado"});
        }
        await turno.destroy();
        res.status(200).json({message: `El turnoId ${id} fue eliminado exitosamente`})

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {buscarTurno, turnosPorId, agregarTurno, modificarTurno, descartarTurno};
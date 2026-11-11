const { sequelize } = require('../config/database.js');
const { Empleado } = require("../models/empleadoModel.js");

const buscarTodosEmpleados = async (req, res) => {
    try {
        const empleadosEncontrados = await Empleado.findAll();

        res.status(200).json({ message: 'Lista de Empleados: ', empleados: empleadosEncontrados });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const buscarEmpleadoId = async (req, res) => {
    try {
        const { id } = req.params;
        const encontrarId = await Empleado.findByPk(Number(id));
        if (!encontrarId) {
            return res.status(404).json({ message: `No se encontró el empleado con id ${id}` });
        }
        res.status(200).json({ message: 'Empleado encontrado: ', empleado: encontrarId });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const buscarTurno = async (req, res) => {
    try {
        const { turno } = req.params;
        const encontrarEmpleado = await Empleado.findAll({ where: { turno: turno } });
        if (encontrarEmpleado.length === 0) {
            return res.status(404).json({ message: `No se encontró empleados asignados del turno ${turno}` });
        }
        res.status(200).json({ message: `Lista de Empleados (Turno ${turno})`, empleado: encontrarEmpleado });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const buscarEspecialidad = async (req, res) => {
    try {
        const { especialidad } = req.params;
        const encontrarEmpleado = await Empleado.findAll({ where: { especialidad: especialidad } });
        if (encontrarEmpleado.length === 0) {
            return res.status(404).json({ message: `No se encontró empleados con la especialidad de ${especialidad}` });
        }
        res.status(200).json({ message: `Lista de Empleados (Especialidad : ${especialidad})`, empleado: encontrarEmpleado });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const registrarEmpleado = async (req, res) => {
    try {
        const { nombre, apellido, establecimiento, salario, telefono, turno, localidad, fechaAlta, fechaBaja, especialidad, idRol } = req.body;

        if (!nombre || !apellido || !establecimiento || !salario || !telefono || !turno || !localidad || !fechaAlta || !especialidad || !idRol) {
            return res.status(400).json({ message: 'Le falta algunos campos por completar, reviselos y llenelos.' });
        }

        const registrar = await Empleado.create({ nombre, apellido, establecimiento, salario, telefono, turno, localidad, fechaAlta, fechaBaja, especialidad, idRol });
        res.status(201).json({ message: 'Empleado registrado exitosamente', empleado: registrar });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const modificarEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, establecimiento, salario, telefono, turno, localidad, fechaAlta, fechaBaja, especialidad } = req.body;
        
        const empleado = await Empleado.findByPk(Number(id));

        if (!empleado) {
            return res.status(404).json({ message: 'No se encontró el Id de empleado a modificar.' });
        }

        if(nombre) {
            empleado.nombre = nombre;
        }
        if(apellido) {
            empleado.apellido = apellido;
        }
        if(establecimiento) {
            empleado.establecimiento = establecimiento;
        }
        if(salario) {
            empleado.salario = salario;
        }
        if(telefono) {
            empleado.telefono = telefono;
        }
        if(turno) {
            empleado.turno = turno;
        }
        if(localidad) {
            empleado.localidad = localidad;
        }
        if(fechaAlta) {
            empleado.fechaAlta = fechaAlta;
        }
        if(fechaBaja !== undefined) {
            empleado.fechaBaja = fechaBaja;
        }
        if(especialidad) {
            empleado.especialidad = especialidad;
        }
        await empleado.save();
        res.status(200).json({ message: `El empleado con Id: ${id} fue modificado existosamente`, empleadoActualizado: empleado });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const eliminarEmpleado = async (req, res) => {
    try {
        const { id } = req.params
        const buscarEmpleado = await Empleado.findByPk(Number(id));
        if (!buscarEmpleado) {
            return res.status(404).json({ message: `No se encontró el empleado con Id: ${id}` });
        }
        await buscarEmpleado.destroy();
        res.status(200).json({ message: `El empleado con el Id: ${id} fue quitado exitosamente.` });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}



module.exports = {
    buscarTodosEmpleados,
    buscarEmpleadoId,
    buscarTurno,
    buscarEspecialidad,
    registrarEmpleado,
    modificarEmpleado,
    eliminarEmpleado
}
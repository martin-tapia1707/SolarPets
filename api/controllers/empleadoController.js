const {sequelize} = require('../config/database.js');
const { Empleado } = require('../models/empleadoModel.js');

const buscarTodosEmpleados = async(req, res) =>{
    try{
        const empleadosEncontrados = await Empleado.findAll();
        if(empleadosEncontrados === 0){
    res(404).json({message: 'No se encontró ningún empleado registrado.'});
        }
        res.status(200).json({message: 'Lista de Empleados: ', empleados : empleadosEncontrados});

    }catch(error){
        res.status(500).json({error: error.message});
    }
}

const buscarEmpleadoDni = async(req, res) =>{
    try{
        const {dni} = req.params;
        const encontrarDni = await Empleado.findByPk(Number(dni));
        if(encontrarDni === 0 ){
        res.status(404).json({message: `No se encontró el empleado con DNI ${dni}`});
        }
        res.status(200).json({message:'Empleado DNI encontrado: ', empleado : encontrarDni});

    }catch(error){
        res.status(500).json({error: error.message});
    }
}

const buscarTurno = async(req, res)=>{
    try{
        const {turno} = req.params;
        const encontrarEmpleado = await Empleado.findAll({where:{turno : turno}});
        if(encontrarEmpleado.length === 0){
            res.status(404).json({message:`No se encontró empleados asignados del turno ${turno}`});
        }
        res.status(200).json({message: `Lista de Empleados (Turno ${turno})`, empleado : encontrarEmpleado});
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

const buscarEspecialidad = async(req, res)=>{
    try{
        const{especialidad} = req.params;
        const encontrarEmpleado = await Empleado.findAll({where:{ especialidad: especialidad}});
        if(encontrarEmpleado.length === 0){
            res.status(404).json({message: `No se encontró empleados con la especialidad de ${especialidad}`});
        }
        res.status(200).json({message: `Lista de Empleados (Especialidad : ${especialidad})`, empleado : encontrarEmpleado});
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

const registrarEmpleado = async(req, res) =>{
    try{
        const {dni, nombre, apellido, establecimiento, salario, telefono, turno, localidad, fechaAlta, fechaBaja, especialidad} = req.body;
        const registrar = await Empleado.create({dni, nombre, apellido, establecimiento, salario, telefono, turno, localidad, fechaAlta, fechaBaja, especialidad});

        if(!dni || !nombre || !apellido || !establecimiento || !salario || !telefono || !turno || !localidad || !fechaAlta || !especialidad){
            return res.status(500).json({message: 'Le falta algunos campos por completar, reviselos y llenelos.'});
        }
        res.status(202).json({message: 'Empleado registrado exitosamente', empleado : registrar});
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

const modificarEmpleado = async(req, res) => {
    try{
        const {dni} = req.params;
        const {nombre, apellido, establecimiento, salario, telefono, turno, localidad, fechaAlta, fechaBaja, especialidad} = req.body;

        const empleado = await Empleado.findByPk(Number(dni));
        if(!empleado){
        res.status(404).json({message: 'No se encontró el DNI de empleado a modificar.'});
        }

        if(!nombre || !apellido || !establecimiento || !salario || !telefono || !turno || !localidad || !fechaAlta || !especialidad){
        res.status(500).json({message: 'Faltan datos a completar. Rellene los campos que sigan vacios.'});
        }

        empleado.nombre = nombre;
        empleado.apellido = apellido;
        empleado.establecimiento = establecimiento;
        empleado.salario = salario;
        empleado.telefono = telefono;
        empleado.turno = turno;
        empleado.localidad = localidad;
        empleado.fechaAlta = fechaAlta;
        empleado.fechaBaja = fechaBaja;
        empleado.especialidad = especialidad;
        await empleado.save();
        res.status(200).json({message: `El empleado con DNI: ${dni} fue modificado existosamente`, empleadoActualizado : empleado});

    }catch(error){
        res.status(500).json({error: error.message});
    }
}

const eliminarEmpleado = async(req, res) => {
    try{
     const {dni} = req.params
     const buscarEmpleado = await Empleado.findByPk(Number(dni));
     if(!buscarEmpleado){
     res.status(404).json({message: `No se encontró el empleado con DNI: ${dni}`});
     }
     await buscarEmpleado.destroy();
     res.status(200).json({message: `El empleado con el DNI: ${dni} fue quitado exitosamente.`});

    }catch(error){
        res.status(500).json({error: error.message});
    }
}



module.exports = {
    buscarTodosEmpleados,
    buscarEmpleadoDni,
    buscarTurno,
    buscarEspecialidad,
    registrarEmpleado,
    modificarEmpleado,
    eliminarEmpleado
}
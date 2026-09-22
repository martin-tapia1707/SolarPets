const { Cliente } = require('../models/clienteModel.js')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const mostrarCliente = async(req, res) =>{
    
    try{

        const listaClientes = await Cliente.findAll();

        if(!listaClientes) {
            return res.status(404).json({ message: "No se encontro ningun cliente" })
        }

        res.status(200).json({listaClientes})

    } catch(error) {
        res.status(500).json({ error: error.message })
    }

}  

const clientePorId = async(req, res) =>{

    try{

        const id = Number(req.params.id)
        const listaClientes = await Cliente.findByPk(id)

        if(!listaClientes) {
            return res.status(404).json({ message: "No se encontro al cliente solicitado" })
        }

        res.status(200).json({listaClientes})

    } catch(error) {
        res.status(500).json({ error: error.message })
    }

}

const registrarCliente = async(req, res) => {

    try{

        const { nombre, apellido, email, telefono, password } = req.body;
        if(!nombre || !apellido || !email || !telefono || !password) {
            return res.status(400).json({ message: "Falta rellenar parametros" })
        }

        const nuevoCliente = await Cliente.create({ nombre, apellido, email, telefono, password })

        res.status(200).json({ message: "Cliente creado", cliente: nuevoCliente })

    } catch(error) {
        res.status(500).json({ error: error.message })
    }
}

const modificarCliente = async(req, res) => {
    
    try{

        const id = Number(req.params.id);
        const { nombre, apellido, email, telefono } = req.body;

        const clienteModif = await Cliente.findByPk(id);

        if(!clienteModif) {
            return res.status(404).json({ message: "Cliente no encontrado" })
        }

        if(!nombre || !apellido || !telefono) {
            return res.status(400).json({ message: "Faltan parametros" })
        }

        clienteModif.nombre = nombre;
        clienteModif.apellido = apellido;
        clienteModif.email = email;
        clienteModif.telefono = telefono;
        await clienteModif.save();

        res.status(200).json({ message: "Cliente modificado", cliente: clienteModif})

    } catch(error) {
        res.status(500).json({ error: error.message })
    }
}

const eliminarCliente = async(req, res) => {

    try{

        const id = Number(req.params.id);

        const eliminarCliente = await Cliente.findByPk(id);

        if(!eliminarCliente) {
            return res.status(404).json({ message: "No se encontro al cliente" })
        }

        await eliminarCliente.destroy();

        res.status(200).json({message: "Cliente eliminado con exito"})

    }catch(error){
        res.status(500).json({ error: error.message })
    }

}

const Register = async(req, res) => {
    try{

        const { email, nombre, apellido, telefono, password } = req.body;

        if(!email || !nombre || !apellido || !telefono || !password) {
            return res.status(400).json({ message: "Todos los campos son requeridos" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const usuarioRegistrado = await Cliente.create({
            email,
            nombre,
            apellido,
            telefono,
            password: hashedPassword
        })

        res.status(201).json({ message: "Usuario registrado exitosamente"})

    } catch(error) {
        res.status(500).json({
            message: "Error en el servidor",
            error: error.message
        })
    }
}

const Login = async(req, res) => {
    
    try{

        const { email, password } = req.body;

        const clienteLogin = await Cliente.findOne
        ({
            where: 
                    {
                        email
                    }
        });

        if(!clienteLogin) {
            return res.status(404).json({ message: "El mail ingresado no existe" })
        }

        const matchPassword = await bcrypt.compare(password, clienteLogin.password); // la variable matchPassword piensenla como, coincide? si o no?

        if(!matchPassword) {
            return res.status(400).json({ message: "Contraseña incorrecta" })
        }

        res.status(200).json
        ({ 
            message: "Inicio de sesion correcto. ¡Bienvenido " + clienteLogin.nombre + "!"
        })

    } catch(error) {
        res.status(500).json({
            message: "Error en el servidor",
            error: error.message
        })
    }
}

module.exports = { mostrarCliente, clientePorId, registrarCliente, modificarCliente, eliminarCliente, Register, Login };
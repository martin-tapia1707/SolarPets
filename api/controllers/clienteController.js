const { Cliente } = require('../models/clienteModel.js')
const { Rol } = require('../models/rolModel.js')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

    const JWT_SECRET = "1234";

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

        const { nombre, apellido, email, telefono, password, idRol } = req.body;
        if(!nombre || !apellido || !email || !telefono || !password) {
            return res.status(400).json({ message: "Falta rellenar parametros" })
        }

        const nuevoCliente = await Cliente.create({ nombre, apellido, email, telefono, password, idRol })

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

const Register = async(req, res) => { // despues pedir opinion si eliminar el endpoint registrarCliente y dejar este
    try{

        const { email, nombre, apellido, telefono, password, idRol } = req.body;

        if(!email || !nombre || !apellido || !telefono || !password) {
            return res.status(400).json({ message: "Todos los campos son requeridos" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const usuarioRegistrado = await Cliente.create({
            email,
            nombre,
            apellido,
            telefono,
            password: hashedPassword,
            idRol
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
                    },
            include: 
                    {
                        model: Rol
                    }
        });

        if(!clienteLogin) {
            return res.status(404).json({ message: "El mail ingresado no existe" })
        }

        const matchPassword = await bcrypt.compare(password, clienteLogin.password); // la variable matchPassword piensenla como, coincide? si o no?

        if(!matchPassword) {
            return res.status(400).json({ message: "Contraseña incorrecta" })
        }

        // CREAR EL TOKEN

        //Payload es toda la información que el token va a recibir
        const payload = {
            id: clienteLogin.id,
            role: clienteLogin.Rol.nombre
        };

        // Creo el token con jwt.sign, le paso el payload, la firma digital
        const token = jwt.sign( 
            payload, 
            JWT_SECRET 
            );
            // No le puse tiempo de expiración, luego lo coloco chicos.
        

        res.status(200).json
        ({ 
            message: "Inicio de sesion correcto. ¡Bienvenido " + clienteLogin.nombre + "!", token
        })

    } catch(error) {
        res.status(500).json({
            message: "Error en el servidor",
            error: error.message
        })
    }
}

module.exports = { mostrarCliente, clientePorId, registrarCliente, modificarCliente, eliminarCliente, Register, Login };
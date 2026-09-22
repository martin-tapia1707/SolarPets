    const { sequelize } = require("../config/database.js");
    const { Usuario } = require("../models/usuarioModel.js");
    const bcrypt = require("bcrypt");
    const jwt = require("jsonwebtoken");

    const JWT_SECRET = "1234"; // ESTE CONTROLADOR ES INSERVIBLE, SE PASARA TODO A CLIENTES PERO IGUAL LO SUBO

    // ============================================================
    // REGISTER
    // ============================================================

    const Register = async (req, res) => {
    try {
        const { name, lastName, password } = req.body;

        if (!name || !lastName || !password) {
        return res.status(400).json({
            message: "Todos los campos son requeridos"
        });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 12);

        // Crear usuario en la base de datos
        const newUser = await Usuario.create({
        name,
        lastName,
        password: hashedPassword
        });

        res.status(201).json({
        message: "Usuario registrado en la base de datos"
        });

    } catch (error) {

        res.status(500).json({
        message: "Error en el servidor",
        error: error.message
        });

    }
    };


    // ============================================================
    // LOGIN
    // ============================================================

    const Login = async (req, res) => {
    try {

        const { username, password } = req.body;

        // Buscar usuario
        const user = await Usuario.findOne({
        where: {
            username
        }
        });

        if (!user) {
        return res.status(400).json({
            message: "Datos incorrectos o usuario inexistente"
        });
        }

        // Comparar contraseña ingresada con contraseña hasheada
        const isMatch = await bcrypt.compare(
        password,
        user.password
        );

        if (!isMatch) {
        return res.status(400).json({
            message: "Contraseña incorrecta"
        });
        }

        // Información que se guarda dentro del JWT
        const payload = {
        username: user.username
        };

        // Crear token
        const token = jwt.sign(
        payload,
        JWT_SECRET,
        {
            expiresIn: "1h"
        }
        );

        res.status(200).json({
        message: "Login correcto",
        token
        });

    } catch (error) {

        res.status(500).json({
        message: "Error en el servidor",
        error: error.message
        });

    }
    };


    // ============================================================
    // MIDDLEWARE - VERIFICAR TOKEN
    // ============================================================

    const verifyToken = (req, res, next) => {

    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    // Si no hay token
    if (!token) {
        return res.status(401).json({
        message: "Acceso denegado. Token no provisto."
        });
    }

    try {

        // Verificar token
        const decoded = jwt.verify(
        token,
        JWT_SECRET
        );

        console.log("Middleware:", decoded);

        // Guardar información del usuario en req
        req.user = decoded;

        // Continuar hacia el endpoint
        next();

    } catch (error) {

        res.status(403).json({
        message: "Token inválido o expirado"
        });

    }
    };


    // ============================================================
    // DASHBOARD
    // ============================================================

    const dashboard = (req, res) => {

    res.status(200).json({

        message: `Bienvenido al panel de control, ${req.user.username}!`,

        secretData:
        "Este es un secreto que solo los usuarios autenticados pueden ver."

    });

    };


    // ============================================================
    // EXPORTACIONES
    // ============================================================

    module.exports = {
    Register,
    Login,
    verifyToken,
    dashboard
    };
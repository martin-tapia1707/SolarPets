import { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

import './Register.css'
import Login from './Login';
import logo from '../../logo.png'

function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');

    const userRegister = async () => {

    try {
            const response = await axios.post('http://localhost:3000/clientes/register', {
                email,
                password,
                nombre,
                apellido,
                telefono
            });

            console.log(response.data);
            if (response.status === 200) {
                alert("Salio todo bien")
                setEmail("")
                setPassword("")
                setNombre("")
                setApellido("")
                setTelefono("")
            }
        } catch(error) {
            console.error(error); 
            alert("Hubo un error al registrar el usuario");
        }
}

return (

    <div className="register-page">
    <div className="register-card">

    <div className="register-header">
        <img src={logo} alt="Solar Pets"/>
        <div className="register-wordmark">
            <strong>Solar Pets</strong>
            <span>PERROS Y GATOS</span>
        </div>
    </div>

    <h2>Creación de cuenta</h2>

    <div className="register-fields">
    <input type="email" placeholder="Correo electrónico.." value={email} onChange={(event) => setEmail(event.target.value)}/>
    <input type="text" placeholder="Nombre(s)" value={nombre} onChange={(event) => setNombre(event.target.value)}/>
    <input type="text" placeholder="Apellido(s)" value={apellido} onChange={(event) => setApellido(event.target.value)}/>
    <input type="text" placeholder="Teléfono" value={telefono} onChange={(event) => setTelefono(event.target.value)}/>
    <input type="password" placeholder="Contraseña" value={password} onChange={(event) => setPassword(event.target.value)}/>
    </div>
                <div>
                <p>¿Ya tenés una cuenta? </p><Link to="/login">Proba iniciando sesión</Link>
                </div>

    <button onClick={userRegister}>Crear cuenta</button>


    </div>
    </div>

    )
}

export default Register

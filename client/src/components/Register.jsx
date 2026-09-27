import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import './Register.css'

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

    const navigate = useNavigate();
    navigate("/register");

return (

    <>
    
    <h2>Register</h2>

    <div>
    <input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)}/>
    <input type="nombre" placeholder="Nombre" value={nombre} onChange={(event) => setNombre(event.target.value)}/>
    <input type="apellido" placeholder="Apellido" value={apellido} onChange={(event) => setApellido(event.target.value)}/>
    <input type="telefono" placeholder="Telefono" value={telefono} onChange={(event) => setTelefono(event.target.value)}/>
    <input type="password" placeholder="Contraseña" value={password} onChange={(event) => setPassword(event.target.value)}/>
    </div>

    <button onClick={userRegister}>Registrarse</button>

    </>

    )
}

export default Register
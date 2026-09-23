import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import './Login.css'

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userLogin = async () => {

      const response = await axios.post('http://localhost:3000/clientes/login', {
        email,
        password
      });

      console.log(response.data.token); // referencia para saber si devuelve el token bien
      localStorage.setItem("token", response.data.token);

    }

    const navigate = useNavigate();
    navigate("/login");

  return (

    <>
    
      <h2>Login</h2>

      <input type="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
      <input type="password" value={password} onChange={(event) => setPassword(event.target.value)}/>

      <button onClick={userLogin}>Iniciar sesión</button>

    </>

    )
}

export default Login
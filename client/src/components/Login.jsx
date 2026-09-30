import { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

import './Login.css'
import logo from '../../logo.png'

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

  return (

    <div className="login-page">
    <div className="login-card">

      <div className="login-header">
        <img src={logo} alt="Solar Pets"/>
        <div className="login-wordmark">
          <strong>Solar Pets</strong>
          <span>PERROS Y GATOS</span>
        </div>
      </div>

      <h2>Inicia sesión</h2>

      <div className="login-fields">
        <input type="email" placeholder="Correo electrónico.." value={email} onChange={(event) => setEmail(event.target.value)}/>
        <input type="password" placeholder="Contraseña" value={password} onChange={(event) => setPassword(event.target.value)}/>
      </div>

      <div className="login-links">
        <p><a href="#">¿Has olvidado tu correo electrónico?</a></p>
        <p>¿No recuerdas tu contraseña? <a href="#">Recupera tu contraseña</a></p>
        <p>¿No tenés una cuenta aún? <Link to="/register">Registrate</Link></p>
      </div>

      <button onClick={userLogin}>Iniciar sesión</button>

    </div>
    </div>

    )
}

export default Login
import { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

import './Login.css'
import logo from '../../logo.png'

function Recuperar() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const recuperar = async () => {
      const response = await axios.post('http://localhost:3000/clientes/recuperar', {
        email
      });
      if(response.data.respuesta == true){
        alert("se le a enviado un correo para restablecer la contraseña con un maximo de una hora");
      }
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

      <h2>Recuperar contraseña</h2>

      <div className="login-fields">
        <input type="email" placeholder="Correo electrónico.." value={email} onChange={(event) => setEmail(event.target.value)}/>
      </div>

      <div className="login-links">
        <p>¿Queres loguearte? <Link to="/login">Loguearse</Link></p>
        <p>¿No tenés una cuenta aún? <Link to="/register">Registrate</Link></p>
      </div>

      <button type="submit" onClick={recuperar}>Enviar verificacion</button>

    </div>
    </div>

    )
}

export default Recuperar
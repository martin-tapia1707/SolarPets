import { useState, useEffect } from 'react';
import axios from "axios";
import { useSearchParams, useParams, Link, useNavigate } from "react-router-dom";

import './Login.css'
import logo from '../../logo.png'

function RestablecerCon() {

    const [searchParams] = useSearchParams();
    const query = searchParams.get('token');
    const [contraseña, setContraseña] = useState('');
    const [contraseñaV, setContraseñaV] = useState('');


    const recuperar = async () => {
      try {
        if((contraseña != contraseñaV) && (contraseña == " " || contraseñaV == " ")){
      }
        const response = await axios.patch('http://localhost:3000/clientes/restablecer', {
        query, contraseña
      });

      } catch (error) {
        console.log(error);
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
        <input type="password" placeholder="Contraseña" value={contraseña} onChange={(event) => setContraseña(event.target.value)}/>
        <input type="password" placeholder="Contraseña repetida" value={contraseñaV} onChange={(event) => setContraseñaV(event.target.value)}/>
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

export default RestablecerCon
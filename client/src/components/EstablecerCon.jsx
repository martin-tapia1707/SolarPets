import { useState, useEffect } from 'react';
import axios from "axios";
import { useSearchParams, useParams, Link, useNavigate } from "react-router-dom";

import './Login.css'
import logo from '../../logo.png'

function EstablecerCon() {

    const [searchParams] = useSearchParams();
    const query = searchParams.get('token');
    const [email, setEmail] = useState('');

    const verificar = async () =>{
        try {
            const response = await axios.patch('http://localhost:3000/clientes/restablecer', {
            query
        });
            console.log(response.data);
        } catch (error) {
            
        }
    }

    const recuperar = async () => {
      const response = await axios.post('http://localhost:3000/clientes/recuperar', {
        email
      });
      if(response.data.respuesta == true){
        alert("se le a enviado un correo para restablecer la contraseña con un maximo de una hora");
      }
    }


    useEffect(() => {
        verificar();
      }, []);

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

export default EstablecerCon
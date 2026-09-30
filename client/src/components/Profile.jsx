import { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

import './Profile.css'

function Profile() {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const obtenerPerfil = async () => {
        try {
            const token = localStorage.getItem('token');

            console.log("TOKEN:", token);

            const response = await axios.get("http://localhost:3000/clientes/perfil", 
                {
                    headers: 
                    {
                        authorization: "Bearer " + token
                }
            })
            console.log(response.data);
            setUser(response.data.perfilCliente)
            
        } catch(error) {
            console.error(error);
            alert("error en obtener el perfil");
            
        }
        
    }

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    
    useEffect(() => {
         obtenerPerfil();
    }, []);

    return (
        <div className="profile-page">
        <div className="profile-card">

            <div className="profile-top">

                <div className="profile-avatar">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="12" cy="8" r="4"/>
                        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8z"/>
                    </svg>
                </div>

                <div className="profile-info">
                    <p className="profile-name">{user ? user.nombre + " " + user.apellido : "Cargando..."}</p>
                    <p className="profile-mail">{user && user.email}</p>
                    {/* El rol lo vas a agregar manualmente: */}
                    <p className="profile-role">Rol de usuario</p>
                </div>

            </div>

            <div className="profile-actions">
                <button onClick={cerrarSesion}>Cerrar sesion</button>
                <button>Edit</button>
                <button>Turnos</button>
            </div>

        </div>
        </div>
    );
}

export default Profile;

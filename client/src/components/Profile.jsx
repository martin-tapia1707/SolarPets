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

    const eliminarCliente = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.delete(
                'http://localhost:3000/clientes/' + user.id,
                {
                    headers: {
                        authorization: "Bearer " + token
                    }
                }
            );

            localStorage.removeItem('token');
            navigate('/login');

        } catch (error) {
            console.error(error);
            alert("Error al eliminar al usuario");
        }
    }
    
    useEffect(() => {
        obtenerPerfil();
    }, []);

    const editarPerfil = () => {
    navigate('/edit-profile');
    };

    return (
        <div className="profile-page">
        <div className="profile-card">

            <div className="profile-top">

                <div className="profile-avatar">
                    <i className="fi fi-sr-user"></i>
                </div>

                <div className="profile-info">
                    <p className="profile-name">{user ? user.nombre + " " + user.apellido : "Cargando..."}</p>
                    <p className="profile-mail">{user && user.email}</p>
                    <p className="profile-role">{user && user.Rol.nombre}</p>
                </div>

            </div>

            <div className="profile-actions">
                <button onClick={editarPerfil}>Editar Perfil <i className="fi fi-br-edit"></i></button>  
                <button>Solicitar turno</button>
                <button>Ver mis Turnos Pendientes</button>
                <button onClick={eliminarCliente}>Eliminar mi cuenta</button>
                <button onClick={cerrarSesion}>Cerrar sesion</button>
            </div>

        </div>
        </div>
    );
}

export default Profile;
